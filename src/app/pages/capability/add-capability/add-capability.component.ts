import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../component/navbar/navbar.component";
import { InputTextComponent } from "../../../component/input/input-text/input-text.component";
import { WhiteButtonComponent } from "../../../component/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../component/button/blue-button/blue-button.component";

@Component({
  selector: 'app-add-capability',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    InputTextComponent,
    WhiteButtonComponent,
    BlueButtonComponent
  ],
  templateUrl: './add-capability.component.html',
  styleUrl: './add-capability.component.css'
})
export class AddCapabilityComponent {

}