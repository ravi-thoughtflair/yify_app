import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Replace with your API provider logic
// import { loadYifyMovieDetails } from '../../providers/yify-movies';

export default function MovieDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const movie = (route.params as any)?.movie;

  const [details, setDetails] = useState<any>({});
  const [bookmarkColor, setBookmarkColor] = useState('#a9a9a9');

  useEffect(() => {
    // Example: loadYifyMovieDetails(movie.id).then(setDetails);
    setDetails(movie || {});
    checkBookmark();
  }, [movie]);

  const checkBookmark = async () => {
    const list = await AsyncStorage.getItem('bookmarklist');
    let bmklist = list ? JSON.parse(list) : [];
    const found = bmklist.some((m: any) => m.imdb_code === movie.imdb_code);
    setBookmarkColor(found ? '#0045b9' : '#a9a9a9');
  };

  const toggleBookmark = async () => {
    const list = await AsyncStorage.getItem('bookmarklist');
    let bmklist = list ? JSON.parse(list) : [];
    const found = bmklist.some((m: any) => m.imdb_code === movie.imdb_code);
    if (found) {
      bmklist = bmklist.filter((m: any) => m.imdb_code !== movie.imdb_code);
      setBookmarkColor('#a9a9a9');
      Alert.alert('Removed from Bookmark Successfully!');
    } else {
      bmklist.push(movie);
      setBookmarkColor('#0045b9');
      Alert.alert('Added to Bookmark Successfully!');
    }
    await AsyncStorage.setItem('bookmarklist', JSON.stringify(bmklist));
  };

  const openSettings = () => {
    navigation.navigate('AppSettings');
  };

  if (!movie) return <Text>No movie data</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{movie.title_long}</Text>
      <TouchableOpacity
        onPress={() => {
          /* watch trailer logic */
        }}
      >
        <Image
          source={{ uri: movie.medium_cover_image }}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.description}>{movie.synopsis}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={toggleBookmark}>
          <Text style={[styles.bookmark, { color: bookmarkColor }]}>🔖</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openSettings}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
      {/* Add more details, cast, torrents, etc. as needed */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#eee',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#e0f7ef',
    alignItems: 'center',
  },
  bookmark: {
    fontSize: 28,
  },
  settingsIcon: {
    fontSize: 28,
    color: '#01d277',
  },
});
