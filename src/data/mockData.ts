// Mock data para demonstração do app

export const roomCategories = [
  { id: 'prox-campus', label: 'Perto do Campus', icon: 'school-outline' },
  { id: 'republica', label: 'Repúblicas', icon: 'home-outline' },
  { id: 'kitnet', label: 'Kitnets', icon: 'business-outline' },
  { id: 'alto-padrao', label: 'Alto Padrão', icon: 'diamond-outline' },
  { id: 'economico', label: 'Econômicos', icon: 'wallet-outline' },
  { id: 'praia', label: 'Praia', icon: 'water-outline' },
  { id: 'campo', label: 'Campo', icon: 'leaf-outline' },
  { id: 'montanha', label: 'Montanhas', icon: 'triangle-outline' },
];

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export const commonAmenities: Amenity[] = [
  { id: 'wifi', name: 'Wi-Fi', icon: 'wifi-outline' },
  { id: 'ac', name: 'Ar Condicionado', icon: 'snow-outline' },
  { id: 'kitchen', name: 'Cozinha', icon: 'restaurant-outline' },
  { id: 'washing', name: 'Máquina de Lavar', icon: 'water-outline' },
  { id: 'parking', name: 'Estacionamento', icon: 'car-outline' },
  { id: 'gym', name: 'Academia', icon: 'fitness-outline' },
  { id: 'pool', name: 'Piscina', icon: 'water-outline' },
  { id: 'security', name: 'Segurança 24h', icon: 'shield-outline' },
  { id: 'study', name: 'Área de Estudos', icon: 'library-outline' },
  { id: 'furnished', name: 'Mobiliado', icon: 'bed-outline' },
];

export interface University {
  name: string;
  acronym: string;
  city: string;
}

export const universities: University[] = [
  { name: 'Universidade de São Paulo', acronym: 'USP', city: 'São Paulo' },
  { name: 'Universidade Federal de Minas Gerais', acronym: 'UFMG', city: 'Belo Horizonte' },
  { name: 'Universidade Federal de Santa Catarina', acronym: 'UFSC', city: 'Florianópolis' },
  { name: 'Universidade Estadual de Campinas', acronym: 'UNICAMP', city: 'Campinas' },
  { name: 'Universidade Federal do Rio de Janeiro', acronym: 'UFRJ', city: 'Rio de Janeiro' },
];

export interface Host {
  name: string;
  avatarUrl?: string;
}

export const mockHosts: Host[] = [
  { name: 'Ana Silva', avatarUrl: 'https://picsum.photos/seed/host1/100/100' },
  { name: 'Carlos Santos', avatarUrl: 'https://picsum.photos/seed/host2/100/100' },
  { name: 'Maria Oliveira', avatarUrl: 'https://picsum.photos/seed/host3/100/100' },
  { name: 'João Pereira', avatarUrl: 'https://picsum.photos/seed/host4/100/100' },
];

export interface Listing {
  id: string;
  title: string;
  description: string;
  images: { url: string; alt?: string }[];
  pricePerNight: number;
  rating: number;
  reviews: number;
  university: University;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: Amenity[];
  host: Host;
  address: string;
  isAvailable: boolean;
  category: string;
}

export const mockListings: Listing[] = [
  {
    id: 'quarto1',
    title: 'Quarto Aconchegante Próximo à USP',
    description: 'Quarto individual mobiliado, ideal para estudantes da USP. Ambiente tranquilo e seguro, com área de estudos e internet de alta velocidade. Contas inclusas.',
    images: [
      { url: 'https://picsum.photos/seed/quarto1_img1/800/600', alt: 'Quarto principal' },
      { url: 'https://picsum.photos/seed/quarto1_img2/800/600', alt: 'Área de estudos' },
      { url: 'https://picsum.photos/seed/quarto1_img3/800/600', alt: 'Banheiro' },
    ],
    pricePerNight: 1200,
    rating: 4.8,
    reviews: 45,
    university: universities[0], // USP
    guests: 1,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    amenities: [
      commonAmenities[0], // Wi-Fi
      commonAmenities[2], // Cozinha
      commonAmenities[8], // Área de Estudos
      commonAmenities[9], // Mobiliado
    ],
    host: mockHosts[0],
    address: 'Rua da Consolação, 1500, Consolação, São Paulo - SP',
    isAvailable: true,
    category: 'prox-campus',
  },
  {
    id: 'quarto2',
    title: 'Suíte Moderna UFMG',
    description: 'Suíte ampla e moderna em prédio novo, próximo à UFMG. Com banheiro privativo, ar condicionado e varanda. Ideal para estudantes que buscam conforto.',
    images: [
      { url: 'https://picsum.photos/seed/quarto2_img1/800/600', alt: 'Suíte moderna' },
      { url: 'https://picsum.photos/seed/quarto2_img2/800/600', alt: 'Banheiro privativo' },
    ],
    pricePerNight: 1100,
    rating: 4.6,
    reviews: 32,
    university: universities[1], // UFMG
    guests: 1,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    amenities: [
      commonAmenities[0], // Wi-Fi
      commonAmenities[1], // Ar Condicionado
      commonAmenities[9], // Mobiliado
      commonAmenities[7], // Segurança 24h
    ],
    host: mockHosts[1],
    address: 'Av. Antônio Carlos, 6627, Pampulha, Belo Horizonte - MG',
    isAvailable: true,
    category: 'alto-padrao',
  },
  {
    id: 'quarto3',
    title: 'Quarto em República UFSC',
    description: 'Quarto em república animada, próximo à UFSC. Ambiente estudantil vibrante, com cozinha compartilhada e área de convivência. Perfeito para fazer amizades.',
    images: [
      { url: 'https://picsum.photos/seed/quarto3_img1/800/600', alt: 'Quarto em república' },
      { url: 'https://picsum.photos/seed/quarto3_img2/800/600', alt: 'Área comum' },
    ],
    pricePerNight: 850,
    rating: 4.4,
    reviews: 28,
    university: universities[2], // UFSC
    guests: 1,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    amenities: [
      commonAmenities[0], // Wi-Fi
      commonAmenities[2], // Cozinha
      commonAmenities[3], // Máquina de Lavar
      commonAmenities[9], // Mobiliado
    ],
    host: mockHosts[2],
    address: 'Rua Lauro Linhares, 1000, Trindade, Florianópolis - SC',
    isAvailable: true,
    category: 'republica',
  },
  {
    id: 'quarto4',
    title: 'Kitnet Econômica UNICAMP',
    description: 'Kitnet compacta e funcional, ideal para estudantes da UNICAMP que buscam independência. Inclui kitchenette, banheiro privativo e área de estudos.',
    images: [
      { url: 'https://picsum.photos/seed/quarto4_img1/800/600', alt: 'Kitnet compacta' },
    ],
    pricePerNight: 750,
    rating: 4.2,
    reviews: 15,
    university: universities[3], // UNICAMP
    guests: 1,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    amenities: [
      commonAmenities[0], // Wi-Fi
      commonAmenities[2], // Cozinha
      commonAmenities[9], // Mobiliado
    ],
    host: mockHosts[3],
    address: 'Av. Albert Einstein, 951, Cidade Universitária, Campinas - SP',
    isAvailable: true,
    category: 'kitnet',
  },
  {
    id: 'quarto5',
    title: 'Quarto de Luxo UFRJ',
    description: 'Quarto de alto padrão próximo à UFRJ, em condomínio de luxo. Com academia, piscina, segurança 24h e acabamentos premium. Para estudantes exigentes.',
    images: [
      { url: 'https://picsum.photos/seed/quarto5_img1/800/600', alt: 'Quarto de luxo' },
      { url: 'https://picsum.photos/seed/quarto5_img2/800/600', alt: 'Piscina do condomínio' },
    ],
    pricePerNight: 1800,
    rating: 4.9,
    reviews: 52,
    university: universities[4], // UFRJ
    guests: 1,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    amenities: [
      commonAmenities[0], // Wi-Fi
      commonAmenities[1], // Ar Condicionado
      commonAmenities[5], // Academia
      commonAmenities[6], // Piscina
      commonAmenities[7], // Segurança 24h
      commonAmenities[9], // Mobiliado
    ],
    host: mockHosts[0],
    address: 'Av. Pasteur, 250, Urca, Rio de Janeiro - RJ',
    isAvailable: true,
    category: 'alto-padrao',
  },
  {
    id: 'quarto6',
    title: 'Quarto Econômico USP',
    description: 'Opção econômica para estudantes da USP. Quarto simples mas confortável, em casa compartilhada com outros estudantes. Ótimo custo-benefício.',
    images: [
      { url: 'https://picsum.photos/seed/quarto6_img1/800/600', alt: 'Quarto econômico' },
    ],
    pricePerNight: 680,
    rating: 4.1,
    reviews: 18,
    university: universities[0], // USP
    guests: 1,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    amenities: [
      commonAmenities[0], // Wi-Fi
      commonAmenities[2], // Cozinha
      commonAmenities[9], // Mobiliado
    ],
    host: mockHosts[1],
    address: 'Rua Dr. Vila Nova, 228, Vila Buarque, São Paulo - SP',
    isAvailable: true,
    category: 'economico',
  },
];