import React, { useState, useEffect } from "react";
import { Button, ImageBackground, View} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import firebase from '../../connection/firebase';

import Styles from '../../components/Styles';
const img = require('../../assets/ciudades-1.png');

const CitiesList = (props) => {
  const [towns, setTowns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( async () => {
    firebase.db.collection("dbCity").onSnapshot((querySnapshot) => {
      const cities = [];
      querySnapshot.docs.forEach((doc) => {
        const { id, country, city } = doc.data();
        cities.push({
          id: doc.id,
          country,
          city,
        });
      });
      setTowns(cities);
    });
  }, []);

  return (
    <View style={Styles.containerTakeDataCity}> 
    <ImageBackground source={img} style={Styles.imageCities}>
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateCities")}
        title="Create Cities"
      />
      {towns.map((town) => {
        return (
          <ListItem
            key={town.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("Action", {
                townId: town.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "../../assets/playa-mar-cancun-arena.png",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{town.country}</ListItem.Title>
              <ListItem.Subtitle>{town.city}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
    </ImageBackground>
    </View>
  );
};

export default CitiesList;