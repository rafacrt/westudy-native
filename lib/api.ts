// lib/api.ts - Cliente para as APIs REST
import { Config } from './config';
import { supabase } from './supabase';
import type { 
  User, 
  Listing, 
  Category, 
  Booking, 
  ListingFilters, 
  ApiResponse 
} from '../types';

class ApiClient {
  private baseURL = Config.API_URL;

  private async getAuthHeaders() {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;
    
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers,
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Erro na requisição');
      }

      return { data };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        error: error instanceof Error ? error.message : 'Erro desconhecido' 
      };
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ user: User; session: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string) {
    return this.request<{ id: string; email: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  async getMe() {
    return this.request<User>('/auth/me');
  }

  async updateProfile(data: Partial<User>) {
    return this.request<User>('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Listings endpoints
  async getCategories() {
    return this.request<Category[]>('/categories');
  }

  async getListings(
    page: number = 1,
    limit: number = 10,
    filters: ListingFilters = {}
  ) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>),
    });

    return this.request<Listing[]>(`/listings?${params}`);
  }

  async getListing(id: string) {
    return this.request<Listing>(`/listings/${id}`);
  }

  // Bookings endpoints
  async getBookings() {
    return this.request<Booking[]>('/bookings');
  }

  async createBooking(data: {
    listing_id: string;
    check_in_date: string;
    check_out_date: string;
    total_price: number;
    guests: number;
  }) {
    return this.request<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async unlockDoor(bookingId: string) {
    return this.request(`/bookings/${bookingId}/unlock`, {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient();