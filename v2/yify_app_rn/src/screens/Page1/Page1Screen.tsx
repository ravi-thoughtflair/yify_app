import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import { getLatestMovies } from '../../providers/yify-movies';

interface Movie {
  title_long: string;
  medium_cover_image: string;
}

export default function Page1Screen() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const defaultImage = 'https://i.imgur.com/DLkGimY.png';

  const loadMovies = useCallback(async () => {
    setLoading(true);
    try {
      // const res = await getLatestMovies();
      // setMovies(res.data.movies);
    } catch (error) {
      // handle error
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadMovies();
  };

  const openMoviePage = (movie: Movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  const openSettings = () => {
    navigation.navigate('AppSettings');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Movies</Text>
      {loading ? (
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
