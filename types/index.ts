// types/index.ts - Definições de tipos para o app nativo
// Baseado nos tipos do projeto web
import { ComponentType } from 'react';  

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  is_admin: boolean;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  expires_in: number;
  token_type: string;
  user: User;
}

export interface UniversityArea {
  id: string;
  name: string;
  acronym: string;
  city: string;
  state: string;
  icon: string;
}

export interface Category {
  id: string;
  label: string;
  description?: string;
  icon: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface Image {
  id: string;
  url: string;
  alt?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  images: Image[];
  pricePerNight: number;
  address: string;
  lat: number;
  lng: number;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: Amenity[];
  rating: number;
  reviews: number;
  host: User;
  university: UniversityArea;
  isAvailable: boolean;
  type: string;
  category: string;
  cancellationPolicy: string;
  houseRules: string;
  safetyAndProperty: string;
  created_at?: string;
  updated_at?: string;
}

export interface Booking {
  id: string;
  listing_id: string;
  user_id: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  listing?: Listing;
  created_at: string;
  updated_at: string;
}

export interface ListingFilters {
  searchTerm?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  guests?: number;
  university?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Tipos para navegação
export type RootStackParamList = {
  index: undefined;
  '(tabs)': undefined;
  'auth/login': undefined;
  'auth/register': undefined;
  'room/[id]': { id: string };
};

export type TabParamList = {
  index: undefined;
  explore: undefined;
  trips: undefined;
  wishlists: undefined;
  profile: undefined;
};

// Tipos para Context
export interface AuthContextType {
  user: User | null;
  session: AuthSession | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

// Tipos para configuração
export interface AppConfig {
  API_URL: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}