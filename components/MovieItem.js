import { memo, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { isFavorite, addFavorite, removeFavorite } from '../services/database';

function MovieItem({ movie, refreshKey }) {
  const { colors } = useTheme();
  const year = 1980 + (movie.id % 43);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    isFavorite(movie.id).then(setFavorited);
  }, [movie.id, refreshKey]);

  const toggleFavorite = async () => {
    if (favorited) {
      await removeFavorite(movie.id);
    } else {
      await addFavorite(movie);
    }
    setFavorited((v) => !v);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
      <Image
        source={{ uri: `https://picsum.photos/seed/${movie.id}/60/60` }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.movieTitle }]} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={[styles.year, { color: colors.textSecondary }]}>{year}</Text>
      </View>
      <TouchableOpacity onPress={toggleFavorite} style={styles.heartButton} activeOpacity={0.7}>
        <MaterialIcons
          name={favorited ? 'favorite' : 'favorite-border'}
          size={24}
          color={favorited ? '#e74c3c' : colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
}

export default memo(MovieItem);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  year: {
    fontSize: 14,
  },
  heartButton: {
    padding: 4,
  },
});
