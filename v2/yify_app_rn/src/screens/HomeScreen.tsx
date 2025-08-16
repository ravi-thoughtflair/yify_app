import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import { SuperTabs } from 'react-native-super-tabs'; // Placeholder for tab library
// import { SocialShare } from '../providers/SocialShare'; // Placeholder for sharing logic

const PLAYSTORE_URL =
  'https://play.google.com/store/apps/details?id=com.project.yifybrowserandsubs';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [badgeCount, setBadgeCount] = useState<number>(0);
  const [bookmarkCount, setBookmarkCount] = useState<number>(0);

  const search = () => {
    navigation.navigate('Search');
  };

  const openPopover = () => {
    Alert.alert('Popover', 'Show more options here.');
  };

  const shareApp = async () => {
    try {
      await Linking.openURL(PLAYSTORE_URL);
      // Optionally use Expo Sharing or a library for native share
      // SocialShare.share(PLAYSTORE_URL);
    } catch (e) {
      Alert.alert('Share failed', 'Could not share the app.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={search} style={styles.iconButton}>
          <Text style={styles.icon}>🔍</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Browser for YIFY (Yts)</Text>
        <TouchableOpacity onPress={openPopover} style={styles.iconButton}>
          <Text style={styles.icon}>⋮</Text>
        </TouchableOpacity>
      </View>
      {/* Replace below with a tab library for LATEST, TOP RATED, SAVED */}
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}>
          <Text>LATEST</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text>TOP RATED</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text>SAVED</Text>
          {bookmarkCount > 0 && (
            <View style={styles.badge}>
              <Text>{bookmarkCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.shareButton} onPress={shareApp}>
        <Text>Share App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#eee',
  },
  iconButton: {
    padding: 8,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  tab: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 6,
    marginLeft: 4,
  },
  shareButton: {
    marginTop: 32,
    alignSelf: 'center',
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
});
