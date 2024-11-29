import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { BaseInputComponent } from "../../components/input/base-input/base-input.component";
import { WhiteButtonComponent } from "../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../components/button/blue-button/blue-button.component";
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthComponent } from "../../components/auth/auth.component";
import { DropdownInputComponent } from "../../components/input/dropdown-input/dropdown-input.component";
import { RoleService } from '../../shared/service/role.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    RouterLink,
    TitleComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    FormsModule,
    CommonModule,
    AuthComponent,
    DropdownInputComponent
],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  @Input() pageTitle: string = '';
  @Input() user: any = {};
  @Input() isRegister: boolean = false;
  @Input() isResetPassword: boolean = false;
  @Input() blueButtonLabel: string = 'Simpan';
  @Input() isCreate: boolean = false;
  @Input() registerMessage: string = '';
  @Input() isSuccess: boolean = false;

  // role-input
  roleOptions: { label: string, value: string }[] = [];
  roleData: any[] = []; // Store the full training data
  selectedRole: any = '';
  @Input() initialRole: string = '';

  isPassVisible: boolean = false;
  passVisible() {
    this.isPassVisible = !this.isPassVisible;
  }

  @Output() formSubmit = new EventEmitter<any>();
  @ViewChild('form') form!: NgForm;

  currentUserRole: string | null = sessionStorage.getItem('currentUserRole');

  constructor(
    private readonly roleService: RoleService,
  ) {}

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe({
      next: (response) => {
        this.roleData = response.data;
        this.roleOptions = response.data.map(role => ({
          label: role.name,
          value: role.id
        }));
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSubmit() {
    if (this.form.valid) {
      if(this.isCreate) {
        this.formSubmit.emit(this.user);
      } else {
        if(this.currentUserRole !== 'super admin') {
          this.user.email = undefined;
        }
        this.formSubmit.emit(this.user);
      }
    }
  }

  onRoleSelected(role: any) {
    this.selectedRole = this.roleData.find(r => r.id === role);
    this.user.roleId = role;
  }
}
