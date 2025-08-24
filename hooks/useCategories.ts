// hooks/useCategories.ts - Hook para gerenciar categorias
import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';
import type { Category } from '../types';

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: apiError } = await apiClient.getCategories();

        if (apiError) {
          throw new Error(apiError);
        }

        if (data) {
          setCategories(data);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar categorias';
        setError(errorMessage);
        console.error('Error loading categories:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
  };
}