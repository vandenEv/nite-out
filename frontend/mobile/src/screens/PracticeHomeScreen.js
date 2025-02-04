import React, { useEffect } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";


const PracticeHome = ({ navigation }) => {
  useEffect(() => {
    console.log("PracticeHome component mounted");
  }, []);

  return (
      <View>
        <Text style={styles.text}>Hi there!</Text>
        <Button 
          onPress={() => navigation.navigate('Main')}
          title="Go to components demo" 
        />
        <Button 
          onPress={() => navigation.navigate('GeneralRegistration')}
          title="Go to general registration screen" 
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    text: {
      fontSize: 30,
    },
  });
  
  export default PracticeHome;
  
  