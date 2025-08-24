// context/AuthContext.tsx - Contexto de autenticação para React Native
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { apiClient } from '../lib/api';
import type { User, AuthSession, AuthContextType } from '../types';
import { Alert } from 'react-native';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão existente
    checkSession();

    // Listener para mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event);
        
        if (session?.user) {
          // Buscar dados completos do usuário via API
          const { data: userData, error } = await apiClient.getMe();
          if (!error && userData) {
            setUser(userData);
            setSession({
              access_token: session.access_token,
              refresh_token: session.refresh_token,
              expires_at: session.expires_at,
              expires_in: session.expires_in,
              token_type: session.token_type || 'bearer',
              user: userData,
            });
          }
        } else {
          setUser(null);
          setSession(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: userData, error } = await apiClient.getMe();
        if (!error && userData) {
          setUser(userData);
          setSession({
            access_token: session.access_token,
            refresh_token: session.refresh_token,
            expires_at: session.expires_at,
            expires_in: session.expires_in,
            token_type: session.token_type || 'bearer',
            user: userData,
          });
        }
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      
      // Usar o cliente Supabase diretamente para login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // O listener onAuthStateChange já cuidará de atualizar o estado
    } catch (error) {
      console.error('Login error:', error);
      const message = error instanceof Error ? error.message : 'Erro no login';
      Alert.alert('Erro', message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      
      // Usar o cliente Supabase para registro
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name, // Será usado pelo trigger para criar o perfil
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Mostrar mensagem de confirmação se necessário
      if (data.user && !data.session) {
        Alert.alert(
          'Registro realizado',
          'Verifique seu email para confirmar a conta.'
        );
      }
    } catch (error) {
      console.error('Register error:', error);
      const message = error instanceof Error ? error.message : 'Erro no registro';
      Alert.alert('Erro', message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Logout via Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new Error(error.message);
      }

      // Limpar estado local
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
      const message = error instanceof Error ? error.message : 'Erro no logout';
      Alert.alert('Erro', message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async (): Promise<void> => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      
      if (error) {
        throw new Error(error.message);
      }

      if (session?.user) {
        const { data: userData, error: userError } = await apiClient.getMe();
        if (!userError && userData) {
          setUser(userData);
          setSession({
            access_token: session.access_token,
            refresh_token: session.refresh_token,
            expires_at: session.expires_at,
            expires_in: session.expires_in,
            token_type: session.token_type || 'bearer',
            user: userData,
          });
        }
      }
    } catch (error) {
      console.error('Refresh session error:', error);
      // Logout se não conseguir renovar
      await logout();
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    login,
    register,
    logout,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}