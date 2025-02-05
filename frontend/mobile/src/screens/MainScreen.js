/* page with Map and tags
    see figma for reference
*/

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; 
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios';

const MainScreen = () => {
    const [pubs, setPubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentLocation, setCurrentLocation] = useState(null);
    const navigation = useNavigation();

    {/* Get current location */}
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

    {/* Fetch pub data */}
    // useEffect(() => {
    //     fetchPubs();
    // }, []);

    // const fetchPubs = async () => {
    //     try {
    //       const response = await axios.get('http://localhost:5000/pubs'); // change to appropriate url
    //       setPubs(response.data);
    //     } catch (error) {
    //       console.error('Error fetching pubs:', error);
    //       Alert.alert('Error', 'Failed to load pub locations.');
    //     } finally {
    //       setLoading(false);
    //     }
    // };

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
                {/* Current location marker */}
                {currentLocation && (
                    <Marker
                    coordinate={currentLocation}
                    title='You are here'
                    pinColor='blue'
                    tappable='false'
                    />
                )}
                {/* Pub markers */}
                {/* {pubs.map((pub) => (
                    <Marker
                    key={pub.id}
                    coordinate={{ latitude: pub.latitude, longitude: pub.longitude }}
                    title={pub.name}
                    />
                ))} */}
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


/* NOTES on flexbox
flexDirection: 'row' --> could be used for the tags above the map on main page
justifyContent: 'space-between' or 'space-around' --> evenly spaces the items within the parent container
flex: 1 --> on all children will have them all share the available space equally
absoluteFill --> allow a child to expand and fill up parent container

navigator: also use drawerNavigator to get the burger menu on the side?
*/