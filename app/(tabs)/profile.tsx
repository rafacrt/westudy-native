// app/(tabs)/profile.tsx - Tela de Perfil
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza de que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/auth/login');
            } catch (error) {
              console.error('Logout error:', error);
            }
          }
        },
      ]
    );
  };

  const menuItems = [
    {
      id: 'personal-info',
      icon: 'person-outline',
      title: 'Informações pessoais',
      subtitle: 'Forneça dados pessoais e como entraremos em contato',
      onPress: () => Alert.alert('Info', 'Funcionalidade em desenvolvimento'),
    },
    {
      id: 'account',
      icon: 'settings-outline',
      title: 'Conta',
      subtitle: 'Senha, notificações, privacidade',
      onPress: () => Alert.alert('Conta', 'Funcionalidade em desenvolvimento'),
    },
    {
      id: 'hosting',
      icon: 'home-outline',
      title: 'Anunciar meu quarto',
      subtitle: 'Ganhe dinheiro compartilhando seu espaço',
      onPress: () => Alert.alert('Anunciar', 'Funcionalidade em desenvolvimento'),
    },
    {
      id: 'support',
      icon: 'help-circle-outline',
      title: 'Central de ajuda',
      subtitle: 'Obtenha ajuda e suporte',
      onPress: () => Alert.alert('Ajuda', 'Funcionalidade em desenvolvimento'),
    },
    {
      id: 'legal',
      icon: 'document-text-outline',
      title: 'Termos e políticas',
      subtitle: 'Termos de uso e política de privacidade',
      onPress: () => Alert.alert('Termos', 'Funcionalidade em desenvolvimento'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Perfil</Text>
        </View>

        {/* User Info */}
        <Card style={styles.userCard}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color={Colors.light.primary} />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <TouchableOpacity style={styles.editProfile}>
                <Text style={styles.editText}>Editar perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon as any} size={24} color={Colors.light.textSecondary} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.light.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <Button
          title="Sair da conta"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />

        {/* Version Info */}
        <Text style={styles.version}>Versão 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
  },
  userCard: {
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.light.primaryMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 8,
  },
  editProfile: {
    alignSelf: 'flex-start',
  },
  editText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  menuSection: {
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.borderSecondary,
  },
  menuIcon: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
  logoutButton: {
    marginBottom: 24,
  },
  version: {
    fontSize: 12,
    color: Colors.light.textMuted,
    textAlign: 'center',
  },
});