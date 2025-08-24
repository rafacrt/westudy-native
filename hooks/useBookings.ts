// hooks/useBookings.ts - Hook para gerenciar reservas
import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';
import type { Booking } from '../types';

interface UseBookingsReturn {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createBooking: (data: {
    listing_id: string;
    check_in_date: string;
    check_out_date: string;
    total_price: number;
    guests: number;
  }) => Promise<void>;
}

export function useBookings(): UseBookingsReturn {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: apiError } = await apiClient.getBookings();

      if (apiError) {
        throw new Error(apiError);
      }

      if (data) {
        setBookings(data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar reservas';
      setError(errorMessage);
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    await loadBookings();
  };

  const createBooking = async (data: {
    listing_id: string;
    check_in_date: string;
    check_out_date: string;
    total_price: number;
    guests: number;
  }) => {
    try {
      setError(null);

      const { data: newBooking, error: apiError } = await apiClient.createBooking(data);

      if (apiError) {
        throw new Error(apiError);
      }

      if (newBooking) {
        setBookings(prev => [newBooking, ...prev]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar reserva';
      setError(errorMessage);
      console.error('Error creating booking:', err);
      throw err;
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    refresh,
    createBooking,
  };
}