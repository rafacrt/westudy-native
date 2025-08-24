// app/(tabs)/_layout.tsx - Layout das tabs
import React from 'react';
import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { TabBarIcon } from '../../components/ui/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tabIconSelected,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors.light.background,
          borderTopColor: Colors.light.borderSecondary,
          height: 90,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="search" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: 'Viagens',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="heart" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlists"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="heart-outline" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="person" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}