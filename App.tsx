import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/screens/main';
import AuthScreen from './src/screens/auth';
import RestaurantsScreen from './src/screens/restaurants'
import { RootStackParamList } from './src/screens/RootStackParams';
import { ApolloProvider } from '@apollo/client';
import client from './src/apolloClient';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}