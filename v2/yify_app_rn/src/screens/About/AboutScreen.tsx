import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

export default function AboutScreen() {
  const opentmdb = () => {
    Linking.openURL('https://www.themoviedb.org/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </Text>
        <Text style={styles.cardText}>
          TMDb respects the rights of copyright holders and publishers and
          requires all users to confirm they own the copyright or have
          permission from the copyright holder to upload content. We comply with
          the Digital Millennium Copyright Act (DMCA) and expeditiously remove
          content when properly notified, unless it reasonably appears to us
          that the content does not infringe upon copyright. Please note,
          however, that under Section 512(f) any person who knowingly materially
          misrepresents that material or activity is a copyright infringement
          may be subject to liability for damages. You should educate yourself
          as to whether content does, in fact infringe upon your copyright, or
          whether, for instance "fair use" under 17 U.S.C. §107 applies. If you
          are unsure whether the content you are reporting is infringing your
          legal rights, you may wish to seek legal guidance. Keep in mind that
          submitting intentionally misleading reports of infringement may be
          punishable under the Digital Millennium Copyright Act (DMCA) in the
          United States or similar laws in other countries.
        </Text>
      </View>
      <TouchableOpacity style={styles.tmdblogo} onPress={opentmdb}>
        {/* SVG logo simplified for brevity. You can paste the full SVG if needed. */}
        <Svg width="200" height="60" viewBox="0 0 407.34 160.81">
          <Polygon
            points="50.38 102.47 57.32 102.47 57.32 74.71 65.96 74.71 65.96 67.82 41.74 67.82 41.74 74.71 50.38 74.71 50.38 102.47"
            fill="#01d277"
          />
          {/* ...other SVG elements... */}
        </Svg>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  tmdblogo: {
    width: '40%',
    marginLeft: '30%',
    alignItems: 'center',
    marginTop: 16,
  },
});
