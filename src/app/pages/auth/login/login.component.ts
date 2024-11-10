import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TitleComponent } from '../../title/title.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, TitleComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  // Static credentials
  private readonly staticUsername = 'admin';
  private readonly staticPassword = 'admin@123';

  loginError = signal<boolean>(false);
  username = signal<string>("");
  password = signal<string>("");
  isDisabled = signal<boolean>(true);


  constructor(
    private router: Router
  ) { }

  onLogin() {
    if (this.username() === this.staticUsername && this.password() === this.staticPassword) {
      const authObject = {
        username: this.username(),
        password: this.password(),
      };
      localStorage.setItem('empManagement-auth', JSON.stringify(authObject));

      // Redirect to home
      this.router.navigate(['/home']);
    } else {
      this.username.set("");
      this.password.set("");
      this.validateFields()
      this.loginError.set(true);

      // Remove error after 5 seconds
      setTimeout(() => {
        this.loginError.set(false);
      }, 5000);
    }
  }

  onFieldsChange(event: any, isPassword: boolean): void {
    const value: string = event.target.value ? event.target.value : "";
    if (isPassword) this.password.set(value);
    else this.username.set(value);
    this.validateFields();
  }

  validateFields() {
    if (this.username() && this.password()) this.isDisabled.set(false)
    else this.isDisabled.set(true)
  }

}
