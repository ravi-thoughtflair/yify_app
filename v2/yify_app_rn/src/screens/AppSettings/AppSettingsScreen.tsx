import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MODES = [
  { label: 'On', value: 'on' },
  { label: 'Off', value: 'off' },
  { label: 'Automatic on Sunset', value: 'auto' },
];

export default function AppSettingsScreen() {
  const [mode, setMode] = useState('off');

  useEffect(() => {
    AsyncStorage.getItem('mode').then((res) => {
      setMode(res || 'off');
    });
  }, []);

  const showMode = async (selectedMode: string) => {
    setMode(selectedMode);
    await AsyncStorage.setItem('mode', selectedMode);
    Alert.alert('Configured!', `Theme mode set to ${selectedMode}`);
    // Optionally, trigger theme change here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.listHeader}>Night Mode</Text>
      {MODES.map((m) => (
        <TouchableOpacity
          key={m.value}
          style={[styles.radioItem, mode === m.value && styles.selectedRadio]}
          onPress={() => showMode(m.value)}
        >
          <Text style={styles.radioLabel}>{m.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listHeader: {
    fontSize: 18,
    marginBottom: 12,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedRadio: {
    backgroundColor: '#e0f7ef',
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
});
