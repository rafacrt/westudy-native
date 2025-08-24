// app/index.tsx - Tela de redirecionamento inicial
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../constants/Colors';
import { GlobalStyles } from '../constants/Styles';

export default function IndexPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  // Redirecionar baseado no estado de autenticação
  if (user) {
    return <Redirect href="/(tabs)/explore" />;
  } else {
    return <Redirect href="/auth/login" />;
  }
}
