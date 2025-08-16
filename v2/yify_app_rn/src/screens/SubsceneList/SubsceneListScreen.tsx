import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import { getSubSceneSubTitles, downloadSubsceneSubs } from '../../providers/yify-movies';

interface Subtitle {
  lang: string;
  name: string;
  link: string;
  downstart?: boolean;
  downcomplete?: boolean;
}

export default function SubsceneListScreen() {
  const navigation = useNavigation();
  const [sublist, setSublist] = useState<Subtitle[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Example: getSubSceneSubTitles(suburl).then(res => setSublist(res.down_links));
    setLoading(false);
  }, []);

  const downloadfile = (sub: Subtitle, index: number) => {
    // Example: downloadSubsceneSubs(sub.link)
    // Show spinner, then mark as complete
    const updated = [...sublist];
    updated[index].downstart = true;
    setSublist(updated);
    setTimeout(() => {
      updated[index].downstart = false;
      updated[index].downcomplete = true;
      setSublist([...updated]);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      {loading && (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#01d277" />
        </View>
      )}
      {msg && (
        <Text style={styles.emptyText}>
          Subtitles not found for this movie, Try after some time!
        </Text>
      )}
      {sublist.map((sub, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.lang}>{sub.lang}</Text>
          <Text style={styles.name}>{sub.name}</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              disabled={sub.downstart}
              onPress={() => downloadfile(sub, i)}
            >
              {sub.downstart ? (
                <ActivityIndicator size="small" color="#387ef5" />
              ) : sub.downcomplete ? (
                <Text style={styles.downloaded}>Downloaded!</Text>
              ) : (
                <Text style={styles.download}>Download</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  spinner: {
    alignItems: 'center',
    marginVertical: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 32,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  lang: {
    fontSize: 16,
    color: '#387ef5',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 8,
    backgroundColor: '#e0f7ef',
    borderRadius: 8,
  },
  download: {
    color: '#387ef5',
    fontWeight: 'bold',
  },
  downloaded: {
    color: 'green',
    fontWeight: 'bold',
  },
});
