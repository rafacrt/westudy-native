// app/auth/_layout.tsx - Layout para as telas de auth
import { Stack } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.background,
        },
        headerTintColor: Colors.light.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: 'Entrar',
          headerShown: false, // Login não mostra header
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Criar Conta',
        }}
      />
    </Stack>
  );
}