export interface Participant {
  id: string;
  no_pegawai?: string;
  nama: string;
  dinas?: string;
  bidang?: string;
  perusahaan: string;
  email: string;
  no_telp: string;
  negara: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  sim_a: string | File | null;
  sim_b: string | File | null;
  ktp: string | File | null;
  foto: string | File | null;
  surat_sehat_buta_warna: string | File | null;
  exp_surat_sehat: string;
  surat_bebas_narkoba: string | File | null;
  exp_bebas_narkoba: string;
  link_qr_code?: string;
  qr_code?: string | File;
  gmf_non_gmf?: string;
  link?: {
    self: string;
    update: string;
    delete: string;
  };
  editLink?: string;
  detailLink?: string;
  delete?: () => any;
}

export interface CreateParticipantModel {
  no_pegawai: string;
  nama: string;
  nik: string;
  dinas: string;
  bidang: string;
  perusahaan: string;
  email: string;
  no_telp: string;
  negara: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  sim_a: File | null;
  sim_b: File | null;
  ktp: File | null;
  foto: File | null;
  surat_sehat_buta_warna: File | null;
  surat_bebas_narkoba: File | null;
  exp_surat_sehat: string;
  exp_bebas_narkoba: string;
  link_qr_code: string;
  gmf_non_gmf: string;
}

export interface UpdateParticipantModel {
  no_pegawai?: string | null;
  nama?: string;
  nik?: string;
  dinas?: string | null;
  bidang?: string | null;
  perusahaan?: string;
  email?: string;
  no_telp?: string;
  negara?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  sim_a?: File | null;
  sim_b?: File | null;
  ktp?: File | null;
  foto?: File | null;
  surat_sehat_buta_warna?: File | null;
  surat_bebas_narkoba?: File | null;
  exp_surat_sehat?: string;
  exp_bebas_narkoba?: string;
  gmf_non_gmf?: string;
}

export interface Paging {
  current_page: number;
  total_page: number;
  size: number;
  links: {
    next: string | null;
    prev: string | null;
  };
}

export interface ApiResponse {
  code: number;
  status: string;
  data: Participant[];
  paging: Paging;
}