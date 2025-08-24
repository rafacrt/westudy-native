// components/ImageCarousel.tsx
import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  Dimensions, 
  StyleSheet, 
  Text 
} from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../../constants/Colors';
import type { Image as ImageType } from '../../types';

interface ImageCarouselProps {
  images: ImageType[];
  height?: number;
}

const { width: screenWidth } = Dimensions.get('window');

export function ImageCarousel({ images, height = 250 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
  };

  if (!images.length) {
    return (
      <View style={[styles.container, { height }]}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Sem imagens</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { height }]}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image) => (
          <Image
            key={image.id}
            source={{ uri: image.url }}
            style={[styles.image, { width: screenWidth, height }]}
            contentFit="cover"
            transition={300}
          />
        ))}
      </ScrollView>
      
      {images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    backgroundColor: Colors.light.backgroundSecondary,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundSecondary,
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.light.textMuted,
  },
  pagination: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: Colors.light.background,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});