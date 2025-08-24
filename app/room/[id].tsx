// app/room/[id].tsx - Tela de detalhes do quarto
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { ImageCarousel } from '../../components/ui/ImageCarousel';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { Card } from '../../components/ui/Card';
import { useListing } from '../../hooks/useListing';
import { formatCurrency } from '../../lib/utils';

export default function RoomDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const { listing, loading, error, refresh } = useListing(id!);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
    Alert.alert(
      'Favorito',
      isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos'
    );
  }, [isFavorite]);

  const handleShare = useCallback(async () => {
    if (!listing) return;
    
    try {
      await Share.share({
        message: `Confira este quarto incrível: ${listing.title}`,
        url: `westudy://room/${listing.id}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, [listing]);

  const handleBooking = useCallback(() => {
    if (!listing) return;
    
    // Aqui você implementaria o fluxo de reserva
    Alert.alert(
      'Reservar',
      `Deseja reservar "${listing.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Reservar', 
          onPress: () => {
            // Navegar para tela de booking ou modal
            Alert.alert('Sucesso', 'Reserva criada com sucesso!');
          }
        },
      ]
    );
  }, [listing]);

  const handleContactHost = useCallback(() => {
    if (!listing) return;
    
    Alert.alert(
      'Contato',
      `Entrar em contato com ${listing.host.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Contatar', onPress: () => {
          // Implementar chat ou contato
          Alert.alert('Chat', 'Funcionalidade de chat em desenvolvimento');
        }},
      ]
    );
  }, [listing]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.centerContent}>
          <LoadingSpinner message="Carregando detalhes..." />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !listing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.centerContent}>
          <ErrorMessage 
            message={error || 'Quarto não encontrado'} 
            onRetry={refresh}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header com botões */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
            <Ionicons name="share-outline" size={24} color={Colors.light.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFavorite} style={styles.headerButton}>
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? Colors.light.error : Colors.light.text} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Carrossel de Imagens */}
        <ImageCarousel images={listing.images} height={300} />

        {/* Informações Principais */}
        <View style={styles.mainInfo}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{listing.title}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={16} color={Colors.light.textSecondary} />
                <Text style={styles.location}>{listing.address}</Text>
              </View>
            </View>
          </View>

          {/* Rating e Reviews */}
          <View style={styles.ratingContainer}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color={Colors.light.warning} />
              <Text style={styles.rating}>{listing.rating.toFixed(1)}</Text>
              <Text style={styles.reviews}>({listing.reviews} avaliações)</Text>
            </View>
            <Text style={styles.university}>{listing.university.name}</Text>
          </View>
        </View>

        {/* Host Info */}
        <Card style={styles.hostCard}>
          <View style={styles.hostInfo}>
            <View style={styles.hostAvatar}>
              <Ionicons name="person" size={24} color={Colors.light.primary} />
            </View>
            <View style={styles.hostDetails}>
              <Text style={styles.hostName}>Anunciado por {listing.host.name}</Text>
              <Text style={styles.hostMeta}>Anfitrião desde 2023</Text>
            </View>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={handleContactHost}
            >
              <Ionicons name="chatbubble-outline" size={20} color={Colors.light.primary} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Detalhes do Quarto */}
        <Card style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Detalhes do Quarto</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Ionicons name="people-outline" size={20} color={Colors.light.textSecondary} />
              <Text style={styles.detailText}>{listing.guests} hóspede(s)</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="bed-outline" size={20} color={Colors.light.textSecondary} />
              <Text style={styles.detailText}>{listing.beds} cama(s)</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="business-outline" size={20} color={Colors.light.textSecondary} />
              <Text style={styles.detailText}>{listing.bedrooms} quarto(s)</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="water-outline" size={20} color={Colors.light.textSecondary} />
              <Text style={styles.detailText}>{listing.baths} banheiro(s)</Text>
            </View>
          </View>
        </Card>

        {/* Descrição */}
        <Card style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Sobre este lugar</Text>
          <Text style={styles.description}>{listing.description}</Text>
        </Card>

        {/* Comodidades */}
        {listing.amenities.length > 0 && (
          <Card style={styles.amenitiesCard}>
            <Text style={styles.sectionTitle}>Comodidades</Text>
            <View style={styles.amenitiesGrid}>
              {listing.amenities.map((amenity) => (
                <View key={amenity.id} style={styles.amenityItem}>
                  <Ionicons name="checkmark-circle" size={20} color={Colors.light.success} />
                  <Text style={styles.amenityText}>{amenity.name}</Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {/* Regras da Casa */}
        <Card style={styles.rulesCard}>
          <Text style={styles.sectionTitle}>Regras da casa</Text>
          <Text style={styles.rulesText}>{listing.houseRules}</Text>
        </Card>

        {/* Espaçamento para o footer fixo */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Footer fixo com preço e botão de reserva */}
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatCurrency(listing.pricePerNight)}</Text>
          <Text style={styles.priceLabel}>/mês</Text>
        </View>
        <Button
          title="Reservar"
          onPress={handleBooking}
          style={styles.bookButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginTop: 64, // Altura do header
  },
  mainInfo: {
    padding: 20,
  },
  titleRow: {
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 8,
    lineHeight: 30,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginLeft: 4,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginLeft: 4,
  },
  reviews: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginLeft: 4,
  },
  university: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  hostCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.primaryMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  hostDetails: {
    flex: 1,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 2,
  },
  hostMeta: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  contactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.primaryMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 12,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
  },
  detailText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginLeft: 8,
  },
  descriptionCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  amenitiesCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  amenitiesGrid: {
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amenityText: {
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 12,
  },
  rulesCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  rulesText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.textSecondary,
  },
  bottomSpacing: {
    height: 100,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.light.background,
    borderTopWidth: 1,
    borderTopColor: Colors.light.borderSecondary,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.light.text,
  },
  priceLabel: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginLeft: 4,
  },
  bookButton: {
    paddingHorizontal: 32,
  },
});