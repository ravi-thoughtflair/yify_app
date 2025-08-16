import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import SubsceneListScreen from '../SubsceneList/SubsceneListScreen';
import SubtitlesListScreen from '../SubtitlesList/SubtitlesListScreen';

const Tab = createMaterialTopTabNavigator();

export default function SubtitleTabsScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="YIFY" component={SubtitlesListScreen} />
      <Tab.Screen name="SUBSCENE" component={SubsceneListScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
