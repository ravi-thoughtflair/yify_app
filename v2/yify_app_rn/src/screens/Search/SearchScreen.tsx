import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import { searchYifyMovies } from '../../providers/yify-movies';

interface Movie {
  title_long: string;
  medium_cover_image: string;
  rating: number;
}

export default function SearchScreen() {
  const navigation = useNavigation();
  const [textinput, setTextinput] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [showText, setShowText] = useState(false);

  const defaultImage = 'https://i.imgur.com/DLkGimY.png';

  const getItems = useCallback(async (val: string) => {
    setShowText(false);
    if (val && val.trim() !== '') {
      setLoading(true);
      try {
        // const res = await searchYifyMovies(val);
        // if (res.status === 'ok') {
        //   setMovies(res.data.movies);
        //   setShowText(res.data.movie_count === 0);
        // } else {
        //   setMovies([]);
        //   setShowText(true);
        // }
      } catch (error) {
        setMovies([]);
        setShowText(true);
      } finally {
        setLoading(false);
      }
    } else {
      setMovies([]);
      setShowText(false);
    }
  }, []);

  const openMoviePage = (movie: Movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  const openSettings = () => {
    navigation.navigate('AppSettings');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search movies..."
        value={textinput}
        onChangeText={(val) => {
          setTextinput(val);
          getItems(val);
        }}
      />
      {loading && (
        <ActivityIndicator
          size="large"
          color="#01d277"
          style={{ marginTop: 20 }}
        />
      )}
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
            <View style={{ flex: 1 }}>
              <Text style={styles.movieTitle}>{item.title_long}</Text>
              <Text style={styles.movieRating}>Imdb: {item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {showText && (
        <Text style={styles.emptyText}>
          No movies found related to your search, try again with complete words!
        </Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  movieTile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 8,
  },
  movieImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: 12,
  },
  movieTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  movieRating: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 32,
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
