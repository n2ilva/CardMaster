import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { PanelCard } from '@/components/quiz/panel-card';
import { QuizStatCard } from '@/components/quiz/stat-card';
import { TRACK_STYLE_FALLBACK, trackStyles } from '@/constants/track-styles';
import { QUIZ_COLORS } from '@/constants/quiz-ui';
import { useLayoutMode } from '@/hooks/use-layout-mode';
import { useLogout } from '@/hooks/use-logout';
import { useScreenSize } from '@/hooks/use-screen-size';
import { useTabContentPadding, useTopContentPadding } from '@/hooks/use-tab-content-padding';
import { useAuth } from '@/providers/auth-provider';
import { useData } from '@/providers/data-provider';

import { HomeThemeCard, type HomeThemeItem } from './components/home-theme-card';
import { HOME_FEATURES } from './home.constants';

export function HomeScreen() {
  const bottomPadding = useTabContentPadding();
  const topPadding = useTopContentPadding();
  const { user } = useAuth();
  const { trackCatalog, dbStats: stats } = useData();
  const layoutMode = useLayoutMode();
  const { isDesktop } = useScreenSize();
  const { loggingOut, handleLogout } = useLogout();

  const themes: HomeThemeItem[] = trackCatalog.map((item) => {
    const style = trackStyles[item.key] ?? TRACK_STYLE_FALLBACK;
    return {
      key: item.key,
      label: item.label,
      icon: style.icon,
      color: style.color,
    };
  });

  if (layoutMode === 'desktop') {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: '#111316' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding, padding: 32, paddingTop: 32 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 28, gap: 16 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#ECEDEE', fontSize: 26, fontWeight: '700' }}>
              {user ? `Olá, ${user.name}!` : 'Bem-vindo!'}
            </Text>
            <Text style={{ color: '#687076', fontSize: 14, marginTop: 4 }}>
              Teste seus conhecimentos e evolua com questões desafiadoras.
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 16, marginBottom: 24 }}>
          <QuizStatCard label="Quiz" value={stats ? stats.totalCards.toLocaleString('pt-BR') : '…'} subtitle="questões disponíveis" icon="layers" accentColor="#FFFFFF" backgroundColor="#0EA5E9" borderColor="#0EA5E9" valueColor="#FFFFFF" labelColor="rgba(255,255,255,0.8)" subtitleColor="rgba(255,255,255,0.7)" iconBackgroundColor="rgba(255,255,255,0.14)" style={{ flex: 1 }} />
          <QuizStatCard label="Temas" value={stats ? stats.activeTracks : '…'} subtitle="temas ativos" icon="category" accentColor="#FFFFFF" backgroundColor="#8B5CF6" borderColor="#8B5CF6" valueColor="#FFFFFF" labelColor="rgba(255,255,255,0.8)" subtitleColor="rgba(255,255,255,0.7)" iconBackgroundColor="rgba(255,255,255,0.14)" style={{ flex: 1 }} />
          <QuizStatCard label="Sistema" value="Repetição" subtitle="espaçada adaptativa" icon="auto-awesome" accentColor={QUIZ_COLORS.primarySoft} backgroundColor={QUIZ_COLORS.surfaceStrong} borderColor={QUIZ_COLORS.borderSubtle} valueColor={QUIZ_COLORS.textPrimary} labelColor={QUIZ_COLORS.textMuted} subtitleColor={QUIZ_COLORS.textMuted} style={{ flex: 1 }} />
        </View>

        <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 16 }}>
          <View style={{ flex: 3, gap: 16 }}>
            <PanelCard>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <MaterialIcons name="school" size={18} color={QUIZ_COLORS.primarySoft} />
                <Text style={{ color: QUIZ_COLORS.textPrimary, fontSize: 15, fontWeight: '600' }}>Temas disponíveis</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {[0, 1, 2].map((columnIndex) => (
                  <View key={columnIndex} style={{ flex: 1, gap: 10 }}>
                    {themes.filter((_, index) => index % 3 === columnIndex).map((theme) => (
                      <HomeThemeCard key={theme.key} item={theme} fontSize={16} />
                    ))}
                  </View>
                ))}
              </View>
            </PanelCard>

            <PanelCard>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <MaterialIcons name="help-outline" size={18} color={QUIZ_COLORS.primarySoft} />
                <Text style={{ color: QUIZ_COLORS.textPrimary, fontSize: 15, fontWeight: '600' }}>Como estudar</Text>
              </View>
              <View style={{ gap: 12 }}>
                {[
                  { n: '1', text: 'Escolha um tema e uma categoria na aba Quiz' },
                  { n: '2', text: 'O sistema seleciona automaticamente as melhores perguntas para você' },
                  { n: '3', text: 'Responda e aprenda com explicações detalhadas e exemplos' },
                  { n: '4', text: 'Perguntas erradas voltam mais frequência — repetição espaçada para fixar' },
                ].map((step) => (
                  <View key={step.n} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                    <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: QUIZ_COLORS.primary, alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                      <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>{step.n}</Text>
                    </View>
                    <Text style={{ color: QUIZ_COLORS.textMuted, fontSize: 13, lineHeight: 20, flex: 1 }}>{step.text}</Text>
                  </View>
                ))}
              </View>
            </PanelCard>
          </View>

          <View style={{ flex: 2, gap: 16 }}>
            <PanelCard>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <MaterialIcons name="auto-awesome" size={18} color="#8B5CF6" />
                <Text style={{ color: QUIZ_COLORS.textPrimary, fontSize: 15, fontWeight: '600' }}>Recursos</Text>
              </View>
              <View style={{ gap: 10 }}>
                {HOME_FEATURES.map((feature, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                    <MaterialIcons name={feature.icon} size={15} color={QUIZ_COLORS.textFaint} style={{ marginTop: 1 }} />
                    <Text style={{ color: QUIZ_COLORS.textMuted, fontSize: 12, lineHeight: 18, flex: 1 }}>{feature.text}</Text>
                  </View>
                ))}
              </View>
            </PanelCard>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white px-5 dark:bg-[#151718]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
      <View className="flex-row items-center gap-3">
        <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#3F51B5]">
          <MaterialIcons name="style" size={22} color="#FFFFFF" />
        </View>
        <View className="flex-1">
          <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">QuizMaster</Text>
        </View>
        <Pressable
          onPress={() => {
            if (!loggingOut) {
              void handleLogout();
            }
          }}
          className="h-10 w-10 items-center justify-center rounded-full active:opacity-60"
          disabled={loggingOut}>
          <MaterialIcons name={loggingOut ? 'hourglass-empty' : 'logout'} size={22} color="#9BA1A6" />
        </Pressable>
      </View>

      <Text className="mt-3 text-base leading-6 text-[#687076] dark:text-[#9BA1A6]">
        {user ? (
          <>
            Olá, <Text className="font-bold text-[#11181C] dark:text-[#ECEDEE]">{user.name}</Text>!
          </>
        ) : (
          'Bem-vindo!'
        )}{' '}
        Teste seus conhecimentos e evolua com questões desafiadoras.
      </Text>

      <View className="mt-5 flex-row gap-3">
        <View className="flex-1 rounded-2xl bg-[#F0F9FF] p-4 dark:bg-[#0EA5E9]/10">
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="layers" size={16} color="#0EA5E9" />
            <Text className="text-xs uppercase tracking-wide text-[#0369A1] dark:text-[#7DD3FC]">Quiz</Text>
          </View>
          <Text className="mt-2 text-3xl font-bold text-[#0C4A6E] dark:text-[#E0F2FE]">
            {stats ? stats.totalCards.toLocaleString('pt-BR') : '…'}
          </Text>
        </View>
        <View className="flex-1 rounded-2xl bg-[#F5F3FF] p-4 dark:bg-[#8B5CF6]/10">
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="category" size={16} color="#8B5CF6" />
            <Text className="text-xs uppercase tracking-wide text-[#5B21B6] dark:text-[#C4B5FD]">Temas</Text>
          </View>
          <Text className="mt-2 text-3xl font-bold text-[#3B0764] dark:text-[#EDE9FE]">
            {stats ? stats.activeTracks : '…'}
          </Text>
        </View>
      </View>

      <PanelCard compact style={{ marginTop: 20, backgroundColor: '#1A1D21' }}>
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="school" size={18} color="#687076" />
          <Text className="text-base font-semibold text-[#11181C] dark:text-[#ECEDEE]">Temas disponíveis</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
          {[0, 1].map((columnIndex) => (
            <View key={columnIndex} style={{ flex: 1, gap: 10 }}>
              {themes.filter((_, index) => index % 2 === columnIndex).map((theme) => (
                <HomeThemeCard key={theme.key} item={theme} />
              ))}
            </View>
          ))}
        </View>
      </PanelCard>

      <PanelCard compact style={{ marginTop: 12, backgroundColor: '#1A1D21' }}>
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="help-outline" size={18} color="#3F51B5" />
          <Text className="text-base font-semibold text-[#11181C] dark:text-[#ECEDEE]">Como estudar</Text>
        </View>
        <View className="mt-3 gap-3">
          {[
            'Escolha um tema e uma categoria na aba Quiz',
            'O sistema seleciona automaticamente as melhores perguntas para você com base no seu desempenho',
            'Responda e aprenda com explicações detalhadas e exemplos',
            'Perguntas que você errou voltam com mais frequência — repetição espaçada para fixar o conteúdo',
          ].map((step, index) => (
            <View key={index} className="flex-row items-start gap-2.5">
              <View className="mt-0.5 h-5 w-5 items-center justify-center rounded-full bg-[#3F51B5]">
                <Text className="text-[10px] font-bold text-white">{index + 1}</Text>
              </View>
              <Text className="flex-1 text-sm leading-5 text-[#687076] dark:text-[#9BA1A6]">{step}</Text>
            </View>
          ))}
        </View>
      </PanelCard>

      <PanelCard compact style={{ marginTop: 12, backgroundColor: '#1A1D21' }}>
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="auto-awesome" size={18} color="#8B5CF6" />
          <Text className="text-base font-semibold text-[#11181C] dark:text-[#ECEDEE]">Recursos</Text>
        </View>
        <View className="mt-3 flex-row flex-wrap gap-x-2 gap-y-2.5">
          {HOME_FEATURES.map((feature, index) => (
            <View key={index} className="w-[48%] flex-row items-start gap-2">
              <MaterialIcons name={feature.icon} size={14} color="#9BA1A6" style={{ marginTop: 2 }} />
              <Text className="flex-1 text-xs leading-4 text-[#687076] dark:text-[#9BA1A6]">{feature.text}</Text>
            </View>
          ))}
        </View>
      </PanelCard>
    </ScrollView>
  );
}
