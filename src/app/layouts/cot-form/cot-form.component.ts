import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { BaseInputComponent } from "../../components/input/base-input/base-input.component";
import { WhiteButtonComponent } from "../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../components/button/blue-button/blue-button.component";
import { RouterLink } from '@angular/router';
import { DropdownInputComponent } from "../../components/input/dropdown-input/dropdown-input.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CapabilityService } from '../../shared/service/capability.service';
import { Capability } from '../../shared/model/capability.model';

@Component({
  selector: 'app-cot-form',
  standalone: true,
  imports: [
    TitleComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    RouterLink,
    DropdownInputComponent,
    FormsModule,
    CommonModule,
],
  templateUrl: './cot-form.component.html',
  styleUrl: './cot-form.component.css'
})
export class CotFormComponent implements OnInit {
  constructor(private readonly capabilityService: CapabilityService) { }

  @Input() pageTitle: string = '';
  @Input() cot: any = {};
  @Input() selectedValue: any; // Initial selected value (optional)

  // Output event to emit the selected value to the parent component
  @Output() selectionChange = new EventEmitter<any>();

  @Output() formSubmit = new EventEmitter<any>();
  @ViewChild('form') form!: NgForm;

  capabilityOptions: { label: string, value: string }[] = [];
  capabilityData: any[] = []; // Store the full training data
  selectedCapabily: any = '';
  @Input() initialCapability: string = '';

  statusOptions: { label: string, value: string }[] = [
    {
      label: 'Akan datang',
      value: 'Akan datang'
    },
    {
      label: 'Sedang berjalan',
      value: 'Sedang berjalan'
    },
    {
      label: 'Selesai',
      value: 'Selesai'
    },
  ];
  statusData: any[] = []; // Store the full training data
  selectedStatus: any = '';

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.cot);
    }
  }

  ngOnInit(): void {
    this.capabilityService.getAllCapability().subscribe({
      next: (response) => {
        const capability = response.data as Capability[];
        this.capabilityData = capability;
        this.capabilityOptions = capability.map(training => ({
          label: training.ratingCode,
          value: training.id
        }));
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onCapabilitySelected(capability: any) {
    this.selectedCapabily = this.capabilityData.find(training => training.id === capability);
    this.cot.capabilityId = capability;
  }

  onStatusSelected(status: any) {
    this.selectedStatus = this.statusData.find(s => s.status === status);
    this.cot.status = status;
  }
}
