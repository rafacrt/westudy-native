// app/(tabs)/explore.tsx - Tela principal de exploração
import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { ExploreSearchBar } from '../../components/ui/ExploreSearchBar';
import { CategoryMenu } from '../../components/ui/CategoryMenu';
import { ListingCard } from '../../components/ui/ListingCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { useListings } from '../../hooks/useListings';
import { useCategories } from '../../hooks/useCategories';
import type { Listing, ListingFilters } from '../../types';

const ITEMS_PER_PAGE = 10;

export default function ExploreScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Hooks para dados
  const { categories, loading: categoriesLoading } = useCategories();
  const {
    listings,
    loading: listingsLoading,
    error,
    hasMore,
    loadMore,
    refresh,
    search,
  } = useListings({}, ITEMS_PER_PAGE);

  // Recarregar dados quando a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  // Handlers
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    const filters: ListingFilters = {
      searchTerm: term,
      category: selectedCategory || undefined,
    };
    search(filters);
  }, [selectedCategory, search]);

  const handleCategorySelect = useCallback((categoryId: string | null) => {
    setSelectedCategory(categoryId);
    const filters: ListingFilters = {
      searchTerm: searchTerm || undefined,
      category: categoryId || undefined,
    };
    search(filters);
  }, [searchTerm, search]);

  const handleListingPress = useCallback((listing: Listing) => {
    router.push(`/room/${listing.id}`);
  }, [router]);

  const handleFavoritePress = useCallback((listingId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(listingId)) {
        newFavorites.delete(listingId);
      } else {
        newFavorites.add(listingId);
      }
      return newFavorites;
    });
    
    // Aqui você implementaria a lógica real de favoritos
    // Por exemplo, salvando no backend ou AsyncStorage
    Alert.alert(
      'Favorito',
      favorites.has(listingId) ? 'Removido dos favoritos' : 'Adicionado aos favoritos'
    );
  }, [favorites]);

  const handleFilterPress = useCallback(() => {
    // Implementar modal de filtros avançados
    Alert.alert('Filtros', 'Modal de filtros em desenvolvimento');
  }, []);

  const handleEndReached = useCallback(() => {
    if (!listingsLoading && hasMore) {
      loadMore();
    }
  }, [listingsLoading, hasMore, loadMore]);

  const renderListingCard = useCallback(({ item, index }: { item: Listing; index: number }) => (
    <View style={[
      styles.cardContainer,
      index % 2 === 0 ? styles.cardLeft : styles.cardRight,
    ]}>
      <ListingCard
        listing={item}
        onPress={() => handleListingPress(item)}
        onFavoritePress={() => handleFavoritePress(item.id)}
        isFavorite={favorites.has(item.id)}
      />
    </View>
  ), [handleListingPress, handleFavoritePress, favorites]);

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>Nenhum quarto encontrado</Text>
      <Text style={styles.emptySubtitle}>
        Tente ajustar seus filtros ou busca
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (!listingsLoading || listings.length === 0) return null;
    
    return (
      <View style={styles.footerLoader}>
        <LoadingSpinner size="small" />
      </View>
    );
  };

  const renderHeader = () => (
    <>
      <ExploreSearchBar
        onSearch={handleSearch}
        onFilterPress={handleFilterPress}
        placeholder="Para onde você vai?"
        initialValue={searchTerm}
      />
      {!categoriesLoading && (
        <CategoryMenu
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      )}
    </>
  );

  // Estados de carregamento e erro
  if (listingsLoading && listings.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <View style={styles.centerContent}>
          <LoadingSpinner message="Carregando quartos..." />
        </View>
      </SafeAreaView>
    );
  }

  if (error && listings.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <View style={styles.centerContent}>
          <ErrorMessage 
            message={error} 
            onRetry={refresh}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listings}
        renderItem={renderListingCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={renderFooter}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={listingsLoading && listings.length > 0}
            onRefresh={refresh}
            colors={[Colors.light.primary]}
            tintColor={Colors.light.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  cardContainer: {
    flex: 1,
  },
  cardLeft: {
    marginRight: 8,
  },
  cardRight: {
    marginLeft: 8,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});