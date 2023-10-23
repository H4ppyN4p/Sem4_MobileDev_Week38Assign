import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//imports firebase
import { app, database } from './firebase'
import { collection, addDoc } from 'firebase/firestore';
import { storage } from './firebase'
import { ref, uploadBytes } from 'firebase/storage'

//Components
import HomePage from './components/HomePage'
import NotesPage from './components/NotesPage';

const App = () => {

  //alert(JSON.stringify(database, null, 4))

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='Home' component={HomePage} />

        <Stack.Screen name='Notes' component={NotesPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
