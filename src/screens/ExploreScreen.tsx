import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { mockListings, roomCategories } from '../data/mockData';
import type { ExploreStackParamList, Listing } from '../types/navigation';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 32; // Full width com padding

interface Category {
  id: string;
  label: string;
  icon: string;
}

type ExploreScreenNavigationProp = StackNavigationProp<
  ExploreStackParamList,
  'Explore'
>;

export default function ExploreScreen() {
  const navigation = useNavigation<ExploreScreenNavigationProp>();
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Simula carregamento da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setListings(mockListings);
      setCategories(roomCategories.slice(0, 8)); // Primeiras 8 categorias
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         listing.university.city.toLowerCase().includes(searchText.toLowerCase()) ||
                         listing.university.name.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesCategory = !selectedCategory || listing.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const renderListingCard = ({ item }: { item: Listing }) => (
    <TouchableOpacity
      style={styles.listingCard}
      onPress={() => navigation.navigate('RoomDetail', { listing: item })}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.images[0]?.url }} style={styles.listingImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.listingInfo}>
        <View style={styles.locationRatingRow}>
          <Text style={styles.locationText} numberOfLines={1}>
            {item.university.city}, {item.university.acronym}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#000" />
            <Text style={styles.ratingText}>
              {item.rating.toFixed(1)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.distanceText}>
          5 km do campus
        </Text>
        
        <Text style={styles.dateText}>
          20 - 25 de out
        </Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>
            R$ {item.pricePerNight.toLocaleString('pt-BR')}
          </Text>
          <Text style={styles.periodText}> /mês</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryChip = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.id && styles.categoryChipSelected
      ]}
      onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && styles.categoryTextSelected
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF385C" />
          <Text style={styles.loadingText}>Carregando acomodações...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header com busca estilo Airbnb */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.searchBar}>
          <View style={styles.searchContent}>
            <Ionicons name="search" size={16} color="#717171" />
            <View style={styles.searchTextContainer}>
              <Text style={styles.searchPlaceholder}>Onde você quer morar hoje</Text>
              <Text style={styles.searchSubtitle}>
                Qualquer lugar • Qualquer data • Hóspedes
              </Text>
            </View>
          </View>
          <View style={styles.filterButton}>
            <Ionicons name="options-outline" size={16} color="#717171" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Categorias horizontais */}
      <View style={styles.categoriesSection}>
        <FlatList
          data={categories}
          renderItem={renderCategoryChip}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Lista de acomodações */}
      <FlatList
        data={filteredListings}
        renderItem={renderListingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listingsContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma acomodação encontrada</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#717171',
    fontWeight: '400',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  searchContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  searchPlaceholder: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 2,
  },
  searchSubtitle: {
    fontSize: 12,
    color: '#717171',
  },
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  categoriesSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#fff',
  },
  categoryChipSelected: {
    backgroundColor: '#222222',
    borderColor: '#222222',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#717171',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  listingsContainer: {
    paddingHorizontal: 16,
  },
  listingCard: {
    width: ITEM_WIDTH,
    marginVertical: 12,
  },
  imageContainer: {
    position: 'relative',
  },
  listingImage: {
    width: '100%',
    height: 320,
    borderRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listingInfo: {
    paddingTop: 12,
  },
  locationRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222222',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#222222',
    marginLeft: 4,
    fontWeight: '500',
  },
  distanceText: {
    fontSize: 14,
    color: '#717171',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#717171',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
  periodText: {
    fontSize: 14,
    color: '#717171',
    fontWeight: '400',
  },
  separator: {
    height: 1,
    backgroundColor: '#EBEBEB',
    marginVertical: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#717171',
  },
});