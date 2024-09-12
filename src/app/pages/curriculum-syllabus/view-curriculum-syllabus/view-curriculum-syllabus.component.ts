import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { WhiteButtonComponent } from '../../../elements/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../elements/button/blue-button/blue-button.component';
import { TableComponent } from "../../../components/table/table.component";

@Component({
  selector: 'app-view-curriculum-syllabus',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    WhiteButtonComponent,
    BlueButtonComponent,
    TableComponent,
  ],
  templateUrl: './view-curriculum-syllabus.component.html',
  styleUrl: './view-curriculum-syllabus.component.css'
})
export class ViewCurriculumSyllabusComponent {
  columns = [
    { header: 'Kode Rating', field: 'kodeRating' },
    { header: 'Nama Training', field: 'namaTraining' },
    { header: 'Action', field: 'action' }
  ];

  data = [
    { kodeRating: 'BTT', namaTraining: 'Baggage Towing Tractor', editLink: '/edit-curriculum', deleteMethod: () => this.deleteCapability('BTT') },
    { kodeRating: 'FLT', namaTraining: 'Forklift', action: '' },
    { kodeRating: 'RDS', namaTraining: 'Refueling Defueling System', action: '' },
    { kodeRating: 'GPS', namaTraining: 'Ground Power System', action: '' },
    { kodeRating: 'ACS', namaTraining: 'Air Conditioning System', action: '' },
    { kodeRating: 'ATT', namaTraining: 'Aircraft Towing Tractor', action: '' },
    { kodeRating: 'LSS', namaTraining: 'Lavatory Service System', action: '' },
    { kodeRating: 'WSS', namaTraining: 'Water Service System', action: '' },
    { kodeRating: 'ASS', namaTraining: 'Air Starter System', action: '' },
    { kodeRating: 'MUV', namaTraining: 'Maintenance Unit Vehicle', action: '' },
    { kodeRating: 'BTT', namaTraining: 'Baggage Towing Tractor',action: '' },
    { kodeRating: 'FLT', namaTraining: 'Forklift',action: '' },
    { kodeRating: 'RDS', namaTraining: 'Refueling Defueling System', action: '' },
    { kodeRating: 'GPS', namaTraining: 'Ground Power System',action: '' },
    { kodeRating: 'ACS', namaTraining: 'Air Conditioning System',kurikulumSilabus: 'home', action: '' },
    { kodeRating: 'ATT', namaTraining: 'Aircraft Towing Tractor', action: '' },
    { kodeRating: 'LSS', namaTraining: 'Lavatory Service System',action: '' },
    { kodeRating: 'WSS', namaTraining: 'Water Service System',action: '' },
    { kodeRating: 'ASS', namaTraining: 'Air Starter System',action: '' },
    { kodeRating: 'MUV', namaTraining: 'Maintenance Unit Vehicle',action: '' },
    { kodeRating: 'BTT', namaTraining: 'Baggage Towing Tractor', action: '' },
    { kodeRating: 'FLT', namaTraining: 'Forklift', action: '' },
    { kodeRating: 'RDS', namaTraining: 'Refueling Defueling System', action: '' },
    { kodeRating: 'GPS', namaTraining: 'Ground Power System', action: '' },
    { kodeRating: 'ACS', namaTraining: 'Air Conditioning System', kurikulumSilabus: 'home', action: '' },
    { kodeRating: 'ATT', namaTraining: 'Aircraft Towing Tractor', action: '' },
    { kodeRating: 'LSS', namaTraining: 'Lavatory Service System', action: '' },
    { kodeRating: 'WSS', namaTraining: 'Water Service System', action: '' },
    { kodeRating: 'ASS', namaTraining: 'Air Starter System', action: '' },
    { kodeRating: 'MUV', namaTraining: 'Maintenance Unit Vehicle', action: '' },
    { kodeRating: 'BTT', namaTraining: 'Baggage Towing Tractor', action: '' },
    { kodeRating: 'FLT', namaTraining: 'Forklift', action: '' },
    { kodeRating: 'RDS', namaTraining: 'Refueling Defueling System', action: '' },
    { kodeRating: 'GPS', namaTraining: 'Ground Power System', action: '' },
    { kodeRating: 'ACS', namaTraining: 'Air Conditioning System', kurikulumSilabus: 'home', action: '' },
    { kodeRating: 'ATT', namaTraining: 'Aircraft Towing Tractor', action: '' },
    { kodeRating: 'LSS', namaTraining: 'Lavatory Service System', action: '' },
    { kodeRating: 'WSS', namaTraining: 'Water Service System', action: '' },
    { kodeRating: 'ASS', namaTraining: 'Air Starter System', action: '' },
    { kodeRating: 'MUV', namaTraining: 'Maintenance Unit Vehicle', action: '' }
  ];

  currentPage = 1;
  itemsPerPage = 10;

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.data.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.data.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  deleteCapability(kodeRating: string) {
    alert(`Delete curriculum & syllabus with kode rating: ${kodeRating}`);
  }
}
