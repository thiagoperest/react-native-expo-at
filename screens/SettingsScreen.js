import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useSession } from '../context/SessionContext';

const THEME_OPTIONS = [
  { value: 'light', label: 'Claro', icon: 'light-mode' },
  { value: 'dark', label: 'Escuro', icon: 'dark-mode' },
  { value: 'system', label: 'Padrão do Sistema', icon: 'settings-brightness' },
];

export default function SettingsScreen() {
  const { colors, themeMode, setThemeMode } = useTheme();
  const { session, signOut } = useSession();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textOnBackground }]}>Configurações</Text>
        <Text style={[styles.subtitle, { color: colors.textSubtle }]}>
          {session?.user?.user_metadata?.full_name || session?.user?.email}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>APARÊNCIA</Text>

        {THEME_OPTIONS.map((option, index) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              index < THEME_OPTIONS.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
            ]}
            onPress={() => setThemeMode(option.value)}
            activeOpacity={0.7}
          >
            <MaterialIcons name={option.icon} size={22} color={colors.primary} style={styles.optionIcon} />
            <Text style={[styles.optionLabel, { color: colors.text }]}>{option.label}</Text>
            <View style={[styles.radio, { borderColor: colors.primary }]}>
              {themeMode === option.value && (
                <View style={[styles.radioDot, { backgroundColor: colors.primary }]} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>CONTA</Text>
        <TouchableOpacity style={styles.option} onPress={signOut} activeOpacity={0.7}>
          <MaterialIcons name="logout" size={22} color={colors.error} style={styles.optionIcon} />
          <Text style={[styles.optionLabel, { color: colors.error }]}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 14,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    paddingTop: 14,
    paddingBottom: 6,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  optionIcon: {
    marginRight: 14,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
