// ==========================
// 🧩 PRODUCT RELATED TYPES
// ==========================
export interface Product {
  id: string;
  nama: string;
  deskripsi?: string | null; // ✅ optional agar tidak error jika kosong
  isFavorite: boolean;
  categories: Category[];
  options: ProductOption[];
  images: ProductImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductOption {
  id: string;
  productId: string;
  warna: string;
  variant: string;
  hargaAsli: number;
  hargaJual: number;
  stock: number;
  specs: ProductSpec[];
  images: OptionImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  urutan: number;
  createdAt: Date;
}

export interface OptionImage {
  id: string;
  productOptionId: string;
  imageUrl: string;
  urutan: number;
  createdAt: Date;
}

export interface ProductSpec {
  id: string;
  productOptionId: string;
  deskripsi_spec: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ==========================
// 🧩 CATEGORY & BRAND TYPES
// ==========================
export interface Category {
  id: string;
  nama: string;
  brandPartners?: BrandPartner[];
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BrandPartner {
  id: string;
  nama: string;
  image?: string | null;
  aboutId?: string | null;
  categories?: Category[];
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Tambahan: tipe gabungan Brand dengan relasi Category
export interface BrandWithCategories extends BrandPartner {
  categories: Category[];
}

// ==========================
// 🧩 BANNER TYPES
// ==========================
export interface Banner {
  id: string;
  title: string;
  deskripsi?: string | null; // ✅ dibuat optional agar aman
  image?: string | null;
  urutan: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BannerFormData {
  title: string;
  deskripsi?: string | null;
  image?: string | null;
  urutan?: number;
  isActive?: boolean;
}

// ==========================
// 🧩 USER TYPES
// ==========================
export interface User {
  id: string;
  name?: string | null;
  username?: string | null;
  email: string;
  image?: string | null;
  role: "DEVELOPER" | "ADMIN" | "EDITOR" | "USER";
  createdAt: Date;
  updatedAt: Date;
}

// ==========================
// 🧩 FAQ TYPES
// ==========================
export interface FAQ {
  id: string;
  pertanyaan: string;
  jawaban: string;
  urutan: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ==========================
// 🧩 HOME & ABOUT TYPES
// ==========================
export interface Home {
  id: string;
  title: string;
  deskripsi?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface About {
  id: string;
  title: string;
  deskripsi?: string | null;
  image?: string | null;
  visi: string;
  misi: string;
  layanan: string;
  brandPartner?: BrandPartner[];
  contact?: Contact[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  id: string;
  email: string;
  nomor_wa: string;
  alamat: string;
  maps_link?: string | null;
  jam_operasional: string;
  instagram?: string | null;
  tiktok?: string | null;
  whatsapp?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  aboutId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ==========================
// 🧩 SETTING & MARKETPLACE TYPES
// ==========================
export interface SettingSite {
  id: string;
  logo?: string | null;
  nama_company: string;
  tagline: string;
  metadataTitle: string;
  favicon?: string | null;
  metakeyword?: string | null;
  metadesc?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Marketplace {
  id: string;
  tiktokshop?: string | null;
  tokopedia?: string | null;
  shopee?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ==========================
// 🧩 MESSAGE & LOG TYPES
// ==========================
export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

export interface ActivityLog {
  id: number;
  action: string;
  entity?: string | null;
  entityId?: number | null;
  user?: string | null;
  createdAt: Date;
}
