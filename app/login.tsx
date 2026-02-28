import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { useAuth } from '@/providers/auth-provider';

export default function LoginScreen() {
  const { login, register, isLoading, user } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/(tabs)');
    }
  }, [isLoading, user]);

  async function onLogin() {
    try {
      setSubmitting(true);
      setMessage(null);
      await login(email, password);
      setMessage('Login realizado com sucesso.');
      router.replace('/(tabs)');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao realizar login.');
    } finally {
      setSubmitting(false);
    }
  }

  async function onRegister() {
    try {
      setSubmitting(true);
      setMessage(null);
      await register(name || 'Usuário', email, password);
      setMessage('Conta criada com sucesso.');
      router.replace('/(tabs)');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao criar conta.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]">
      <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">
        Login no CardMaster
      </Text>
      <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
        Entre para sincronizar progresso, recompensas e cards personalizados.
      </Text>

      <View className="mt-6 gap-3">
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="nome (para cadastro)"
          placeholderTextColor="#8D98A5"
          className="rounded-xl border border-[#E6E8EB] px-4 py-3 text-[#11181C] dark:border-[#30363D] dark:text-[#ECEDEE]"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="seu@email.com"
          placeholderTextColor="#8D98A5"
          className="rounded-xl border border-[#E6E8EB] px-4 py-3 text-[#11181C] dark:border-[#30363D] dark:text-[#ECEDEE]"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="senha"
          placeholderTextColor="#8D98A5"
          secureTextEntry
          className="rounded-xl border border-[#E6E8EB] px-4 py-3 text-[#11181C] dark:border-[#30363D] dark:text-[#ECEDEE]"
        />
      </View>

      <Text
        className="mt-5 rounded-xl bg-[#3F51B5] px-4 py-3 text-center font-semibold text-white"
        onPress={() => {
          if (!submitting && !isLoading) {
            void onLogin();
          }
        }}>
        {submitting ? 'Processando...' : 'Entrar'}
      </Text>
      <Text
        className="mt-3 rounded-xl border border-[#3F51B5] px-4 py-3 text-center font-semibold text-[#3F51B5]"
        onPress={() => {
          if (!submitting && !isLoading) {
            void onRegister();
          }
        }}>
        Criar conta
      </Text>

      {message ? (
        <Text className="mt-3 text-center text-sm text-[#687076] dark:text-[#9BA1A6]">{message}</Text>
      ) : null}
      {user ? (
        <Text className="mt-2 text-center text-xs text-[#687076] dark:text-[#9BA1A6]">
          Sessão ativa: {user.email}
        </Text>
      ) : null}
    </View>
  );
}
