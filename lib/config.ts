import Constants from 'expo-constants';

export const Config = {
  // URL base da API (mesmo servidor do web app)
  API_URL: __DEV__ ? 'http://localhost:9002/api' : 'https://sua-producao.com/api',
  
  // Configurações do Supabase (mesmas do web app)
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || Constants.expoConfig?.extra?.supabaseUrl || '',
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || Constants.expoConfig?.extra?.supabaseAnonKey || '',
  
  // Configurações do app
  APP_NAME: 'WeStudy',
  VERSION: Constants.expoConfig?.version || '1.0.0',
};

// Validação das configurações obrigatórias
if (!Config.SUPABASE_URL || !Config.SUPABASE_ANON_KEY) {
  throw new Error(
    'Configurações do Supabase não encontradas. Verifique se as variáveis EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY estão definidas.'
  );
}