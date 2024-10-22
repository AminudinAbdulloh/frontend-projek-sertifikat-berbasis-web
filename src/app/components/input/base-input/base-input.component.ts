import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TogglePasswordVisibilityComponent } from "../../toggle-password-visibility/toggle-password-visibility.component";

@Component({
  selector: 'app-base-input',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BaseInputComponent),
    multi: true
  }],
  imports: [
    FormsModule,
    CommonModule,
    TogglePasswordVisibilityComponent
],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.css'
})
export class BaseInputComponent {
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() inputMode: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() errorInput: boolean = false;
  @Input() isRequired: boolean = false;

  // Komponen toggle-password-visibility
  @Input() isPassVisible: boolean = false;
  @Output() togglePassClick = new EventEmitter<void>();

  passVisible() {
    this.togglePassClick.emit();
  }

  @Output() valueChange = new EventEmitter<string>();

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onValueChange(): void {
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  // Properti opsional untuk mengaktifkan validasi huruf atau pola lainnya
  @Input() restrictToPattern: string | null = null; // Pola akan diambil dari parent

  onKeyDown(event: KeyboardEvent) {
    if (this.restrictToPattern) {
      const regex = new RegExp(this.restrictToPattern);
      const key = event.key;

      // Mengizinkan tombol Backspace, Delete, dan Arrow keys
      if (key === 'Backspace' || key === 'Delete' || key.startsWith('Arrow')) {
        return; // Izinkan tombol ini bekerja
      }

      // Cek apakah karakter yang ditekan tidak sesuai dengan pola
      if (!regex.test(key)) {
        event.preventDefault();  // Mencegah input jika karakter tidak sesuai dengan pola
      }
    }
  }
}
