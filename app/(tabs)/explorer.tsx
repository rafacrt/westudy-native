import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Explorar</Text>
      <Text style={styles.p}>Liste apartamentos/quartos, filtros, mapas (depois).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80, paddingHorizontal: 20, gap: 8 },
  h1: { fontFamily: 'InterSemiBold', fontSize: 24 },
  p: { fontFamily: 'InterRegular', fontSize: 16, opacity: 0.8 },
});
