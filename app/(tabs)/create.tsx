import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, View } from 'react-native';

import { useTabContentPadding } from '@/hooks/use-tab-content-padding';
import { type ThemeItem, fetchThemes } from '@/lib/api';

export default function SearchScreen() {
  const bottomPadding = useTabContentPadding();

  const [themes, setThemes] = useState<ThemeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadThemes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchThemes();
      setThemes(data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadThemes();
  }, [loadThemes]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return themes;
    return themes.filter(
      (t) =>
        t.name.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term),
    );
  }, [searchTerm, themes]);

  return (
    <ScrollView
      className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottomPadding }}>
      <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">Pesquisar</Text>
      <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
        Busque temas e categorias cadastrados no CardMaster.
      </Text>

      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Buscar tema..."
        placeholderTextColor="#8D98A5"
        autoCapitalize="none"
        autoCorrect={false}
        className="mt-5 rounded-xl border border-[#E6E8EB] px-4 py-3 text-[#11181C] dark:border-[#30363D] dark:text-[#ECEDEE]"
      />

      {loading ? (
        <View className="mt-10 items-center">
          <ActivityIndicator size="large" color="#3F51B5" />
        </View>
      ) : filtered.length === 0 ? (
        <Text className="mt-6 text-center text-[#687076] dark:text-[#9BA1A6]">
          {searchTerm.trim() ? 'Nenhum tema encontrado.' : 'Nenhum tema cadastrado ainda.'}
        </Text>
      ) : (
        <View className="mt-4 gap-3">
          {filtered.map((theme) => (
            <View
              key={theme.id}
              className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
              <Text className="text-base font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                {theme.name}
              </Text>
              {theme.description ? (
                <Text className="mt-1 text-sm text-[#687076] dark:text-[#9BA1A6]">
                  {theme.description}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
