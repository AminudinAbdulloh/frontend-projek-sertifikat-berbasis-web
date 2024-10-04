import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { WhiteButtonComponent } from '../../../components/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../components/button/blue-button/blue-button.component';
import { TableComponent } from "../../../components/table/table.component";
import { SearchComponent } from "../../../components/search/search.component";
import { DataManagementComponent } from "../../../layouts/data-management/data-management.component";
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { CapabilityService } from '../../../shared/service/capability.service';

@Component({
  selector: 'app-view-capability',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    WhiteButtonComponent,
    BlueButtonComponent,
    TableComponent,
    SearchComponent,
    DataManagementComponent
],
  templateUrl: './view-capability.component.html',
  styleUrl: './view-capability.component.css'
})
export class ViewCapabilityComponent {
  pageTitle: string = "View Capability";

  columns = [
    { header: 'Kode Rating', field: 'kodeRating' },
    { header: 'Kode Training', field: 'kodeTraining' },
    { header: 'Nama Training', field: 'namaTraining' },
    { header: 'Durasi Materi Regulas GSE', field: 'durasiMateriRegulasGSE' },
    { header: 'Durasi Materi Rating', field: 'durasiMateriRating' },
    { header: 'Total Durasi', field: 'totalDurasi' },
    { header: 'Kurikulum & Silabus', field: 'kurikulumSilabus' },
    { header: 'Action', field: 'action' }
  ];

  capability: any[] = [];

  // Komponen pagination
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;
  searchQuery: string = '';

  // Komponen Search
  placeHolder: string = 'Search Capability';

  constructor(
    private capabilityService: CapabilityService,
    private sweetalertService: SweetalertService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.currentPage =+ params['page'] || 1;
      if (this.searchQuery) {
        // this.getSearchParticipants(this.searchQuery, this.currentPage, this.itemsPerPage);
      } else {
        this.getListParticipants(this.currentPage, this.itemsPerPage);
      }
    });
  }

  getListParticipants(page: number, size: number): void {
    this.capabilityService.listCapability(page, size).subscribe((response: any) => {
      if (response.code === 200 && response.status === 'OK') {
        console.log('List Response', response);
        this.capability = response.data.map((capability: any) => {
          const totalDurasiRegulasiGSE = capability.curriculums ? capability.curriculums.regulasiGSEs.reduce((total: number, regulasi: any) => {
            return total + regulasi.durasi_teori + regulasi.durasi_praktek;
          }, 0) : "-";

          const totalDurasiKompetensi = capability.curriculums ? capability.curriculums.kompetensis.reduce((total: number, kompetensi: any) => {
            return total + kompetensi.durasi_teori + kompetensi.durasi_praktek;
          }, 0) : "-";
          console.log("Capability: ", capability)

          return {
            kodeRating: capability.kode_rating,
            kodeTraining: capability.kode_training,
            namaTraining: capability.nama_training,
            durasiMateriRegulasGSE: totalDurasiRegulasiGSE,
            durasiMateriRating: totalDurasiKompetensi,
            totalDurasi: capability.curriculums?.total_durasi || "-",
            kurikulumSilabus: capability.curriculums?.id || "-",
            editLink: response.actions.canEdit ? `/capability/${capability.id}/edit` : null,
            detailLink: response.actions.canView ? `/capability/${capability.id}/view` : null,
            deleteMethod: response.actions.canDelete ? () => this.deleteCapability(capability) : null,
          };
        });
        this.totalPages = response.paging.total_page;
      } else {
        this.capability = [];
      }
    });
  }

  deleteCapability(capability: any) {
    throw new Error('Method not implemented.');
  }

  onPageChanged(page: number): void {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  viewAll(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: null, page: null },
      queryParamsHandling: 'merge',
    });

    this.searchQuery = '';
  }

  onBlueButtonClick() {
    this.router.navigateByUrl('/capability/add');
  }

  onWhiteButtonClick() {
    this.router.navigateByUrl('/home');
  }

}
