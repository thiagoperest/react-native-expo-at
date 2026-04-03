import { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMovie } from '../hooks/useMovie';
import MovieItem from '../components/MovieItem';
import { useSession } from '../context/SessionContext';
import { useTheme } from '../context/ThemeContext';

export default function MoviesScreen() {
  const { session } = useSession();
  const { colors } = useTheme();
  const userName = session?.user?.user_metadata?.full_name || session?.user?.email;
  const {
    movies,
    loading,
    loadingMore,
    error,
    searchQuery,
    setSearchQuery,
    loadMore,
  } = useMovie();

  const renderItem = useCallback(({ item }) => <MovieItem movie={item} />, []);

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.textOnBackground} />
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: colors.textOnBackground }]}>Nenhum filme encontrado.</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.textOnBackground }]}>Catálogo de Filmes</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSubtle }]}>
          Olá, {userName}!
        </Text>
      </View>

      <TextInput
        style={[styles.searchInput, { backgroundColor: colors.surface, color: colors.inputText, shadowColor: colors.shadow }]}
        placeholder="Buscar filmes..."
        placeholderTextColor={colors.placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
        clearButtonMode="while-editing"
        returnKeyType="search"
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.textOnBackground} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.textOnBackground }]}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={movies.length === 0 && styles.flatListEmpty}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          windowSize={5}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: 15,
  },
  searchInput: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  list: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
  },
  flatListEmpty: {
    flexGrow: 1,
  },
});
