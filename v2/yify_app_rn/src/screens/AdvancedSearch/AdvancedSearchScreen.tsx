import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const genres = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Film-Noir',
  'History',
  'Horror',
  'Music',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Sport',
  'Thriller',
  'War',
  'Western',
];
const qualities = ['720p', '1080p', '3D'];
const ratings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const sortBy = [
  'title',
  'year',
  'rating',
  'peers',
  'seeds',
  'download_count',
  'like_count',
  'date_added',
];
const orderBy = ['desc', 'asc'];

export default function AdvancedSearchScreen() {
  const navigation = useNavigation();
  const [genre, setGenre] = useState('');
  const [quality, setQuality] = useState('');
  const [minimumRating, setMinimumRating] = useState('');
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [movieName, setMovieName] = useState('');

  const getQueryString = () => {
    let qstring = '';
    if (genre) qstring += `genre=${genre}&`;
    if (quality) qstring += `quality=${quality}&`;
    if (minimumRating) qstring += `minimum_rating=${minimumRating}&`;
    if (sort) qstring += `sort_by=${sort}&`;
    if (order) qstring += `order_by=${order}&`;
    if (movieName) qstring += `query_term=${movieName}&`;
    if (qstring.endsWith('&')) qstring = qstring.slice(0, -1);
    return qstring;
  };

  const handleSearch = () => {
    const qstring = getQueryString();
    navigation.navigate('AdvanceSearchResults', { qstring });
  };

  const openSettings = () => {
    navigation.navigate('AppSettings');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Browser for YIFY</Text>
      <TextInput
        style={styles.input}
        placeholder="Movie Name"
        value={movieName}
        onChangeText={setMovieName}
      />
      <Text style={styles.label}>Genre</Text>
      <Picker
        selectedValue={genre}
        onValueChange={setGenre}
        style={styles.picker}
      >
        <Picker.Item label="Select Genre" value="" />
        {genres.map((g) => (
          <Picker.Item key={g} label={g} value={g} />
        ))}
      </Picker>
      <Text style={styles.label}>Quality</Text>
      <Picker
        selectedValue={quality}
        onValueChange={setQuality}
        style={styles.picker}
      >
        <Picker.Item label="Select Quality" value="" />
        {qualities.map((q) => (
          <Picker.Item key={q} label={q} value={q} />
        ))}
      </Picker>
      <Text style={styles.label}>IMDB Rating</Text>
      <Picker
        selectedValue={minimumRating}
        onValueChange={setMinimumRating}
        style={styles.picker}
      >
        <Picker.Item label="Select Rating" value="" />
        {ratings.map((r) => (
          <Picker.Item key={r} label={`${r} +`} value={r} />
        ))}
      </Picker>
      <Text style={styles.label}>Sort By</Text>
      <Picker
        selectedValue={sort}
        onValueChange={setSort}
        style={styles.picker}
      >
        <Picker.Item label="Select Sort" value="" />
        {sortBy.map((s) => (
          <Picker.Item key={s} label={s} value={s} />
        ))}
      </Picker>
      <Text style={styles.label}>Order By</Text>
      <Picker
        selectedValue={order}
        onValueChange={setOrder}
        style={styles.picker}
      >
        <Picker.Item label="Select Order" value="" />
        {orderBy.map((o) => (
          <Picker.Item
            key={o}
            label={o === 'desc' ? 'Descending order' : 'Ascending order'}
            value={o}
          />
        ))}
      </Picker>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsFab} onPress={openSettings}>
        <Text style={styles.settingsIcon}>⚙️</Text>
      </TouchableOpacity>
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
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  picker: {
    marginBottom: 8,
  },
  searchButton: {
    backgroundColor: '#01d277',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
