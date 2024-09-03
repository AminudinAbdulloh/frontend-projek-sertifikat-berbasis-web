import { Component } from '@angular/core';
import { BlueButtonComponent } from "../../../component/button/blue-button/blue-button.component";
import { RouterLink } from '@angular/router';
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    BlueButtonComponent,
    RouterLink,
    WhiteButtonComponent,
    RoleBasedAccessDirective
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class AddUserComponent {

}
