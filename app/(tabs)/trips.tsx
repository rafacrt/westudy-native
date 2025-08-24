// app/(tabs)/trips.tsx - Tela de Reservas/Viagens
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { Button } from '../../components/ui/Button';
import { useBookings } from '../../hooks/useBookings';
import { formatCurrency, formatDateRange } from '../../lib/utils';
import type { Booking } from '../../types';

export default function TripsScreen() {
  const router = useRouter();
  const { bookings, loading, error, refresh } = useBookings();

  const renderBookingCard = ({ item }: { item: Booking }) => (
    <Card style={styles.bookingCard}>
      <TouchableOpacity 
        onPress={() => router.push(`/room/${item.listing_id}`)}
        style={styles.bookingContent}
      >
        <View style={styles.bookingHeader}>
          {item.listing?.images?.[0] && (
            <Image
              source={{ uri: item.listing.images[0].url }}
              style={styles.bookingImage}
              contentFit="cover"
            />
          )}
          <View style={styles.bookingInfo}>
            <Text style={styles.bookingTitle} numberOfLines={2}>
              {item.listing?.title || 'Reserva'}
            </Text>
            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={16} color={Colors.light.textSecondary} />
              <Text style={styles.dateText}>
                {formatDateRange(item.check_in_date, item.check_out_date)}
              </Text>
            </View>
            <View style={styles.statusRow}>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(item.status) }
              ]}>
                <Text style={styles.statusText}>
                  {getStatusText(item.status)}
                </Text>
              </View>
              <Text style={styles.priceText}>
                {formatCurrency(item.total_price)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="calendar-outline" size={64} color={Colors.light.textMuted} />
      <Text style={styles.emptyTitle}>Nenhuma reserva ainda</Text>
      <Text style={styles.emptySubtitle}>
        Quando você fizer uma reserva, ela aparecerá aqui
      </Text>
      <Button
        title="Explorar Quartos"
        onPress={() => router.push('/(tabs)/explore')}
        style={styles.exploreButton}
      />
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Minhas Viagens</Text>
        </View>
        <View style={styles.centerContent}>
          <LoadingSpinner message="Carregando reservas..." />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Minhas Viagens</Text>
        </View>
        <View style={styles.centerContent}>
          <ErrorMessage message={error} onRetry={refresh} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Viagens</Text>
      </View>
      
      <FlatList
        data={bookings}
        renderItem={renderBookingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={loading}
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return Colors.light.success;
    case 'pending': return Colors.light.warning;
    case 'cancelled': return Colors.light.error;
    default: return Colors.light.textMuted;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed': return 'Confirmada';
    case 'pending': return 'Pendente';
    case 'cancelled': return 'Cancelada';
    default: return 'Desconhecido';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.borderSecondary,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 20,
  },
  bookingCard: {
    marginBottom: 16,
    padding: 0,
  },
  bookingContent: {
    padding: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
  },
  bookingImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 6,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginLeft: 4,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.light.background,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  exploreButton: {
    minWidth: 200,
  },
});