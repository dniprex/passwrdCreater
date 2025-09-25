import { Component } from '@angular/core';
import { faKey, faCopy, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  passwordLength: number = 12;
  generatedPassword: string = '';
  copied: boolean = false;
  faKey = faKey;
  faCopy = faCopy;
  faRefresh = faSyncAlt;

  readonly MAX_LENGTH = 60;

  generatePassword() {
    const length = Math.min(this.passwordLength || 12, this.MAX_LENGTH);

    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';

    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    this.generatedPassword = password;
    this.copied = false;
  }

  async copyToClipboard() {
    if (this.generatedPassword) {
      try {
        await navigator.clipboard.writeText(this.generatedPassword);
        this.copied = true;
        setTimeout(() => (this.copied = false), 2000);
      } catch (err) {
        console.error('Kopyalama başarısız:', err);
      }
    }
  }
}
