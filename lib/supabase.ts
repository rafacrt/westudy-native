// lib/supabase.ts - Cliente Supabase para React Native
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Config } from './config';

// Adapter para armazenamento seguro no React Native
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

export const supabase = createClient(
  Config.SUPABASE_URL,
  Config.SUPABASE_ANON_KEY,
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);