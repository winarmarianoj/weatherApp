import React, {useState, useEffect} from 'react';
import {View, ImageBackground, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const API_KEY ='8fbf7d93eaa27eae0f86b576e3a148d2';
const img = require('../../assets/playa-2.png');

import Styles from '../../components/Styles';
import StylesButton from '../../components/SylesButton';
import DateTime from '../../components/CurrentDate/DateTime';
import WeatherScroll from '../../components/CurrentDate/WeatherScroll';
import Home from '../Home/Home';

const ClimeCity = ({navigation}) => {
    const [dataCityClime, setDataCityClime] = useState({});
    let listita = [];

    useEffect(() => {
      (async () => {
        await AsyncStorage.getItem('dbSimpleCity').then(data => {
          listita = JSON.parse(data);
        });
        
        try {
          if(listita){
            fetchDataCityApi(listita.country, listita.city);
          }
        } catch (error) {
          <NotCity message={'La ciudad no existe o es incorrecta.'}/>
        }          
        
      })();
    }, [])

    const fetchDataCityApi = (country, city) => {
      try {
        if(country && city) {
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`).then(res => res.json()).then(data => {
            fetchDataCityCoord(data.coord.lon, data.coord.lat);           
          })        
        }        
      } catch (error) {
        <NotCity message={'No se ha encontrado ciudad y pais.'}/>
      }            
    }
    
    const fetchDataCityCoord = (lon, lat) => {
      try {
        if(lon && lat) {
          fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            setDataCityClime(data);
          })
        }  
      } catch (error) {
        <NotCity message={'No se ha encontrado latitud y longitud.'}/>
      }
      AsyncStorage.removeItem('dbSimpleCity');
    }

    return (
        <View style={Styles.container}>
            <ImageBackground source={img} style={Styles.imageHome}>
              <DateTime current={dataCityClime.current} timezone={dataCityClime.timezone} lat={dataCityClime.lat} lon={dataCityClime.lon}/>
              <WeatherScroll weatherData={dataCityClime.daily}/>
              <TouchableOpacity style={StylesButton.btnText} >
                  <Icon name="home" size={30} color="#E5097F" 
                  onPress={() => navigation.navigate(Home)}/>   
              </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const NotCity = ({message}) => {
  return(
    <View style={Styles.container}>
        <ImageBackground source={img} style={Styles.imageHome}>
          <View>
              <View>
                <Text style={Styles.textApp}>{message}</Text>
              </View>
          </View>
        </ImageBackground>
    </View>
  )  
}

export default ClimeCity;