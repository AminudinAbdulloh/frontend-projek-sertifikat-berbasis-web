import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { ParticipantService } from '../../../shared/service/participant.service';
import { DisplayFilesComponent } from '../../../layouts/display-files/display-files.component';
import { SweetalertService } from '../../../shared/service/sweetaler.service';

@Component({
  selector: 'app-display-participants-files',
  standalone: true,
  imports: [
    DisplayFilesComponent,
    RouterLink,
  ],
  templateUrl: './display-files-participants.component.html',
  styleUrl: './display-files-participants.component.css'
})
export class DisplayFilesParticipantsComponent implements OnInit {
  fileName = this.route.snapshot.paramMap.get('file-name');
  pageTitle: string = this.fileName!.toUpperCase().split('-').join(' ');
  id = this.route.snapshot.paramMap.get('id');
  navigationLink: string = `/participants/${this.id}/detail`;
  file: string | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly participantService: ParticipantService,
    private readonly router: Router,
    private readonly sweetalertService: SweetalertService,
  ) {
  }

  ngOnInit(): void {
    if(this.fileName === 'sim-a') {
      this.getFile(this.id!, this.fileName);
    } else if(this.fileName === 'sim-b') {
      this.getFile(this.id!, this.fileName);
    } else if(this.fileName === 'ktp') {
      this.getFile(this.id!, this.fileName);
    } else if(this.fileName === 'surat-sehat-buta-warna') {
      this.getFile(this.id!, this.fileName);
    } else if(this.fileName === 'surat-bebas-narkoba') {
      this.getFile(this.id!, this.fileName);
    }
  }

  getFile(id: string, fileName: string): void {
    this.participantService.getFile({ id }, fileName).pipe(
      map(response => response.data)
    ).subscribe({
      next: (file: string) => {
        this.file = file;
      },
      error: (error) => {
        console.log(error);
        this.router.navigateByUrl(this.id ? this.navigationLink : '/participants')
        if(error.error.code === 404) {
          this.sweetalertService.alert('File Tidak Ada', 'Silahkan lengkapi data terlebih dahulu', 'warning');
        }
      }
    });
  }
}
