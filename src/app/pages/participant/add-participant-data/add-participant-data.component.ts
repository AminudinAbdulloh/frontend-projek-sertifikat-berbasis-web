import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../../component/navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../component/button/blue-button/blue-button.component';
import { InputFileComponent } from "../../../component/input/input-file/input-file.component";
import { InputTextComponent } from '../../../component/input/input-text/input-text.component';
import { InputDateComponent } from "../../../component/input/input-date/input-date.component";
import { InputCompanyComponent } from "../../../component/input/input-company/input-company.component";
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';
import { ParticipantService } from '../../../shared/service/participant.service';
import { environment } from '../../../../environments/environment.development';
import { CreateParticipantModel } from '../../../shared/model/participant.model';

@Component({
  selector: 'app-add-participant-data',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    BlueButtonComponent,
    WhiteButtonComponent,
    InputFileComponent,
    InputTextComponent,
    InputDateComponent,
    InputCompanyComponent,
    RoleBasedAccessDirective
],
  templateUrl: './add-participant-data.component.html',
  styleUrl: './add-participant-data.component.css'
})
export class AddParticipantDataComponent {
  @ViewChild(InputCompanyComponent) inputCompanyComponent!: InputCompanyComponent;

  createParticipant: CreateParticipantModel = {
    no_pegawai: '',
    nama: '',
    nik: '',
    dinas: '',
    bidang: '',
    perusahaan: '',
    email: '',
    no_telp: '',
    negara: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    sim_a: null,
    sim_b: null,
    ktp: null,
    foto: null,
    surat_sehat_buta_warna: null,
    surat_bebas_narkoba: null,
    exp_surat_sehat: '',
    exp_bebas_narkoba: '',
    link_qr_code: environment.link_qr_code,
    gmf_non_gmf: ''
  };

  constructor(
    private router: Router,
    private participantService: ParticipantService,
  ) {}

  onCreate() {
    const formData = new FormData();
    this.createParticipant.perusahaan = this.inputCompanyComponent.getCompanyName();

    for (const key in this.createParticipant) {
      if (this.createParticipant.hasOwnProperty(key)) {
        formData.append(key, this.createParticipant[key as keyof CreateParticipantModel] as any);
      }
    }

    this.participantService.createParticipant(formData).subscribe({
      next: (response) => {
        alert('Peserta berhasil ditambahkan');
        this.router.navigateByUrl(`/participant/${response.data.id}/view`);
      },
      error: (error) => {
        const e = error.error.errors;
        console.log(e)
      }
    });
  }

  onFileChange(property: keyof CreateParticipantModel, file: File | null): void {
    (this.createParticipant as any)[property] = file;
  }
}
