import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { SeniorityLevel, Track } from '@/data/flashcards';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';

const levels: SeniorityLevel[] = ['INICIANTE', 'JUNIOR', 'PLENO', 'SENIOR'];
const tracks: Track[] = ['DESENVOLVIMENTO', 'INFRAESTRUTURA', 'CLOUD'];

type ThemeItem = {
  category: string;
};

export function ReadyCardForm() {
  const { token, user } = useAuth();

  const [track, setTrack] = useState<Track>('DESENVOLVIMENTO');
  const [category, setCategory] = useState('');
  const [contestName, setContestName] = useState('');
  const [organization, setOrganization] = useState('');
  const [year, setYear] = useState('');
  const [level, setLevel] = useState<SeniorityLevel>('INICIANTE');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [themes, setThemes] = useState<string[]>([]);
  const [loadingThemes, setLoadingThemes] = useState(false);
  const [newTheme, setNewTheme] = useState('');
  const [showThemeInput, setShowThemeInput] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadThemes() {
      try {
        setLoadingThemes(true);
        const payload = await apiRequest<ThemeItem[]>(`/ready-themes?track=${track}`);
        setThemes(payload.map((item) => item.category));
      } catch {
        setThemes([]);
      } finally {
        setLoadingThemes(false);
      }
    }

    void loadThemes();
  }, [track]);

  async function onAddTheme() {
    if (!token) {
      setMessage('Faça login para criar temas no banco de dados.');
      return;
    }

    const normalizedTheme = newTheme.trim();
    if (!normalizedTheme) {
      return;
    }

    const alreadyExists = themes.some(
      (theme) => theme.toLowerCase() === normalizedTheme.toLowerCase(),
    );

    if (alreadyExists) {
      setMessage('Esse tema já existe na lista.');
      return;
    }

    try {
      const payload = await apiRequest<ThemeItem>('/ready-themes', {
        method: 'POST',
        token,
        body: {
          track,
          category: normalizedTheme,
        },
      });

      setThemes((previous) =>
        Array.from(new Set([...previous, payload.category])).sort((a, b) =>
          a.localeCompare(b, 'pt-BR'),
        ),
      );
      setCategory(payload.category);
      setNewTheme('');
      setShowThemeInput(false);
      setMessage('Tema salvo no Mongo com sucesso.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao salvar tema.');
    }
  }

  async function onSaveReadyCard() {
    if (!token) {
      setMessage('Faça login para criar cards no CardMaster.');
      return;
    }

    if (!category || !question || !answer) {
      setMessage('Preencha categoria, pergunta e resposta.');
      return;
    }

    try {
      setSubmitting(true);
      setMessage(null);

      await apiRequest('/ready-cards', {
        method: 'POST',
        token,
        body: {
          track,
          category,
          level,
          question,
          answer,
          contestName: contestName || undefined,
          organization: organization || undefined,
          year: year ? Number(year) : undefined,
        },
      });

      setCategory('');
      setContestName('');
      setOrganization('');
      setYear('');
      setQuestion('');
      setAnswer('');
      setMessage('Card criado no CardMaster com sucesso.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao criar card.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View className="mt-8 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
      <Text className="text-lg font-semibold text-[#11181C] dark:text-[#ECEDEE]">
        Criar novo Card
      </Text>
      <Text className="mt-1 text-sm text-[#687076] dark:text-[#9BA1A6]">
        Esse card vai direto para a base CardMaster.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="mt-4 flex-row gap-2 pr-2">
        {tracks.map((item) => (
          <Pressable
            key={item}
            onPress={() => setTrack(item)}
            className={`rounded-full px-3 py-2 ${
              track === item
                ? 'bg-[#3F51B5]'
                : 'bg-[#EEF2F5] dark:bg-[#2A2F36]'
            }`}>
            <Text
              className={`text-sm font-medium ${
                track === item ? 'text-white' : 'text-[#11181C] dark:text-[#ECEDEE]'
              }`}>
              {item}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View className="mt-3">
        <Pressable
          onPress={() => setShowThemeInput((previous) => !previous)}
          className="rounded-xl border border-[#3F51B5] px-4 py-2">
          <Text className="text-center font-semibold text-[#3F51B5]">Criar mais temas</Text>
        </Pressable>
      </View>

      {showThemeInput ? (
        <View className="mt-3 gap-2">
          <TextInput
            value={newTheme}
            onChangeText={setNewTheme}
            placeholder="Novo tema (ex: Segurança, Dados)"
            placeholderTextColor="#8D98A5"
            className="rounded-xl border border-[#E6E8EB] px-4 py-3 text-[#11181C] dark:border-[#30363D] dark:text-[#ECEDEE]"
          />
          <Pressable onPress={onAddTheme} className="rounded-xl bg-[#3F51B5] px-4 py-3">
            <Text className="text-center font-semibold text-white">Adicionar tema</Text>
          </Pressable>
        </View>
      ) : null}

      {themes.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="mt-3 flex-row gap-2 pr-2">
          {themes.map((theme) => (
            <Pressable
              key={theme}
              onPress={() => setCategory(theme)}
              className={`rounded-full px-3 py-2 ${
                category === theme
                  ? 'bg-[#3F51B5]'
                  : 'bg-[#EEF2F5] dark:bg-[#2A2F36]'
              }`}>
              <Text
                className={`text-sm font-medium ${
                  category === theme ? 'text-white' : 'text-[#11181C] dark:text-[#ECEDEE]'
                }`}>
                {theme}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}

      {loadingThemes ? (
        <Text className="mt-2 text-xs text-[#687076] dark:text-[#9BA1A6]">Carregando temas...</Text>
      ) : null}

      <View className="mt-4 gap-3">
        <TextInput
          value={category}
          onChangeText={setCategory}
          placeholder="Categoria (ex: JavaScript, AWS, Redes)"
          placeholderTextColor="#8D98A5"
          className="rounded-xl border border-[#E6E8EB] px-4 py-3 text-[#11181C] dark:border-[#30363D] dark:text-[#ECEDEE]"
        />
        <TextInput
          value={contestName}
          onChangeText={setContestName}
          placeholder="Fonte / prova (opcional)"
          placeholderTextColor="#8D98A5"
          className="rounded-xl border border-[#E6E8EB] px-4 py-3 text-[#11181C] dark:border-[#30363D] dark:text-[#ECEDEE]"
        />
        <TextInput
          value={organization}
          onChangeText={setOrganization}
          placeholder="Banca / órgão (opcional)"
          placeholderTextColor="#8D98A5"
          className="rounded-xl border border-[#E6E8EB] px-4 py-3 text-[#11181C] dark:border-[#30363D] dark:text-[#ECEDEE]"
        />
        <TextInput
          value={year}
          onChangeText={setYear}
          placeholder="Ano (opcional)"
          placeholderTextColor="#8D98A5"
          keyboardType="numeric"
          className="rounded-xl border border-[#E6E8EB] px-4 py-3 text-[#11181C] dark:border-[#30363D] dark:text-[#ECEDEE]"
        />
      </View>

      <View className="mt-3 flex-row gap-2">
        {levels.map((item) => (
          <Pressable
            key={item}
            onPress={() => setLevel(item)}
            className={`rounded-full px-3 py-2 ${
              level === item
                ? 'bg-[#3F51B5]'
                : 'bg-[#EEF2F5] dark:bg-[#2A2F36]'
            }`}>
            <Text
              className={`text-sm font-medium ${
                level === item ? 'text-white' : 'text-[#11181C] dark:text-[#ECEDEE]'
              }`}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="mt-3 gap-3">
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Pergunta"
          placeholderTextColor="#8D98A5"
          className="rounded-xl border border-[#E6E8EB] px-4 py-3 text-[#11181C] dark:border-[#30363D] dark:text-[#ECEDEE]"
        />
        <TextInput
          value={answer}
          onChangeText={setAnswer}
          placeholder="Resposta"
          placeholderTextColor="#8D98A5"
          multiline
          className="min-h-24 rounded-xl border border-[#E6E8EB] px-4 py-3 text-[#11181C] dark:border-[#30363D] dark:text-[#ECEDEE]"
        />
      </View>

      <Pressable
        disabled={submitting}
        onPress={() => {
          if (!submitting) {
            void onSaveReadyCard();
          }
        }}
        className={`mt-4 rounded-xl px-4 py-3 ${submitting ? 'bg-[#A5B4FC]' : 'bg-[#3F51B5]'}`}>
        <Text className="text-center font-semibold text-white">
          {submitting ? 'Salvando...' : 'Salvar no CardMaster'}
        </Text>
      </Pressable>

      {!user ? (
        <Link href="/login" asChild>
          <Text className="mt-3 rounded-xl border border-[#3F51B5] px-4 py-3 text-center font-semibold text-[#3F51B5]">
            Entrar para criar card
          </Text>
        </Link>
      ) : null}

      {message ? (
        <Text className="mt-3 text-center text-sm text-[#687076] dark:text-[#9BA1A6]">{message}</Text>
      ) : null}
    </View>
  );
}
