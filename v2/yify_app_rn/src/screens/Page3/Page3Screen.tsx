import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Movie {
  title_long: string;
  medium_cover_image: string;
  imdb_code: string;
}

export default function Page3Screen() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('bookmarklist').then((list) => {
      let bmklist = list ? JSON.parse(list) : [];
      setMovies(bmklist);
      setLoading(false);
    });
  }, []);

  const openMoviePage = (movie: Movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  const openSettings = () => {
    navigation.navigate('AppSettings');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Movies</Text>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#01d277"
          style={{ marginTop: 20 }}
        />
      ) : movies.length === 0 ? (
        <Text style={styles.emptyText}>
          Bookmark some movies in order to view in this page !!!
        </Text>
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
                source={{ uri: item.medium_cover_image }}
                style={styles.movieImage}
                resizeMode="cover"
              />
              <Text style={styles.movieTitle}>{item.title_long}</Text>
            </TouchableOpacity>
          )}
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
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 32,
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
