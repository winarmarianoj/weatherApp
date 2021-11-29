import React, { useEffect, useState } from "react";
import {ScrollView, Button, View, ActivityIndicator, StyleSheet} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from '../../connection/firebase';
import Styles from "../../components/Styles";

const Action = (props) => {
  const initialTown = {
    id: "",
    country: "",
    city: "",
  };

  const [town, setTown] = useState(initialTown);
  const [loading, setLoading] = useState(true);

  const handleChangeText = (value, prop) => {
    setTown({ ...town, [prop]: value });
  };

  const getTownById = async (id) => {    
    const dbRef = firebase.db.collection("dbCity").doc(id);
    const doc = await dbRef.get();
    const town = doc.data();
    setTown({ ...town, id: doc.id });
    setLoading(false);    
  };

  const deleteCity = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("dbCity")
      .doc(props.route.params.townId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("CitiesList");
  };

  const updateTown = async () => {
    const cityRef = firebase.db.collection("dbCity").doc(town.id);
    await cityRef.set({
      id: town.id,
      country: town.country,
      city: town.city,
    });
    setTown(initialTown);
    props.navigation.navigate("CitiesList");
  };

  const climeTown = async () => {    
    const dbRef = firebase.db
      .collection("dbCity")
      .doc(props.route.params.townId);
    props.navigation.navigate("ClimeListCity", {
      townId: town.id,
    });
  }

  useEffect(() => {  
     getTownById(props.route.params.townId); 
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Country"
          autoCompleteType="country"
          style={Styles.form_input}
          value={town.country}
          onChangeText={(value) => handleChangeText(value, 'country')}
        />
      </View>
      <View>
        <TextInput
          placeholder="City"
          autoCompleteType="city"
          style={Styles.form_input}
          value={town.city}
          onChangeText={(value) => handleChangeText(value, 'city')}
        />
      </View>      
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => deleteCity()}
          color="#FF334F"
        />
      </View>
      <View style={styles.btn}>
        <Button title="Update" onPress={() => updateTown()} color="#10923D" />
      </View>
      <View style={styles.btn}>
        <Button title="Search Clime City" onPress={() => climeTown()} color="#335BFF" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default Action;