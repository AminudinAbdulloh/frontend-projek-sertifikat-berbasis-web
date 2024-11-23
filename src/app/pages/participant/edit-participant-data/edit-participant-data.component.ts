import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Participant, UpdateParticipant } from '../../../shared/model/participant.model';
import { ParticipantService } from '../../../shared/service/participant.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { CompanyInputComponent } from '../../../components/input/company-input/company-input.component';
import { ParticipantFormComponent } from '../../../layouts/participant-form/participant-form.component';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-edit-participant-data',
  standalone: true,
  imports: [
    ParticipantFormComponent,
],
  templateUrl: './edit-participant-data.component.html',
})
export class EditParticipantDataComponent implements OnInit {
  @ViewChild(CompanyInputComponent) companyInputComponent!: CompanyInputComponent;

  updateParticipant: UpdateParticipant = {
    idNumber: '',
    name: '',
    nik: '',
    dinas: '',
    bidang: '',
    company: '',
    phoneNumber: '',
    nationality: '',
    placeOfBirth: '',
    dateOfBirth: '',
    simA: null,
    simAFileName: '',
    simB: null,
    simBFileName: '',
    ktp: null,
    ktpFileName: '',
    foto: null,
    fotoFileName: '',
    suratSehatButaWarna: null,
    suratSehatButaWarnaFileName: '',
    suratBebasNarkoba: null,
    suratBebasNarkobaFileName: '',
    tglKeluarSuratSehatButaWarna: '',
    tglKeluarSuratBebasNarkoba: '',
  };

  participantId = this.route.snapshot.paramMap.get('id');

  // Company Input
  @Input() selectedCompany: string = '';
  @Input() companyName: string = '';
  @Input() showCompanyInput: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participantService: ParticipantService,
    private sweetalertService: SweetalertService,
  ) {
  }

  ngOnInit(): void {
    this.loadParticipant();
    this.route.queryParams.subscribe(params => {
      if (params['showAlert']) {
        this.sweetalertService.alert(
          'Peringatan',
          'Anda tidak bisa mengakses halaman lain sebelum melengkapi data',
          'warning'
        );

        // Hapus query parameter
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { showAlert: null },
          queryParamsHandling: 'merge'
        });
      }
    });
  }

  loadParticipant(): void {
    this.participantService.getParticipantById(this.participantId!).subscribe({
      next: (response) => {
        const responseData = response.data as Participant;
        this.updateParticipant = {
          ...responseData,
          dateOfBirth: this.formatDateToISO(responseData.dateOfBirth),
          tglKeluarSuratSehatButaWarna : this.formatDateToISO(responseData.tglKeluarSuratSehatButaWarna),
          tglKeluarSuratBebasNarkoba : this.formatDateToISO(responseData.tglKeluarSuratBebasNarkoba),
        };

        // Company Input
        this.selectedCompany = responseData.gmfNonGmf ? responseData.gmfNonGmf : responseData.company;
        if(responseData.gmfNonGmf !== 'GMF' || responseData.company !== 'GMF') {
          this.companyName = responseData.company;
          if(this.companyName && this.companyName.toLowerCase() === 'non gmf') {
            this.showCompanyInput = true;
          } else {
            this.selectedCompany = 'GMF'
            this.showCompanyInput = false;
          }
        }
      },
      error: (error) => {
        console.log(error.error);
      }
    });
  }

  onUpdate(participant: UpdateParticipant) {
    participant.qrCodeLink = environment.qrCodeLink;
    const formData = this.prepareFormData(participant);
    this.sweetalertService.loading('Mohon tunggu', 'Proses...');

    this.participantService.updateParticipant(this.participantId!, formData).subscribe({
      next: (response) => {
        this.sweetalertService.alert('Diperbarui!', 'Peserta berhasil diperbarui', 'success');
        this.router.navigateByUrl(`/participants/${(response.data as Participant).id}/detail`);
      },
      error: (error) => {
        console.log(error);
        this.sweetalertService.alert('Gagal!', 'Gagal memperbarui peserta', 'error');
      }
    });
  }

  onFileChange(property: string, file: File | null): void {
    if (file) {
      (this.updateParticipant as any)[property] = file;
      const fileNameProperty = `${property}FileName`;
      // Mengisi name file ke property yang sesuai
      (this.updateParticipant as any)[fileNameProperty] = file.name;
    }
  }

  private prepareFormData(participant: any): FormData {
    const formData = new FormData();
    for (const key in participant) {
      if (participant.hasOwnProperty(key)) {
        const value = participant[key];
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined && value !== null) { // Menambahkan nilai kosong
          formData.append(key, value);
        }
      }
    }
    return formData;
  }

  private formatDateToISO(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }
}
