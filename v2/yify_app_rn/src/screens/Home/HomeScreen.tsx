import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Text style={styles.icon}>🔍</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Browser for YIFY (Yts)</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Popover')}>
          <Text style={styles.icon}>⋮</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Page1')}
        >
          <Text style={styles.tabText}>LATEST</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Page2')}
        >
          <Text style={styles.tabText}>TOP RATED</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Page3')}
        >
          <Text style={styles.tabText}>SAVED</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#01d277',
  },
  icon: {
    fontSize: 28,
    color: '#fff',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  tab: {
    padding: 12,
    backgroundColor: '#e0f7ef',
    borderRadius: 8,
  },
  tabText: {
    fontSize: 16,
    color: '#01d277',
    fontWeight: 'bold',
  },
});
