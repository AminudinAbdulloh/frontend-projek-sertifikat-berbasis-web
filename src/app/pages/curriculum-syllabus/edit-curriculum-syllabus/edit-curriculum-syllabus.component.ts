import { Component, OnInit } from '@angular/core';
import { TitleComponent } from "../../../components/title/title.component";
import { BaseInputComponent } from "../../../components/input/base-input/base-input.component";
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CapabilityService } from '../../../shared/service/capability.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurriculumSyllabusService } from '../../../shared/service/curriculum-syllabus.service';
import { UpdateCurriculumSyllabus } from '../../../shared/model/curriculum-syllabus.model';
import { SweetalertService } from '../../../shared/service/sweetaler.service';

@Component({
  selector: 'app-edit-curriculum-syllabus',
  standalone: true,
  imports: [
    TitleComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    FormsModule,
    RouterLink,
    CommonModule,
],
  templateUrl: './edit-curriculum-syllabus.component.html',
  styleUrl: './edit-curriculum-syllabus.component.css'
})
export class EditCurriculumSyllabusComponent implements OnInit {
  clas: string = 'add-button delete-button';
  capability = {
    id: '',
    kodeRating: '',
    kodeTraining: '',
    namaTraining: ''
  }

  regulasiGSEs: Array<{ id: string; capabilityId: string; nama: string; durasiTeori: number; durasiPraktek: number; type: string; }> = [{
    id: '',
    capabilityId: '',
    nama: '',
    durasiTeori: 0,
    durasiPraktek: 0,
    type: '',
  }];

  kompetensis: Array<{ id: string, capabilityId: string; nama: string; durasiTeori: number; durasiPraktek: number; type: string }> = [{
    id: '',
    capabilityId: '',
    nama: '',
    durasiTeori: 0,
    durasiPraktek: 0,
    type: '',
  }];

  inputGroup1: Array<any> = [];
  inputGroup2: Array<any> = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly sweetalertService: SweetalertService,
    private readonly capabilityService: CapabilityService,
    private readonly curriculumSyllabusService: CurriculumSyllabusService,
  ) { }

  capabilityId: string | null = null; // Allow null initially

  ngOnInit(): void {
    this.capabilityId = this.route.snapshot.paramMap.get('id');

    if (this.capabilityId) {
      this.capabilityService.getCapabilityById(this.capabilityId).subscribe({
        next: (response) => {
          if (typeof response.data === 'object') {
            const data = response.data;
            this.capability = {
              id: data.id,
              kodeRating: data.kodeRating,
              kodeTraining: data.kodeTraining,
              namaTraining: data.namaTraining,
            };

            // Mapping curriculumSyllabus to respective arrays
            this.regulasiGSEs = this.mapSyllabus(data.curriculumSyllabus!, 'Regulasi GSE');
            this.kompetensis = this.mapSyllabus(data.curriculumSyllabus!, 'Kompetensi');
          }
        },
        error: (error) => {
          console.log(error.error.errors);
        }
      });
    }
  }

  // Helper function to map syllabus
  mapSyllabus(syllabus: any[], type: string) {
    return syllabus
      .filter(item => item.type === type)
      .map(item => ({
        id: item.id,
        capabilityId: item.capabilityId,
        nama: item.nama,
        durasiTeori: item.durasiTeori,
        durasiPraktek: item.durasiPraktek,
        type: item.type,
      }));
  }

  onSubmit() {
    // Ensure `durasiTeori` and `durasiPraktek` are numbers
    this.regulasiGSEs = this.regulasiGSEs.map(item => ({
      ...item,
      durasiTeori: Number(item.durasiTeori),
      durasiPraktek: Number(item.durasiPraktek),
    }));

    this.kompetensis = this.kompetensis.map(item => ({
      ...item,
      durasiTeori: Number(item.durasiTeori),
      durasiPraktek: Number(item.durasiPraktek),
    }));

    // Combine both groups into a single array
    const curriculumSyllabusData = [
      ...this.regulasiGSEs,
      ...this.kompetensis
    ];

    console.log({ curriculumSyllabus: curriculumSyllabusData });

    // Send the data to the backend using the service
    this.curriculumSyllabusService.updateCurriculumSyllabus(this.capability.id, { curriculumSyllabus: curriculumSyllabusData }).subscribe({
      next: (response) => {
        this.sweetalertService.alert(true, 'Berhasil', response.data, 'success');
        this.router.navigateByUrl('/capability');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  addInput(group: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const capabilityId = this.capability.id; // Assuming capabilityId is the same as capability.id

    if (group === 'group1') {
      this.regulasiGSEs.push({
        id: '',
        capabilityId,
        nama: '', // Add name for this item
        durasiTeori: 0,
        durasiPraktek: 0,
        type: 'Regulasi GSE' // Set default type
      });
    } else if (group === 'group2') {
      this.kompetensis.push({
        id: '',
        capabilityId,
        nama: '', // Add name for this item
        durasiTeori: 0,
        durasiPraktek: 0,
        type: 'Kompetensi' // Set default type
      });
    }
  }

  deleteInput(group: string, indeks: number, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (group === 'group1') {
      this.regulasiGSEs.splice(indeks, 1); // Hapus item pada indeks yang diberikan untuk regulasiGSEs
    } else if (group === 'group2') {
      this.kompetensis.splice(indeks, 1); // Hapus item pada indeks yang diberikan untuk kompetensis
    }
  }
}