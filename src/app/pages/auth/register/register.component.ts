import { Component } from '@angular/core';
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { AuthComponent } from "../../../components/auth/auth.component";
import { RouterLink } from '@angular/router';
import { RegisterUserRequest } from '../../../shared/model/auth.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/service/auth.service';
import { TitleComponent } from "../../../components/title/title.component";
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';
import { UserFormComponent } from '../../../layouts/user-form/user-form.component';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { ErrorHandlerService } from '../../../shared/service/error-handler.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    BlueButtonComponent,
    AuthComponent,
    RouterLink,
    BaseInputComponent,
    FormsModule,
    CommonModule,
    HttpClientModule,
    TitleComponent,
    UserFormComponent,
],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerUserRequest: RegisterUserRequest = {
    noPegawai: '',
    nik: '',
    email: '',
    name: '',
    password: '',
    dinas: '',
  };

  isSuccess: boolean = false;
  registerMessage: string = '';

  constructor(
    private authService: AuthService,
    private readonly sweetalertService: SweetalertService,
    private readonly handleErrorService: ErrorHandlerService,
  ){ }

  onRegister(user: RegisterUserRequest) {
    this.cleanEmptyFields(user);
    this.sweetalertService.loading('Mohon tunggu', 'Proses...');
    console.log(user);

    this.authService.register(user).subscribe({
      next: () => {
        this.sweetalertService.close();
        this.isSuccess = true;
        this.registerMessage = 'Register berhasil, silahkan verifikasi email anda';
      },
      error: (error) => {
        console.log(error);
        this.sweetalertService.close();
        this.isSuccess = false;
        this.registerMessage = this.handleErrorService.handleErrorString(error, ['nik', 'email', 'nama', 'password']);
      },
    });
  }

  private cleanEmptyFields(object: any): void {
    for (const key in object) {
      if (object.hasOwnProperty(key) && object[key] === '') {
        object[key] = undefined;  // Atau bisa diubah menjadi undefined
      }
    }
  }
}
