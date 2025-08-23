import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>WeStudy</Text>
      <Text style={styles.p}>Bem-vindo! (SDK 53, Router v5)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80, paddingHorizontal: 20, gap: 8 },
  h1: { fontFamily: 'InterSemiBold', fontSize: 28 },
  p: { fontFamily: 'InterRegular', fontSize: 16, opacity: 0.8 },
});
