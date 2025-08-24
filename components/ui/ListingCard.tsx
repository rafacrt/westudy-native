// components/ListingCard.tsx
import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { formatCurrency } from '../lib/utils';
import type { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
  onPress: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = (screenWidth - 48) / 2; // 2 colunas com padding

export function ListingCard({ 
  listing, 
  onPress, 
  onFavoritePress,
  isFavorite = false 
}: ListingCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: listing.images[0]?.url }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        {onFavoritePress && (
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={onFavoritePress}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? Colors.light.error : Colors.light.background}
            />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.locationRow}>
          <Ionicons 
            name="location-outline" 
            size={12} 
            color={Colors.light.textSecondary}
          />
          <Text style={styles.location} numberOfLines={1}>
            {listing.university.city}
          </Text>
        </View>
        
        <Text style={styles.title} numberOfLines={2}>
          {listing.title}
        </Text>
        
        <View style={styles.ratingRow}>
          <Ionicons 
            name="star" 
            size={12} 
            color={Colors.light.warning}
          />
          <Text style={styles.rating}>
            {listing.rating.toFixed(1)}
          </Text>
          <Text style={styles.reviews}>
            ({listing.reviews})
          </Text>
        </View>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {formatCurrency(listing.pricePerNight)}
          </Text>
          <Text style={styles.priceLabel}>/mês</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    shadowColor: Colors.light.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginLeft: 4,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.text,
    marginLeft: 2,
  },
  reviews: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginLeft: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginLeft: 2,
  },
});