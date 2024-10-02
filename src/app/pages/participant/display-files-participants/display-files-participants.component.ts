import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { ParticipantService } from '../../../shared/service/participant.service';
import { DisplayFilesComponent } from '../../../layouts/display-files/display-files.component';

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
  navigationLink: string = `/participants/${this.id}/view`;
  file: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private participantService: ParticipantService,
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
    ).subscribe((file: string) => {
      this.file = file;
    });
  }
}