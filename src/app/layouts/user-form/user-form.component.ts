import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { BaseInputComponent } from "../../components/input/base-input/base-input.component";
import { InputRoleNikComponent } from "../../components/input/input-role-nik/input-role-nik.component";
import { WhiteButtonComponent } from "../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../components/button/blue-button/blue-button.component";
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthComponent } from "../../components/auth/auth.component";
import { TogglePasswordVisibilityComponent } from "../../components/toggle-password-visibility/toggle-password-visibility.component";
import { RoleInputComponent } from "../../components/input/role-input/role-input.component";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    RouterLink,
    TitleComponent,
    BaseInputComponent,
    InputRoleNikComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    FormsModule,
    CommonModule,
    AuthComponent,
    TogglePasswordVisibilityComponent,
    RoleInputComponent
],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() pageTitle: string = '';
  @Input() user: any = {};
  @Input() isRegister: boolean = false;
  @Input() isCreateUser: boolean = false;
  @Input() submitError: boolean = false;
  @Input() parrentMessage: string = '';
  @Input() isForgotPassword: boolean = false;
  @Input() isResetPassword: boolean = false;
  message: string = '';
  isSubmitted: boolean = false;
  blueButtonLabel: string = '';
  @Input() isCreate: boolean = false;
  @Input() isUpdate: boolean = false;

  // role-input
  @Input() selectedRole: string | null = null;

  isPassVisible: boolean = false;
  passVisible() {
    this.isPassVisible = !this.isPassVisible;
  }

  @Output() formSubmit = new EventEmitter<any>();
  @ViewChild('form') form!: NgForm;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    if(this.router.url === '/register') {
      this.blueButtonLabel = 'Daftar';
    } else {
      this.blueButtonLabel = 'Simpan';
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.user)

    if (this.form.valid) {
      this.formSubmit.emit(this.user);
    } else {
      this.message = this.getMessage();  // Menampilkan pesan error di parent jika form tidak valid
    }
  }

  onRoleChange(role: {id: string, role: string}): void {
    this.selectedRole = role.role;
    this.user.roleId = role.id;
  }

  getMessage(): string {
    if (!this.form) return '';

    // NIK
    const nikControl = this.form.controls['nik'];
    if (nikControl?.invalid) {
      if (nikControl.errors?.['required']) {
        this.submitError = true;
        return 'NIK wajib diisi';
      }
    }

    // Name
    const nameControl = this.form.controls['name'];
    if (nameControl?.invalid) {
      if (nameControl.errors?.['required']) {
        this.submitError = true;
        return 'Nama wajib diisi';
      } else if (nameControl.errors?.['pattern']) {
        this.submitError = true;
        return 'Nama hanya boleh berisi huruf';
      }
    }

    // Email
    const emailControl = this.form.controls['email'];
    if (emailControl?.invalid) {
      if (emailControl.errors?.['required']) {
        this.submitError = true;
        return 'Email wajib diisi';
      } else if (emailControl.errors?.['email']) {
        this.submitError = true;
        return 'Email tidak valid';
      }
    }

    // Password
    if(this.isCreate || this.isRegister) {
      const passwordControl = this.form.controls['password'];
      if (passwordControl?.invalid) {
        if (passwordControl.errors?.['required']) {

          this.submitError = true;
          return 'Password wajib diisi';
        } else if (passwordControl.errors?.['minlength'] || passwordControl.errors?.['pattern']) {

          this.submitError = true;
          return 'Password harus minimal 8 karakter kombinasi huruf besar kecil dan angka';
        }
      }
    }

    // Reset Password
    const newPasswordControl = this.form.controls['newPassword'];
    if (newPasswordControl?.invalid) {
      if (newPasswordControl.errors?.['required']) {
        this.submitError = true;
        return 'Password baru wajib diisi';
      } else if (newPasswordControl.errors?.['minlength'] || newPasswordControl.errors?.['pattern']) {
        this.submitError = true;
        return 'Password harus minimal 8 karakter kombinasi huruf besar kecil dan angka';
      }
    } else if (this.user.newPassword !== this.user.confirmNewPassword) {
      this.submitError = true; // Tandai sebagai kesalahan
      return 'Data konfirmasi password tidak sama'; // Pesan kesalahan
    }

    if(!this.parrentMessage) {
      this.submitError = false;
    }

    return this.parrentMessage;
  }
}
