export interface Participant {
  id: string;
  idNumber?: string;
  name: string;
  nik: string;
  dinas?: string;
  bidang?: string;
  company: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  placeOfBirth: string;
  dateOfBirth: string;
  simA: File | null;
  simB: File | null;
  ktp: File | null;
  foto: File | null;
  suratSehatButaWarna: File | null;
  tglKeluarSuratSehatButaWarna: string;
  suratBebasNarkoba: File | null;
  tglKeluarSuratBebasNarkoba: string;
  qrCodeLink?: string;
  qrCode?: string | File;
  gmfNonGmf?: string;
}

export interface UpdateParticipant {
  idNumber?: string;
  name?: string;
  nik?: string;
  dinas?: string;
  bidang?: string;
  company?: string;
  phoneNumber?: string;
  nationality?: string;
  placeOfBirth?: string;
  dateOfBirth?: string;
  simA?: File | null;
  simAFileName?: string;
  simB?: File | null;
  simBFileName?: string;
  ktp?: File | null;
  ktpFileName?: string;
  foto?: File | null;
  fotoFileName?: string;
  suratSehatButaWarna?: File | null;
  suratSehatButaWarnaFileName?: string;
  suratBebasNarkoba?: File | null;
  suratBebasNarkobaFileName?: string;
  tglKeluarSuratSehatButaWarna?: string;
  tglKeluarSuratBebasNarkoba?: string;
  qrCodeLink?: string;
}

export interface CreateParticipant {
  idNumber?: string | null;
  name: string;
  nik: string;
  dinas?: string | null;
  bidang?: string | null;
  company: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  placeOfBirth: string;
  dateOfBirth: string;
  simA: File | null;
  simAFileName?: string;
  simB: File | null;
  simBFileName?: string;
  ktp: File | null;
  ktpFileName?: string;
  foto: File | null;
  fotoFileName?: string;
  suratSehatButaWarna: File | null;
  suratSehatButaWarnaFileName?: string;
  suratBebasNarkoba: File | null;
  suratBebasNarkobaFileName: string;
  tglKeluarSuratSehatButaWarna: string;
  tglKeluarSuratBebasNarkoba: string;
  qrCodeLink: string;
}

export interface ParticipantResponse {
  id: string;
  idNumber?: string;
  name: string;
  nik: string;
  dinas?: string;
  bidang?: string;
  company: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  placeOfBirth: string;
  dateOfBirth: string;
  simA: File | null;
  simB: File | null;
  ktp: File | null;
  foto: File | null;
  suratSehatButaWarna: File | null;
  tglKeluarSuratSehatButaWarna: string;
  suratBebasNarkoba: File | null;
  tglKeluarSuratBebasNarkoba: string;
  qrCodeLink?: string;
  qrCode?: string | File;
  gmfNonGmf?: string;
}
