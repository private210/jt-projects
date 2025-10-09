export interface ProductOption {
  color: string;
  variant: string;
  stock: number;
}
export interface MarketplaceLink {
  name: "Shopee" | "Tokopedia" | "TikTok";
  url: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  imageUrl: string[];
  inStock: boolean;
  isFavorite: boolean;
  isNew: boolean;
  isOnSale: boolean;
  options: ProductOption[];
  specs?: Record<string, string>;
  marketplaces?:MarketplaceLink[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    description: "The Apple Watch Series 7 is a sleek and stylish smartwatch with a large, always-on Retina display, advanced health and fitness tracking features, and seamless integration with your iPhone.",
    price: 5999999,
    oldPrice: 9999999,
    rating: 4.5,
    imageUrl: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
    ],
    inStock: true,
    isFavorite: true,
    isNew: true,
    isOnSale: true,
    options: [
      { color: "Black", variant: "8/128GB", stock: 3 },
      { color: "Black", variant: "8/256GB", stock: 2 },
      { color: "White", variant: "8/128GB", stock: 1 },
      { color: "Silvermoon", variant: "12/256GB", stock: 4 },
      { color: "Gold", variant: "12/512GB", stock: 0 },
      { color: "Space Gray", variant: "8/512GB", stock: 0 },
    ],
    specs: {
      Layar: "6.8 inci Dynamic AMOLED 2X, 120Hz",
      Prosesor: "Exynos 2100 / Snapdragon 888",
      "Kamera Belakang": "108MP + 10MP + 10MP + 12MP",
      "Kamera Depan": "40MP",
      Baterai: "5000mAh, Fast Charging 25W",
      OS: "Android 11, One UI 3.1",
    },
  },
  {
    id: 2,
    name: "Samsung Galaxy S21 Ultra 5G",
    description: "The Samsung Galaxy S21 Ultra 5G is a top-of-the-line smartphone with a sleek and modern design.",
    price: 6999999,
    oldPrice: 9999999,
    rating: 4.7,
    imageUrl: [
      "https://i.pinimg.com/736x/c9/67/ab/c967abd325ea5e84b06c56a680609b43.jpg",
      "https://i.pinimg.com/1200x/e0/69/36/e06936903e3f4f471a16d1dfb0e37455.jpg",
      "https://i.pinimg.com/736x/8d/48/62/8d4862ea00ed6b72492ca7d30b42ea78.jpg",
    ],
    inStock: true,
    isFavorite: true,
    isNew: true,
    isOnSale: false,
    options: [
      { color: "Black", variant: "8/128GB", stock: 2 },
      { color: "Black", variant: "12/256GB", stock: 1 },
      { color: "White", variant: "12/512GB", stock: 2 },
    ],
    specs: {
      Layar: "6.8 inci Dynamic AMOLED 2X, 120Hz",
      Prosesor: "Exynos 2100 / Snapdragon 888",
      "Kamera Belakang": "108MP + 10MP + 10MP + 12MP",
      "Kamera Depan": "40MP",
      Baterai: "5000mAh, Fast Charging 25W",
      OS: "Android 11, One UI 3.1",
    },
    marketplaces: [
      { name: "Shopee", url: "https://shopee.co.id/product/123" },
      { name: "Tokopedia", url: "https://tokopedia.link/produk/123" },
      { name: "TikTok", url: "https://www.tiktokglobalshop.com/product/123" },
    ],
  },
  {
    id: 3,
    name: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
    description: "The Sony WH-1000XM4 headphones are a top-of-the-line wireless noise-cancelling headphones with a sleek and modern design.",
    price: 8999999,
    oldPrice: 9999999,
    rating: 4.6,
    imageUrl: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
    ],
    inStock: false,
    isFavorite: false,
    isNew: false,
    isOnSale: true,
    options: [
      { color: "Black", variant: "Default", stock: 0 },
      { color: "Silvermoon", variant: "Default", stock: 0 },
    ],
    specs: {
      Layar: "6.8 inci Dynamic AMOLED 2X, 120Hz",
      Prosesor: "Exynos 2100 / Snapdragon 888",
      "Kamera Belakang": "108MP + 10MP + 10MP + 12MP",
      "Kamera Depan": "40MP",
      Baterai: "5000mAh, Fast Charging 25W",
      OS: "Android 11, One UI 3.1",
    },
  },
  {
    id: 4,
    name: "Dell XPS 13 Laptop",
    description: "The Dell XPS 13 is a high-performance laptop with a stunning InfinityEdge display, powerful Intel processors, and a sleek design.",
    price: 7999999,
    oldPrice: 9999999,
    rating: 4.4,
    imageUrl: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
    ],
    inStock: true,
    isFavorite: true,
    isNew: false,
    isOnSale: false,
    options: [
      { color: "Silvermoon", variant: "i5/8GB/256GB", stock: 1 },
      { color: "Silvermoon", variant: "i7/16GB/512GB", stock: 2 },
    ],
    specs: {
      Layar: "6.8 inci Dynamic AMOLED 2X, 120Hz",
      Prosesor: "Exynos 2100 / Snapdragon 888",
      "Kamera Belakang": "108MP + 10MP + 10MP + 12MP",
      "Kamera Depan": "40MP",
      Baterai: "5000mAh, Fast Charging 25W",
      OS: "Android 11, One UI 3.1",
    },
  },
  {
    id: 5,
    name: "Apple iPad Pro 11-inch",
    description: "The Apple iPad Pro 11-inch is a powerful tablet with a stunning Liquid Retina display, A12Z Bionic chip, and support for the Apple Pencil and Magic Keyboard.",
    price: 8999999,
    oldPrice: 9999999,
    rating: 4.8,
    imageUrl: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
    ],
    inStock: true,
    isFavorite: false,
    isNew: true,
    isOnSale: true,
    options: [
      { color: "Space Gray", variant: "128GB", stock: 2 },
      { color: "Silver", variant: "256GB", stock: 3 },
    ],
    specs: {
      Layar: "6.8 inci Dynamic AMOLED 2X, 120Hz",
      Prosesor: "Exynos 2100 / Snapdragon 888",
      "Kamera Belakang": "108MP + 10MP + 10MP + 12MP",
      "Kamera Depan": "40MP",
      Baterai: "5000mAh, Fast Charging 25W",
      OS: "Android 11, One UI 3.1",
    },
  },
  {
    id: 6,
    name: "GoPro HERO9 Black",
    description: "The GoPro HERO9 Black is a versatile action camera with 5K video, 20MP photos, and advanced stabilization features.",
    price: 9999999,
    oldPrice: 10999999,
    rating: 4.5,
    imageUrl: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
    ],
    inStock: false,
    isFavorite: true,
    isNew: false,
    isOnSale: false,
    options: [{ color: "Black", variant: "Default", stock: 0 }],
    specs: {
      Layar: "6.8 inci Dynamic AMOLED 2X, 120Hz",
      Prosesor: "Exynos 2100 / Snapdragon 888",
      "Kamera Belakang": "108MP + 10MP + 10MP + 12MP",
      "Kamera Depan": "40MP",
      Baterai: "5000mAh, Fast Charging 25W",
      OS: "Android 11, One UI 3.1",
    },
  },
  {
    id: 7,
    name: "GoPro HERO9 Black",
    description: "The GoPro HERO9 Black is a versatile action camera with 5K video, 20MP photos, and advanced stabilization features.",
    price: 9999999,
    oldPrice: 10999999,
    rating: 4.5,
    imageUrl: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
    ],
    inStock: false,
    isFavorite: true,
    isNew: false,
    isOnSale: false,
    options: [{ color: "Black", variant: "Default", stock: 0 }],
    specs: {
      Layar: "6.8 inci Dynamic AMOLED 2X, 120Hz",
      Prosesor: "Exynos 2100 / Snapdragon 888",
      "Kamera Belakang": "108MP + 10MP + 10MP + 12MP",
      "Kamera Depan": "40MP",
      Baterai: "5000mAh, Fast Charging 25W",
      OS: "Android 11, One UI 3.1",
    },
  },
  {
    id: 8,
    name: "Apple iPad Pro 11-inch",
    description: "The Apple iPad Pro 11-inch is a powerful tablet with a stunning Liquid Retina display, A12Z Bionic chip, and support for the Apple Pencil and Magic Keyboard.",
    price: 8999999,
    oldPrice: 9999999,
    rating: 4.8,
    imageUrl: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
    ],
    inStock: true,
    isFavorite: false,
    isNew: true,
    isOnSale: true,
    options: [
      { color: "Space Gray", variant: "128GB", stock: 2 },
      { color: "Silver", variant: "256GB", stock: 3 },
    ],
    specs: {
      Layar: "6.8 inci Dynamic AMOLED 2X, 120Hz",
      Prosesor: "Exynos 2100 / Snapdragon 888",
      "Kamera Belakang": "108MP + 10MP + 10MP + 12MP",
      "Kamera Depan": "40MP",
      Baterai: "5000mAh, Fast Charging 25W",
      OS: "Android 11, One UI 3.1",
    },
  },
  {
    id: 9,
    name: "Apple iPad Pro 11-inch",
    description: "The Apple iPad Pro 11-inch is a powerful tablet with a stunning Liquid Retina display, A12Z Bionic chip, and support for the Apple Pencil and Magic Keyboard.",
    price: 8999999,
    oldPrice: 9999999,
    rating: 4.8,
    imageUrl: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
    ],
    inStock: true,
    isFavorite: false,
    isNew: true,
    isOnSale: true,
    options: [
      { color: "Space Gray", variant: "128GB", stock: 2 },
      { color: "Silver", variant: "256GB", stock: 3 },
    ],
    specs: {
      Layar: "6.8 inci Dynamic AMOLED 2X, 120Hz",
      Prosesor: "Exynos 2100 / Snapdragon 888",
      "Kamera Belakang": "108MP + 10MP + 10MP + 12MP",
      "Kamera Depan": "40MP",
      Baterai: "5000mAh, Fast Charging 25W",
      OS: "Android 11, One UI 3.1",
    },
  },
  {
    id: 10,
    name: "Apple iPad Pro 11-inch",
    description: "The Apple iPad Pro 11-inch is a powerful tablet with a stunning Liquid Retina display, A12Z Bionic chip, and support for the Apple Pencil and Magic Keyboard.",
    price: 8999999,
    oldPrice: 9999999,
    rating: 4.8,
    imageUrl: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
    ],
    inStock: true,
    isFavorite: false,
    isNew: true,
    isOnSale: true,
    options: [
      { color: "Space Gray", variant: "128GB", stock: 2 },
      { color: "Silver", variant: "256GB", stock: 3 },
    ],
    specs: {
      Layar: "6.8 inci Dynamic AMOLED 2X, 120Hz",
      Prosesor: "Exynos 2100 / Snapdragon 888",
      "Kamera Belakang": "108MP + 10MP + 10MP + 12MP",
      "Kamera Depan": "40MP",
      Baterai: "5000mAh, Fast Charging 25W",
      OS: "Android 11, One UI 3.1",
    },
  },
  {
    id: 11,
    name: "Apple iPad Pro 11-inch",
    description: "The Apple iPad Pro 11-inch is a powerful tablet with a stunning Liquid Retina display, A12Z Bionic chip, and support for the Apple Pencil and Magic Keyboard.",
    price: 8999999,
    oldPrice: 9999999,
    rating: 4.8,
    imageUrl: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
    ],
    inStock: true,
    isFavorite: false,
    isNew: true,
    isOnSale: true,
    options: [
      { color: "Space Gray", variant: "128GB", stock: 2 },
      { color: "Silver", variant: "256GB", stock: 3 },
    ],
    specs: {
      Layar: "6.8 inci Dynamic AMOLED 2X, 120Hz",
      Prosesor: "Exynos 2100 / Snapdragon 888",
      "Kamera Belakang": "108MP + 10MP + 10MP + 12MP",
      "Kamera Depan": "40MP",
      Baterai: "5000mAh, Fast Charging 25W",
      OS: "Android 11, One UI 3.1",
    },
  },
  {
    id: 12,
    name: "Apple iPad Pro 11-inch",
    description: "The Apple iPad Pro 11-inch is a powerful tablet with a stunning Liquid Retina display, A12Z Bionic chip, and support for the Apple Pencil and Magic Keyboard.",
    price: 8999999,
    oldPrice: 9999999,
    rating: 4.8,
    imageUrl: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1470&auto=format&fit=crop",
    ],
    inStock: true,
    isFavorite: false,
    isNew: true,
    isOnSale: true,
    options: [
      { color: "Space Gray", variant: "128GB", stock: 2 },
      { color: "Silver", variant: "256GB", stock: 3 },
    ],
    specs: {
      Layar: "6.8 inci Dynamic AMOLED 2X, 120Hz",
      Prosesor: "Exynos 2100 / Snapdragon 888",
      "Kamera Belakang": "108MP + 10MP + 10MP + 12MP",
      "Kamera Depan": "40MP",
      Baterai: "5000mAh, Fast Charging 25W",
      OS: "Android 11, One UI 3.1",
    },
  },
];
