/* page with Map and tags
    see figma for reference
*/

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; 
import { useNavigation } from '@react-navigation/native'; 

const MainScreen = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const getLocation = async () => {
            try {
                // Request permission for accessing location
                const { status } = await Location.requestForegroundPermissionsAsync();
    
                if (status === 'granted') {
                    const location = await Location.getCurrentPositionAsync({});
                    setCurrentLocation(location.coords); // Set the location coordinates
                } else {
                    alert('Location permission denied!');
                }
            } catch (error) {
                console.error(error);
            }
        };

        getLocation();
    }, []);

    const mapPressed = (e) => {
        if (currentLocation) {
            navigation.navigate('Map', { coords: currentLocation });
        } else {
            return <Text>Loading your location...</Text>; 
        }
    };

    if (!currentLocation) {
        return <Text>Loading...</Text>; 
    }

    return (
        <View style={Styles.container}>
            <MapView
                style={Styles.map}
                initialRegion={{
                    latitude:  currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={mapPressed} 
            >
                <Marker coordinate={currentLocation} />
            </MapView>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
      width: '95%',
      height: '50%',
      marginTop: -200
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    }
  });

export default MainScreen;