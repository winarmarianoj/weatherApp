import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, Animated, StyleSheet} from 'react-native';
import photoClime from './assets/nube.png';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Home from './screens/Home/Home';
import Cities from './screens/Cities/Cities';
import City from './screens/City/City';
import ClimeCity from './screens/ClimeCity/ClimeCity';
import ClimeListCity from './screens/ClimeListCity/ClimeListCity';
import Styles from './components/Styles';
import ListCities from './screens/ListCities/ListCities';

const Stack = createNativeStackNavigator();

export default function App() {
  const [animated, setAnimated] = useState(false);
  const [show] = useState(new Animated.Value(0));
  const [position] = useState(new Animated.Value(700));
  const [font] = useState(new Animated.Value(1));

  useEffect(() => {    
    Animated.parallel([
      Animated.timing(show, {
        toValue: 1,
        duration: 2500,
        delay: 3000,
        useNativeDriver: false,
      }),
      Animated.timing(position, {
        toValue: -700,
        duration: 6000,
        useNativeDriver: false,
      }),
    ]).start(() => {
        Animated.timing(font, {
          toValue: 200,
          duration: 1000,
          useNativeDriver: false,
        }).start(() => setAnimated(true));
      });      
  }, [])
  //<Animated.Image style={[Styles.imageApp, {top: position}]} source={photoClime}/>
  if(!animated)
  return (
    <>
      <StatusBar animated={true} backgroundColor="#142950" barStyle="light-content" />
      <View style={Styles.containerHome}>        
        <Animated.Text style={[Styles.textApp, {opacity: show, transform: [{scale: font}]}]}>Welcome to WeatherApp</Animated.Text>
      </View>
    </>
  );
  return (<GestureHandlerRootView style={{flex: 1}}>
    <StatusBar animated={true} backgroundColor="#142950" barStyle="light-content"/>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{title: "Clime Now"}} />  
        <Stack.Screen name="City" component={City} options={{title: "New Only City"}} /> 
        <Stack.Screen name="ClimeCity" component={ClimeCity} options={{title: "Clime City"}} />
        <Stack.Screen name="Cities" component={Cities} options={{title: "News Cities"}} />         
        <Stack.Screen name="ListCities" component={ListCities} options={{title: "List Cities"}} />
        <Stack.Screen name="ClimeListCity" component={ClimeListCity} options={{title: "Clime List Cities"}} />
      </Stack.Navigator>
    </NavigationContainer>
  </GestureHandlerRootView>
  )
    
};
