import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Perfil</Text>
      <Text style={styles.p}>Login/Signup (Supabase) entram aqui nos próximos passos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80, paddingHorizontal: 20, gap: 8 },
  h1: { fontFamily: 'InterSemiBold', fontSize: 24 },
  p: { fontFamily: 'InterRegular', fontSize: 16, opacity: 0.8 },
});
