import { memo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

function MovieItem({ movie }) {
  const { colors } = useTheme();
  const year = 1980 + (movie.id % 43);

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
});
