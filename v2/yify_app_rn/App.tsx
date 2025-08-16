import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AboutScreen from './src/screens/About/AboutScreen';
import AdvanceSearchResultsScreen from './src/screens/AdvanceSearchResults/AdvanceSearchResultsScreen';
import AdvancedSearchScreen from './src/screens/AdvancedSearch/AdvancedSearchScreen';
import AppSettingsScreen from './src/screens/AppSettings/AppSettingsScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import MovieDetailsScreen from './src/screens/MovieDetails/MovieDetailsScreen';
import Page1Screen from './src/screens/Page1/Page1Screen';
import Page2Screen from './src/screens/Page2/Page2Screen';
import Page3Screen from './src/screens/Page3/Page3Screen';
import SearchScreen from './src/screens/Search/SearchScreen';
import SubTitleSearchSubsSceneScreen from './src/screens/SubTitleSearchSubsScene/SubTitleSearchSubsSceneScreen';
import SubsceneListScreen from './src/screens/SubsceneList/SubsceneListScreen';
import SubtitleSearchScreen from './src/screens/SubtitleSearch/SubtitleSearchScreen';
import SubtitleTabsScreen from './src/screens/SubtitleTabs/SubtitleTabsScreen';
import SubtitlesListScreen from './src/screens/SubtitlesList/SubtitlesListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen
          name="AdvanceSearchResults"
          component={AdvanceSearchResultsScreen}
        />
        <Stack.Screen name="AdvancedSearch" component={AdvancedSearchScreen} />
        <Stack.Screen name="AppSettings" component={AppSettingsScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        <Stack.Screen name="Page1" component={Page1Screen} />
        <Stack.Screen name="Page2" component={Page2Screen} />
        <Stack.Screen name="Page3" component={Page3Screen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen
          name="SubTitleSearchSubsScene"
          component={SubTitleSearchSubsSceneScreen}
        />
        <Stack.Screen name="SubsceneList" component={SubsceneListScreen} />
        <Stack.Screen name="SubtitleSearch" component={SubtitleSearchScreen} />
        <Stack.Screen name="SubtitleTabs" component={SubtitleTabsScreen} />
        <Stack.Screen name="SubtitlesList" component={SubtitlesListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
