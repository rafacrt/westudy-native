// hooks/useListings.ts - Hook para gerenciar listings
import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api';
import type { Listing, ListingFilters } from '../types';

interface UseListingsReturn {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  search: (filters: ListingFilters) => Promise<void>;
}

export function useListings(
  initialFilters: ListingFilters = {},
  itemsPerPage: number = 10
): UseListingsReturn {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<ListingFilters>(initialFilters);

  const loadListings = useCallback(async (
    pageNum: number,
    filters: ListingFilters,
    append: boolean = false
  ) => {
    try {
      if (!append) {
        setLoading(true);
      }
      setError(null);

      const { data, error: apiError } = await apiClient.getListings(
        pageNum,
        itemsPerPage,
        filters
      );

      if (apiError) {
        throw new Error(apiError);
      }

      if (data) {
        setListings(prev => append ? [...prev, ...data] : data);
        setHasMore(data.length === itemsPerPage);
        setPage(pageNum + 1);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar quartos';
      setError(errorMessage);
      console.error('Error loading listings:', err);
    } finally {
      setLoading(false);
    }
  }, [itemsPerPage]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    await loadListings(page, currentFilters, true);
  }, [loading, hasMore, page, currentFilters, loadListings]);

  const refresh = useCallback(async () => {
    setPage(1);
    setHasMore(true);
    await loadListings(1, currentFilters, false);
  }, [currentFilters, loadListings]);

  const search = useCallback(async (filters: ListingFilters) => {
    setCurrentFilters(filters);
    setPage(1);
    setHasMore(true);
    await loadListings(1, filters, false);
  }, [loadListings]);

  useEffect(() => {
    loadListings(1, initialFilters, false);
  }, []);

  return {
    listings,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    search,
  };
}