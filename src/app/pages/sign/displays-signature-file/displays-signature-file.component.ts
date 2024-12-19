import { Component } from '@angular/core';
import { DisplayFilesComponent } from "../../../contents/display-files/display-files.component";
import { LoaderComponent } from "../../../components/loader/loader.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ESignService } from '../../../shared/service/e-sign.service';
import { finalize, map } from 'rxjs';

@Component({
  selector: 'app-displays-signature-file',
  standalone: true,
  imports: [
    DisplayFilesComponent,
    LoaderComponent
],
  templateUrl: './displays-signature-file.component.html',
  styleUrl: './displays-signature-file.component.css'
})
export class DisplaysSignatureFileComponent {
  pageTitle: string = '';
  id = this.route.snapshot.paramMap.get('id');
  navigationLink: string = '';
  file: string | undefined;
  fileType: string = '';
  safeUrl: SafeResourceUrl | string = '';
  cachedUserProfile = localStorage.getItem('user_profile');
  isLoading: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly eSignService: ESignService,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    if(state) {
      this.navigationLink = state['data']
    } else {
      if(this.cachedUserProfile) {
        const userProfile = JSON.parse(this.cachedUserProfile);
        if(userProfile.role.name === 'user') {
          this.navigationLink = `/participants/${this.id}/profile/personal`;
        } else {
          this.navigationLink = `/participants/${this.id}/detail`;
        }
      }
    }
  }

  ngOnInit(): void {
    if (this.id) {
      this.getFile(this.id);
    }
  }

  getFile(id: string): void {
    this.isLoading = true;
    this.eSignService.getESignFile(id).pipe(
      map(response => response.data),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (file) => {
        this.file = file;
        this.fileType = this.getMediaType(file);

        if (this.fileType === 'application/pdf') {
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:${this.fileType};base64,${file}#toolbar=0`);
        } else {
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:${this.fileType};base64,${file}`);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onImageLoad() {
    this.isLoading = false;
  }

  onImageError() {
    console.log('Failed to load image:', this.safeUrl);
    this.isLoading = false; // Hindari spinner terus tampil
  }

  private getMediaType(base64String: string): string {
    const header = base64String.slice(0, 10);
    if (header.startsWith('/9j/')) return 'image/jpeg';
    if (header.startsWith('iVBORw0KGg')) return 'image/png';
    if (header.startsWith('JVBER')) return 'application/pdf';
    return '';
  }

  getDownloadExtension(): string {
    switch (this.fileType) {
      case 'image/png': return '.png';
      case 'image/jpeg': return '.jpeg';
      case 'application/pdf': return '.pdf';
      default: return '';
    }
  }
}
