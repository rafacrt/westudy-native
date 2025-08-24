// hooks/useListing.ts - Hook para um listing específico
import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';
import type { Listing } from '../types';

interface UseListingReturn {
  listing: Listing | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useListing(id: string): UseListingReturn {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadListing = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: apiError } = await apiClient.getListing(id);

      if (apiError) {
        throw new Error(apiError);
      }

      if (data) {
        setListing(data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar quarto';
      setError(errorMessage);
      console.error('Error loading listing:', err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    await loadListing();
  };

  useEffect(() => {
    if (id) {
      loadListing();
    }
  }, [id]);

  return {
    listing,
    loading,
    error,
    refresh,
  };
}
