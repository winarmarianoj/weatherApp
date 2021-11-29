import React, {useState} from 'react';
import {View, Text, TextInput, ImageBackground, Alert, TouchableOpacity} from 'react-native';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../../connection/firebase';

import Styles from '../../components/Styles';
import StylesButton from '../../components/SylesButton';
import ClimeListCity from '../ClimeListCity/ClimeListCity';
import CitiesList from '../CitiesList/CitiesList';
const img = require('../../assets/ciudades-1.png');
  
const CitiesSchema = Yup.object().shape({
    id: Yup.string()
    .min(2, 'Too Short!'),
    country: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required'),
    city: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required'),
  });

const CreateCities = (props) => {
    const [town, setTown] = useState(CitiesSchema)

    const handleChangeText = (value, name) => {
        setTown({ ...town, [name]: value });
      };

    const handlerSubmit = async () => {
        if(town.city === ""){
            Alert.alert('Please provide name city!');
        }
        try {            
            await firebase.db.collection('dbCity').add({            
                country: town.country,
                city: town.city,
                createAt: new Date(),
             });
             console.log('Se agrego correctamente la ciudad' + town.city);              
             props.navigation.navigate("CitiesList");
        } catch (error) {
            console.log('no se pudo agregar' + town.city);              
        }   
    }

    return (
        <View style={Styles.containerTakeDataCity}> 
            <ImageBackground source={img} style={Styles.imageCities}>           
                <View>
                    <View style={Styles.form_group}>
                        <Text style={StylesButton.btnText}>Country</Text>
                        <TextInput style={Styles.form_input} placeholder="Add Country"                            
                        onChangeText={(value) => handleChangeText(value, 'country')}
                        multiline={true}
                        value={town.country}/>                    
                    </View>
                    <View style={Styles.form_group}>
                        <Text style={StylesButton.btnText}>City</Text>
                        <TextInput style={Styles.form_input} placeholder="Add City"
                        onChangeText={(value) => handleChangeText(value, 'city')}
                        multiline={true}
                        value={town.city}/>                        
                    </View>
                    <TouchableOpacity style={StylesButton.btnAddCity}
                            activeOpacity={0.7} onPress={() => handlerSubmit()}  >                    
                            <Text style={StylesButton.btnTextAddCity}>ADD CITY</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={StylesButton.btnCity} >
                    <Icon name="weather-sunset" size={30} color="#E5097F" 
                    onPress={() => navigation.navigate(ClimeListCity)}/>   
                </TouchableOpacity>
                <TouchableOpacity style={StylesButton.btnCities} >
                    <Icon name="home-city" size={30} color="#E5097F" 
                    onPress={() => props.navigation.navigate(CitiesList)}/>   
                </TouchableOpacity>                                             
                
            </ImageBackground>            
        </View>
    )

};

export default CreateCities;
