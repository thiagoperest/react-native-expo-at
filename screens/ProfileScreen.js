import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useSession } from '../context/SessionContext';
import { useImage } from '../hooks/useImage';
import { getImageSource } from '../utils/imageHelper';

const AVATAR_KEY = '@avatar_uri';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { session } = useSession();
  const { openCamera, openGallery } = useImage();
  const [avatarUri, setAvatarUri] = useState(null);

  const fullName = session?.user?.user_metadata?.full_name || session?.user?.email || '';
  const displayName =
    fullName.length > 15 ? fullName.substring(0, 15) + '...' : fullName;

  useEffect(() => {
    AsyncStorage.getItem(AVATAR_KEY).then((saved) => {
      if (saved) setAvatarUri(saved);
    });
  }, []);

  const handlePickImage = async (source) => {
    const uri = source === 'camera' ? await openCamera() : await openGallery();
    if (uri) {
      setAvatarUri(uri);
      await AsyncStorage.setItem(AVATAR_KEY, uri);
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textOnBackground }]}>Perfil</Text>
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatarWrapper}>
          <Image source={getImageSource(avatarUri)} style={styles.avatar} />
          <TouchableOpacity
            style={[styles.fab, styles.fabCamera, { backgroundColor: colors.primary }]}
            onPress={() => handlePickImage('camera')}
            activeOpacity={0.8}
          >
            <MaterialIcons name="photo-camera" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fab, styles.fabGallery, { backgroundColor: colors.primary }]}
            onPress={() => handlePickImage('gallery')}
            activeOpacity={0.8}
          >
            <MaterialIcons name="photo-library" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.name, { color: colors.textOnBackground }]} numberOfLines={1}>
          {displayName}
        </Text>
        <Text style={[styles.email, { color: colors.textSubtle }]} numberOfLines={1}>
          {session?.user?.email}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>INFORMAÇÕES</Text>
        <View style={[styles.row, { borderBottomColor: colors.border }]}>
          <MaterialIcons name="person" size={20} color={colors.primary} />
          <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>Nome</Text>
          <Text style={[styles.rowValue, { color: colors.text }]} numberOfLines={1}>
            {displayName}
          </Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="email" size={20} color={colors.primary} />
          <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>E-mail</Text>
          <Text style={[styles.rowValue, { color: colors.text }]} numberOfLines={1}>
            {session?.user?.email}
          </Text>
        </View>
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
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  fab: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabCamera: {
    bottom: 0,
    right: -8,
  },
  fabGallery: {
    bottom: 0,
    left: -8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  card: {
    marginHorizontal: 20,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 12,
  },
  rowLabel: {
    fontSize: 14,
    width: 50,
  },
  rowValue: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
  },
});
