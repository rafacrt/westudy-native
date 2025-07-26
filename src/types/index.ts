// Tipos para navegação do React Navigation

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface University {
  name: string;
  acronym: string;
  city: string;
}

export interface Host {
  name: string;
  avatarUrl?: string;
}

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

// Tipos de parâmetros das telas
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Explore: undefined;
  RoomDetail: { listing: Listing };
};

export type TabParamList = {
  ExploreStack: undefined;
  Bookings: undefined;
  Profile: undefined;
};

export type ExploreStackParamList = {
  Explore: undefined;
  RoomDetail: { listing: Listing };
};