import { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getFavorites, removeFavorite } from '../services/database';

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function load() {
        const data = await getFavorites();
        setFavorites(data);
      }
      load();
    }, [])
  );

  const handleRemove = async (movieId) => {
    await removeFavorite(movieId);
    setFavorites((prev) => prev.filter((f) => f.movie_id !== movieId));
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
      <Image
        source={{ uri: item.poster_url }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.movieTitle }]} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemove(item.movie_id)}
        style={styles.removeButton}
        activeOpacity={0.7}
      >
        <MaterialIcons name="favorite" size={24} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.textOnBackground }]}>Favoritos</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSubtle }]}>
          Salvos localmente no dispositivo
        </Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.centered}>
          <MaterialIcons name="favorite-border" size={64} color={colors.textSubtle} />
          <Text style={[styles.emptyText, { color: colors.textSubtle }]}>
            Nenhum favorito ainda!
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 20,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  poster: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#cce4ff',
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  removeButton: {
    padding: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptyHint: {
    fontSize: 14,
  },
});
