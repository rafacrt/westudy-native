// app/_layout.tsx - Layout raiz da aplicação
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/AuthContext';
import { Colors } from '../constants/Colors';

// Prevenir que a splash screen se esconda automaticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.light.background },
          }}
        >
          <Stack.Screen 
            name="index" 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="(tabs)" 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="auth/login" 
            options={{ 
              headerShown: true,
              title: 'Entrar',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="auth/register" 
            options={{ 
              headerShown: true,
              title: 'Criar Conta',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="room/[id]" 
            options={{ 
              headerShown: false,
              presentation: 'modal',
            }}
          />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}