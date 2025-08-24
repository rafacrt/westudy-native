// app/(tabs)/index.tsx - Tela inicial/home atualizada
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0]}!</Text>
            <Text style={styles.subtitle}>Encontre seu lugar ideal</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <Ionicons name="person-circle-outline" size={32} color={Colors.light.primary} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/explore')}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="search" size={24} color={Colors.light.primary} />
            </View>
            <Text style={styles.actionTitle}>Explorar Quartos</Text>
            <Text style={styles.actionSubtitle}>Descubra opções incríveis</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/trips')}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="calendar" size={24} color={Colors.light.success} />
            </View>
            <Text style={styles.actionTitle}>Minhas Reservas</Text>
            <Text style={styles.actionSubtitle}>Gerencie suas viagens</Text>
          </TouchableOpacity>
        </View>

        {/* Main CTA */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Pronto para encontrar seu novo lar?</Text>
          <Text style={styles.ctaSubtitle}>
            Explore milhares de quartos universitários em todo o Brasil
          </Text>
          <Button
            title="Começar Busca"
            onPress={() => router.push('/(tabs)/explore')}
            style={styles.ctaButton}
          />
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  profileButton: {
    padding: 4,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 40,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.primaryMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
  ctaSection: {
    backgroundColor: Colors.light.primaryMuted,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  ctaButton: {
    minWidth: 200,
  },
});