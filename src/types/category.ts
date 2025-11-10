export interface BrandPartner {
  id: string;
  nama: string;
}

export interface Category {
  id: string;
  nama: string;
  // 👇 tambahkan ini agar tidak error
  brandPartners?: BrandPartner[];
}

export interface CategoryFormData {
  nama: string;
  brandPartnerIds: string[]; // digunakan saat create/edit
}

export interface CategoryInitialData {
  id?: string;
  nama: string;
  brandPartners?: BrandPartner[];
}
