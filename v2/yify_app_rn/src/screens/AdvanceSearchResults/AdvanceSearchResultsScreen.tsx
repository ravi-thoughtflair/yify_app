import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Replace with your API provider logic
import { advancedSearchYifyMovies } from '../../providers/yify-movies';

interface Movie {
  title_long: string;
  medium_cover_image: string;
  // ...other fields as needed
}

export default function AdvanceSearchResultsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const querystring = (route.params as any)?.qstring || '';

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const defaultImage = 'https://i.imgur.com/DLkGimY.png';

  const loadMovies = useCallback(
    async (reset = false) => {
      if (loading) return;
      setLoading(true);
      try {
        const res = await advancedSearchYifyMovies(
          50,
          reset ? 1 : page,
          querystring
        );
        if (res.status === 'ok' && res.data.movies) {
          setMovies(reset ? res.data.movies : [...movies, ...res.data.movies]);
          setHasMore(res.data.movies.length > 0);
        } else {
          setHasMore(false);
          Alert.alert('No movies found related to your queries.');
        }
      } catch (error) {
        Alert.alert('Error fetching movies');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [loading, page, querystring, movies]
  );

  useEffect(() => {
    loadMovies(true);
  }, [querystring]);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    loadMovies(true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
      loadMovies();
    }
  };

  const openMoviePage = (movie: Movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  const openSettings = () => {
    navigation.navigate('AppSettings');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Advanced Search Results</Text>
      {loading && movies.length === 0 ? (
        <ActivityIndicator
          size="large"
          color="#01d277"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.movieTile}
              onPress={() => openMoviePage(item)}
            >
              <Image
                source={{ uri: item.medium_cover_image || defaultImage }}
                style={styles.movieImage}
                resizeMode="cover"
              />
              <Text style={styles.movieTitle}>{item.title_long}</Text>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loading && movies.length > 0 ? (
              <ActivityIndicator size="small" color="#01d277" />
            ) : null
          }
        />
      )}
      <TouchableOpacity style={styles.settingsFab} onPress={openSettings}>
        <Text style={styles.settingsIcon}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  movieTile: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  movieTitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  settingsFab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#01d277',
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  settingsIcon: {
    fontSize: 28,
    color: '#fff',
  },
});
