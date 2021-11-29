import React, {useState, useEffect} from 'react';
import {View, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const API_KEY ='8fbf7d93eaa27eae0f86b576e3a148d2';
const img = require('../../assets/playa-3.png');

import Styles from '../../components/Styles';
import StylesButton from '../../components/SylesButton';
import DateTime from '../../components/CurrentDate/DateTime';
import WeatherScroll from '../../components/CurrentDate/WeatherScroll';
import Home from '../Home/Home';

import firebase from '../../connection/firebase';

const ClimeListCity = (props) => {
    const initialTown = {
      id: "",
      country: "",
      city: "",
    };

    const [dataCityClime, setDataCityClime] = useState({});
    const [town, setTown] = useState(initialTown);    
    const [loading, setLoading] = useState(true);
    let listita = [];

    const getTownById = async (id) => {    
      const dbRef = firebase.db.collection("dbCity").doc(id);
      const doc = await dbRef.get();
      const town = doc.data();
      setTown({ ...town, id: doc.id });
      setLoading(false);    
      if(town){
        fetchDataCityApi(town.country, town.city);
      }
    };

    useEffect(() => {  
      getTownById(props.route.params.townId); 
   }, []);

    useEffect(() => {
      (async () => {
        await AsyncStorage.getItem('selectCityToList').then(data => {
          listita = JSON.parse(data);
        });
        
        try {
          if(listita){
            fetchDataCityApi(listita.country, listita.city);
          }
        } catch (error) {
          <EmptyList message={'La ciudad no existe o es incorrecta.'}/>
        }          
        
      })();
    }, [])

    const fetchDataCityApi = (country, city) => {
      try {
        if(country && city) {
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data);
            fetchDataCityCoord(data.coord.lon, data.coord.lat);           
          })        
        }        
      } catch (error) {
        <EmptyList message={'No se ha encontrado ciudad y pais.'}/>
      }        
    }
    
    const fetchDataCityCoord = (lon, lat) => {
      try {
        if(lon && lat) {
          fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data);
            setDataCityClime(data);
          })
        }
      } catch (error) {
        <EmptyList message={'No se ha encontrado la latitud y longitud de la ciudad seleccionada.'}/>
      }
    }

    return (
        <View style={Styles.container}>
            <ImageBackground source={img} style={Styles.imageHome}>
              <DateTime current={dataCityClime.current} timezone={dataCityClime.timezone} lat={dataCityClime.lat} lon={dataCityClime.lon}/>
              <WeatherScroll weatherData={dataCityClime.daily}/>
              <View>
                <TouchableOpacity style={StylesButton.btnCity} >
                    <Icon name="home" size={30} color="#E5097F" 
                    onPress={() => props.navigation.navigate(Home)}/>   
                </TouchableOpacity>
              </View>
            </ImageBackground>
        </View>
    )
}

const EmptyList = ({message}) => {
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

export default ClimeListCity;