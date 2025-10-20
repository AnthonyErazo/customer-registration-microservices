import { Component } from '@angular/core';
import { ClientRegistrationComponent } from './components/client-registration.component';
import { APP_CONFIG } from './config/app.config';

@Component({
  selector: 'app-root',
  imports: [ClientRegistrationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = APP_CONFIG.TITLE;
  description = APP_CONFIG.DESCRIPTION;
}
