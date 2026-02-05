import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import SurveyScreen from './src/screens/SurveyScreen';
import DictionaryScreen from './src/screens/DictionaryScreen';
import TranslatorScreen from './src/screens/TranslatorScreen';

const Tab = createBottomTabNavigator();

// 간단한 아이콘 컴포넌트 (이모지 사용)
const TabIcon = ({ icon }) => <Text style={{ fontSize: 24 }}>{icon}</Text>;

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#4A90D9',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          headerStyle: {
            backgroundColor: '#4A90D9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
            headerTitle: '보험쉽게',
            tabBarIcon: () => <TabIcon icon="🏠" />,
          }}
        />
        <Tab.Screen
          name="Survey"
          component={SurveyScreen}
          options={{
            title: '맞춤추천',
            headerTitle: '라이프스타일 설문',
            tabBarIcon: () => <TabIcon icon="📋" />,
          }}
        />
        <Tab.Screen
          name="Dictionary"
          component={DictionaryScreen}
          options={{
            title: '용어사전',
            headerTitle: '쉬운 보험 용어',
            tabBarIcon: () => <TabIcon icon="📖" />,
          }}
        />
        <Tab.Screen
          name="Translator"
          component={TranslatorScreen}
          options={{
            title: '약관번역',
            headerTitle: '약관 쉽게 읽기',
            tabBarIcon: () => <TabIcon icon="📄" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
