// app/(tabs)/wishlists.tsx - Tela de Favoritos
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { ListingCard } from '../../components/ui/ListingCard';
import { Button } from '../../components/ui/Button';
import type { Listing } from '../../types';

export default function WishlistsScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Listing[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Aqui você implementaria a lógica para buscar favoritos
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleRemoveFavorite = (listingId: string) => {
    setFavorites(prev => prev.filter(item => item.id !== listingId));
  };

  const renderFavoriteCard = ({ item, index }: { item: Listing; index: number }) => (
    <View style={[
      styles.cardContainer,
      index % 2 === 0 ? styles.cardLeft : styles.cardRight,
    ]}>
      <ListingCard
        listing={item}
        onPress={() => router.push(`/room/${item.id}`)}
        onFavoritePress={() => handleRemoveFavorite(item.id)}
        isFavorite={true}
      />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="heart-outline" size={64} color={Colors.light.textMuted} />
      <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
      <Text style={styles.emptySubtitle}>
        Toque no coração dos quartos que você gosta para salvá-los aqui
      </Text>
      <Button
        title="Explorar Quartos"
        onPress={() => router.push('/(tabs)/explore')}
        style={styles.exploreButton}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoritos</Text>
        <Text style={styles.subtitle}>
          {favorites.length} {favorites.length === 1 ? 'quarto salvo' : 'quartos salvos'}
        </Text>
      </View>
      
      <FlatList
        data={favorites}
        renderItem={renderFavoriteCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={favorites.length > 0 ? styles.row : undefined}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors.light.primary]}
            tintColor={Colors.light.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}