import { Component } from '@angular/core';
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-download-sertifikat',
  standalone: true,
  imports: [
    BlueButtonComponent,
    WhiteButtonComponent,
    RouterLink,
  ],
  templateUrl: './download-sertifikat.component.html',
  styleUrl: './download-sertifikat.component.css'
})
export class DownloadSertifikatComponent {

}
