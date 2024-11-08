import { Injectable } from "@angular/core";
import { SweetalertService } from "./sweetaler.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private sweetalertService: SweetalertService) { }

  handleError(error?: any, requiredFields?: string[]): void {
    const e = error.error.errors;

    const isObject = (obj: any) => obj !== null && typeof obj === 'object' && !Array.isArray(obj);

    // Fungsi untuk mengecek apakah objek memiliki field tertentu
    const hasRequiredFields = (obj: any, fields: string[]) =>
      fields.some(field => obj[field]);

    if (isObject(e) || Array.isArray(e)) {
      if (e.message) {
        this.sweetalertService.alert('Gagal!', e.message, 'error');
      } else if (hasRequiredFields(e, requiredFields!)) {
        this.sweetalertService.alert('Gagal!', 'Kolom dengan tanda bintang (*) wajib diisi', 'error');
      }
    } else {
      this.sweetalertService.alert('Gagal!', e, 'error');
    }
  }

  handleErrorString(error?: any, requiredFields?: string[]): string {
    const e = error.error.errors;

    const isObject = (obj: any) => obj !== null && typeof obj === 'object' && !Array.isArray(obj);

    // Fungsi untuk mengecek apakah objek memiliki field tertentu
    const hasRequiredFields = (obj: any, fields: string[]) =>
      fields.some(field => obj[field]);

    if (isObject(e) || Array.isArray(e)) {
      if (e.message) {
        return e.message;
      } else if (hasRequiredFields(e, requiredFields!)) {
        return 'Kolom dengan tanda bintang (*) wajib diisi';
      }
    } else {
      return e;
    }
    return 'Terjadi kesalahan, silahkan tunggu beberapa saat lalu coba kembali';
  }
}
