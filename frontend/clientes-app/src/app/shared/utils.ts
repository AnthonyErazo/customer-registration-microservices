import { FormGroup, AbstractControl } from '@angular/forms';
import { ERROR_MESSAGES, FORM_FIELDS } from '../models/constants';

/**
 * Utility functions for form handling and validation
 */
export class FormUtils {
  
  /**
   * Marks all form fields as touched to show validation errors
   * @param form - FormGroup to mark as touched
   */
  static markFormGroupTouched(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Gets error message for a specific form field
   * @param control - Form control to check
   * @param fieldName - Name of the field
   * @returns Error message or empty string
   */
  static getFieldError(control: AbstractControl | null, fieldName: string): string {
    if (!control?.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;
    
    if (errors['required']) {
      return ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD;
    }
    
    if (errors['email']) {
      return ERROR_MESSAGES.VALIDATION.INVALID_EMAIL;
    }
    
    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      if (fieldName === FORM_FIELDS.NAME) {
        return ERROR_MESSAGES.VALIDATION.NAME_TOO_SHORT;
      }
    }
    
    if (errors['maxlength']) {
      const maxLength = errors['maxlength'].requiredLength;
      if (fieldName === FORM_FIELDS.NAME) {
        return ERROR_MESSAGES.VALIDATION.NAME_TOO_LONG;
      }
      if (fieldName === FORM_FIELDS.EMAIL) {
        return ERROR_MESSAGES.VALIDATION.EMAIL_TOO_LONG;
      }
    }
    
    if (errors['pattern']) {
      if (fieldName === FORM_FIELDS.TOKEN) {
        return ERROR_MESSAGES.VALIDATION.INVALID_TOKEN;
      }
    }
    
    return '';
  }

  /**
   * Checks if form is valid and shows errors if not
   * @param form - FormGroup to validate
   * @returns True if form is valid
   */
  static validateForm(form: FormGroup): boolean {
    if (form.valid) {
      return true;
    }
    
    this.markFormGroupTouched(form);
    return false;
  }
}

/**
 * Utility functions for string manipulation
 */
export class StringUtils {
  
  /**
   * Masks email for display (shows first 3 chars and domain)
   * @param email - Email to mask
   * @returns Masked email
   */
  static maskEmail(email: string): string {
    if (!email || !email.includes('@')) {
      return '***';
    }
    
    const [local, domain] = email.split('@');
    const maskedLocal = local.substring(0, 3) + '***';
    return `${maskedLocal}@${domain}`;
  }

  /**
   * Formats token for display (adds spaces every 2 digits)
   * @param token - Token to format
   * @returns Formatted token
   */
  static formatToken(token: string): string {
    if (!token || token.length !== 8) {
      return token;
    }
    
    return token.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
  }

  /**
   * Removes spaces from token
   * @param token - Token with spaces
   * @returns Token without spaces
   */
  static cleanToken(token: string): string {
    return token.replace(/\s/g, '');
  }
}

/**
 * Utility functions for date/time handling
 */
export class DateUtils {
  
  /**
   * Formats date for display
   * @param dateString - ISO date string
   * @returns Formatted date string
   */
  static formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  }

  /**
   * Checks if date is expired
   * @param dateString - ISO date string
   * @returns True if date is expired
   */
  static isExpired(dateString: string): boolean {
    try {
      const date = new Date(dateString);
      return date < new Date();
    } catch (error) {
      return true;
    }
  }
}
