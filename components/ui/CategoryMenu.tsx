// components/CategoryMenu.tsx
import React from 'react';
import { 
  ScrollView, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  View 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import type { Category } from '../../types';

interface CategoryMenuProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

// Mapeamento de ícones (mesmo do web app)
const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  'Palette': 'color-palette-outline',
  'School': 'school-outline',
  'Building': 'business-outline',
  'Home': 'home-outline',
  'Castle': 'library-outline',
  'Bed': 'bed-outline',
  'Waves': 'water-outline',
  'Trees': 'leaf-outline',
  'MountainSnow': 'mountain-outline',
  'Sun': 'sunny-outline',
  'Tent': 'triangle-outline',
};

export function CategoryMenu({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryMenuProps) {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const iconName = iconMap[category.icon] || 'ellipse-outline';
          
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                isSelected && styles.categoryItemSelected,
              ]}
              onPress={() => onSelectCategory(isSelected ? null : category.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={iconName}
                size={20}
                color={isSelected ? Colors.light.background : Colors.light.textSecondary}
                style={styles.categoryIcon}
              />
              <Text style={[
                styles.categoryText,
                isSelected && styles.categoryTextSelected,
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.borderSecondary,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.backgroundSecondary,
    minWidth: 80,
  },
  categoryItemSelected: {
    backgroundColor: Colors.light.primary,
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.textSecondary,
  },
  categoryTextSelected: {
    color: Colors.light.background,
  },
});