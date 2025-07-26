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
const ITEM_WIDTH = (width - 48) / 2; // Para 2 colunas com padding

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
    >
      <Image source={{ uri: item.images[0]?.url }} style={styles.listingImage} />
      
      <View style={styles.listingInfo}>
        <Text style={styles.listingTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        <Text style={styles.universityText}>
          {item.university.acronym} - {item.university.city}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>
            {item.rating.toFixed(1)} ({item.reviews})
          </Text>
        </View>
        
        <Text style={styles.priceText}>
          R$ {item.pricePerNight.toLocaleString('pt-BR')}/mês
        </Text>
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
          <ActivityIndicator size="large" color="#416ed3" />
          <Text style={styles.loadingText}>Carregando quartos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header com busca */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WeStudy</Text>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por cidade ou universidade"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Categorias */}
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

      {/* Lista de quartos */}
      <FlatList
        data={filteredListings}
        renderItem={renderListingCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listingsContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum quarto encontrado</Text>
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
    color: '#666',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#416ed3',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoriesSection: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#416ed3',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  listingsContainer: {
    padding: 16,
  },
  listingCard: {
    width: ITEM_WIDTH,
    marginBottom: 20,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listingImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  listingInfo: {
    padding: 12,
  },
  listingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  universityText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#416ed3',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});