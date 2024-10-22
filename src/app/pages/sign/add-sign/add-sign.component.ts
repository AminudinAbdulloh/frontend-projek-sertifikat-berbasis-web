import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../../components/header/header.component";
import { FileInputComponent } from "../../../components/input/file-input/file-input.component";
import { WhiteButtonComponent } from '../../../components/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../components/button/blue-button/blue-button.component';
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';

@Component({
  selector: 'app-add-sign',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    BaseInputComponent,
    FileInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
],
  templateUrl: './add-sign.component.html',
  styleUrl: './add-sign.component.css'
})
export class AddSignComponent {

}