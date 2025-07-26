import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ExploreStackParamList } from '../types';

const { width } = Dimensions.get('window');

type RoomDetailScreenRouteProp = RouteProp<ExploreStackParamList, 'RoomDetail'>;
type RoomDetailScreenNavigationProp = StackNavigationProp<
  ExploreStackParamList,
  'RoomDetail'
>;

export default function RoomDetailScreen() {
  const route = useRoute<RoomDetailScreenRouteProp>();
  const navigation = useNavigation<RoomDetailScreenNavigationProp>();
  const { listing } = route.params;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBooking, setIsBooking] = useState(false);

  const handleBookRoom = async () => {
    if (!listing.isAvailable) {
      Alert.alert('Indisponível', 'Este quarto não está disponível no momento.');
      return;
    }

    setIsBooking(true);
    
    try {
      // Simula chamada da API de reserva
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Reserva Solicitada!',
        `Sua solicitação para "${listing.title}" foi enviada. Você receberá uma confirmação em breve.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar a reserva. Tente novamente.');
    } finally {
      setIsBooking(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Galeria de imagens */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: listing.images[currentImageIndex]?.url }} 
            style={styles.mainImage}
          />
          
          {listing.images.length > 1 && (
            <>
              <TouchableOpacity style={styles.prevButton} onPress={prevImage}>
                <Ionicons name="chevron-back" size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.nextButton} onPress={nextImage}>
                <Ionicons name="chevron-forward" size={24} color="#fff" />
              </TouchableOpacity>
              
              <View style={styles.imageIndicators}>
                {listing.images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.indicator,
                      index === currentImageIndex && styles.activeIndicator
                    ]}
                  />
                ))}
              </View>
            </>
          )}
        </View>

        {/* Informações principais */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{listing.title}</Text>
            
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.locationText}>
                {listing.university.acronym} - {listing.university.city}, Brasil
              </Text>
            </View>
            
            {listing.rating > 0 && (
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>
                  {listing.rating.toFixed(1)} ({listing.reviews} avaliações)
                </Text>
              </View>
            )}
          </View>

          {/* Informações do quarto */}
          <View style={styles.roomInfo}>
            <View style={styles.infoRow}>
              <Ionicons name="people-outline" size={20} color="#416ed3" />
              <Text style={styles.infoText}>{listing.guests} hóspede(s)</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="bed-outline" size={20} color="#416ed3" />
              <Text style={styles.infoText}>
                {listing.bedrooms} quarto(s) · {listing.beds} cama(s)
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="water-outline" size={20} color="#416ed3" />
              <Text style={styles.infoText}>{listing.baths} banheiro(s)</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="school-outline" size={20} color="#416ed3" />
              <Text style={styles.infoText}>Próximo à {listing.university.acronym}</Text>
            </View>
          </View>

          {/* Descrição */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.description}>{listing.description}</Text>
          </View>

          {/* Comodidades */}
          {listing.amenities && listing.amenities.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>O que este lugar oferece</Text>
              <View style={styles.amenitiesContainer}>
                {listing.amenities.map((amenity) => (
                  <View key={amenity.id} style={styles.amenityItem}>
                    <Ionicons name={amenity.icon as any} size={20} color="#416ed3" />
                    <Text style={styles.amenityText}>{amenity.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Informações do anfitrião */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Anfitrião</Text>
            <View style={styles.hostInfo}>
              <Image 
                source={{ uri: listing.host.avatarUrl || 'https://picsum.photos/seed/host/50/50' }}
                style={styles.hostAvatar}
              />
              <Text style={styles.hostName}>{listing.host.name}</Text>
            </View>
          </View>

          {/* Localização */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Localização</Text>
            <Text style={styles.addressText}>{listing.address}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Botão de reserva fixo */}
      <View style={styles.bookingBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            R$ {listing.pricePerNight.toLocaleString('pt-BR')}
          </Text>
          <Text style={styles.priceUnit}>/mês</Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.bookButton,
            (!listing.isAvailable || isBooking) && styles.bookButtonDisabled
          ]}
          onPress={handleBookRoom}
          disabled={!listing.isAvailable || isBooking}
        >
          {isBooking ? (
            <Text style={styles.bookButtonText}>Reservando...</Text>
          ) : listing.isAvailable ? (
            <Text style={styles.bookButtonText}>Conferir disponibilidade</Text>
          ) : (
            <Text style={styles.bookButtonText}>Indisponível</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  prevButton: {
    position: 'absolute',
    left: 16,
    top: '50%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  roomInfo: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 12,
  },
  amenityText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addressText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  bookingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  priceUnit: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: '#416ed3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 16,
  },
  bookButtonDisabled: {
    backgroundColor: '#ccc',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});