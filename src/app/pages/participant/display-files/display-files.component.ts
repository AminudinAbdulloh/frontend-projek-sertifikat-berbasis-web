import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ParticipantService } from '../../../shared/service/participant.service';

@Component({
  selector: 'app-display-files',
  standalone: true,
  imports: [],
  templateUrl: './display-files.component.html',
  styleUrl: './display-files.component.css'
})
export class DisplayFilesComponent implements OnInit {
  fileName = this.route.snapshot.paramMap.get('file-name');
  id = this.route.snapshot.paramMap.get('id');
  file: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private participantService: ParticipantService,
  ) {
  }

  ngOnInit(): void {
    if(this.fileName === 'sim-a') {
      this.getSimA(this.id!);
    }
  }

  getSimA(id: string): void {
    this.participantService.getSimA(id).pipe(
      map(response => response.data)
    ).subscribe((file: string) => {
      this.file = file;
    });
  }
}
