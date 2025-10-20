import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { MicroservicesSdkService } from '../services/microservices-sdk.service';
import { APP_CONFIG, VALIDATION_CONFIG } from '../config/app.config';
import { 
  SecurityTokenResponse, 
  ClientRegistrationRequest, 
  ClientRegistrationResponse 
} from '../models/interfaces';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, LOADING_MESSAGES, FORM_FIELDS } from '../models/constants';
import { FormUtils, StringUtils, DateUtils } from '../shared/utils';

@Component({
  selector: 'app-client-registration',
  imports: [ReactiveFormsModule, CommonModule, DatePipe],
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  securityToken: string = '';
  tokenExpiresAt: string = '';
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  // Constants for template
  readonly APP_CONFIG = APP_CONFIG;
  readonly FORM_FIELDS = FORM_FIELDS;
  readonly LOADING_MESSAGES = LOADING_MESSAGES;

  constructor(
    private fb: FormBuilder,
    private sdk: MicroservicesSdkService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', [
        Validators.required, 
        Validators.minLength(VALIDATION_CONFIG.NAME.MIN_LENGTH), 
        Validators.maxLength(VALIDATION_CONFIG.NAME.MAX_LENGTH)
      ]],
      email: ['', [
        Validators.required, 
        Validators.email, 
        Validators.maxLength(VALIDATION_CONFIG.EMAIL.MAX_LENGTH)
      ]],
      token: ['', [
        Validators.required, 
        Validators.pattern(VALIDATION_CONFIG.TOKEN.PATTERN)
      ]]
    });
  }

  ngOnInit(): void {
    this.loadSecurityToken();
  }

  /**
   * Carga un token de seguridad del microservicio
   */
  loadSecurityToken(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.sdk.generateSecurityToken().subscribe({
      next: (response: SecurityTokenResponse) => {
        this.securityToken = response.token;
        this.tokenExpiresAt = response.expires_at;
        this.registrationForm.patchValue({ token: response.token });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = `${ERROR_MESSAGES.SECURITY.TOKEN_GENERATION_FAILED}: ${error.message}`;
        this.isLoading = false;
      }
    });
  }

  /**
   * Valida el token actual
   */
  validateToken(): void {
    const token = this.registrationForm.get(FORM_FIELDS.TOKEN)?.value;
    if (!token) return;

    this.sdk.validateSecurityToken(token).subscribe({
      next: (response) => {
        if (response.valid) {
          this.errorMessage = '';
          console.log('Token válido:', response);
        } else {
          this.errorMessage = ERROR_MESSAGES.SECURITY.INVALID_TOKEN;
        }
      },
      error: (error) => {
        this.errorMessage = `${ERROR_MESSAGES.SECURITY.TOKEN_VALIDATION_FAILED}: ${error.message}`;
      }
    });
  }

  /**
   * Envía el formulario de registro
   */
  onSubmit(): void {
    if (!FormUtils.validateForm(this.registrationForm)) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const registrationData: ClientRegistrationRequest = {
      name: this.registrationForm.get(FORM_FIELDS.NAME)?.value,
      email: this.registrationForm.get(FORM_FIELDS.EMAIL)?.value,
      token: this.registrationForm.get(FORM_FIELDS.TOKEN)?.value
    };

    this.sdk.registerClient(registrationData).subscribe({
      next: (response: ClientRegistrationResponse) => {
        this.successMessage = `${SUCCESS_MESSAGES.CLIENT_REGISTERED}! ID: ${response.id}`;
        if (response.enqueuedEmail) {
          this.successMessage += ` ${SUCCESS_MESSAGES.EMAIL_ENQUEUED}.`;
        }
        this.isSubmitting = false;
        this.registrationForm.reset();
        this.loadSecurityToken(); // Cargar nuevo token
      },
      error: (error) => {
        this.errorMessage = `${ERROR_MESSAGES.CLIENT.REGISTRATION_FAILED}: ${error.message}`;
        this.isSubmitting = false;
      }
    });
  }

  /**
   * Obtiene el mensaje de error para un campo
   */
  getFieldError(fieldName: string): string {
    const control = this.registrationForm.get(fieldName);
    return FormUtils.getFieldError(control, fieldName);
  }

  /**
   * Formatea el token para mostrar
   */
  formatToken(token: string): string {
    return StringUtils.formatToken(token);
  }

  /**
   * Formatea la fecha de expiración
   */
  formatExpirationDate(dateString: string): string {
    return DateUtils.formatDate(dateString);
  }

  /**
   * Verifica si el token está expirado
   */
  isTokenExpired(): boolean {
    return DateUtils.isExpired(this.tokenExpiresAt);
  }
}
