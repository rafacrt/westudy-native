// app/+not-found.tsx
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>404</Text>
      <Text style={styles.p}>Tela não encontrada.</Text>
      <Link href="/(tabs)" style={styles.link}>Voltar ao início</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80, paddingHorizontal: 20, gap: 8 },
  h1: { fontSize: 32, fontWeight: '700' },
  p: { fontSize: 16, opacity: 0.8 },
  link: { marginTop: 12, fontSize: 16, textDecorationLine: 'underline' },
});
