import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('demo@westudy.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigation.navigate('Main' as never);
      } else {
        Alert.alert('Erro', 'Email ou senha incorretos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    Alert.alert('Cadastro', 'Funcionalidade de cadastro será implementada em breve!');
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperar Senha', 'Funcionalidade de recuperação de senha será implementada em breve!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Logo e título */}
          <View style={styles.header}>
            <Image 
              source={{ uri: 'https://picsum.photos/seed/westudy-logo/120/120' }}
              style={styles.logo}
            />
            <Text style={styles.title}>WeStudy</Text>
            <Text style={styles.subtitle}>Seu próximo quarto te espera</Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </TouchableOpacity>

            {/* Botão de login */}
            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Botão de cadastro */}
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Criar conta</Text>
            </TouchableOpacity>
          </View>

          {/* Informações de demo */}
          <View style={styles.demoInfo}>
            <Text style={styles.demoTitle}>Conta de demonstração:</Text>
            <Text style={styles.demoText}>Email: demo@westudy.com</Text>
            <Text style={styles.demoText}>Senha: 123456</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#416ed3',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
  },
  forgotPassword: {
    color: '#416ed3',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#416ed3',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#416ed3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#666',
    fontSize: 14,
  },
  registerButton: {
    borderWidth: 1,
    borderColor: '#416ed3',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#416ed3',
    fontSize: 16,
    fontWeight: '600',
  },
  demoInfo: {
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#416ed3',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
});