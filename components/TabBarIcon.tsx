// components/TabBarIcon.tsx
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface TabBarIconProps {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
}

export function TabBarIcon({ name, focused }: TabBarIconProps) {
  return (
    <Ionicons
      name={name}
      size={24}
      color={focused ? Colors.light.tabIconSelected : Colors.light.tabIconDefault}
    />
  );
}