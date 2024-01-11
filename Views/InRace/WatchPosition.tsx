import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Button, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import LogService from '../../Services/LogService'

export default function WatchPosition() {

  /*const hasPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Geolocation permission already granted');
        return true;
      } else {
        console.log('Geolocation permission not granted');
        return false;
      }
    } catch (error) {
      console.error('Error checking geolocation permission:', error);
    }
  };*/

  const watchPosition = () => {
      //check that subscriptionId is clear
      if (subscriptionId!==null){
            clearWatch();
        }

       //very permissions
      //if (hasPermission()){
            try {
            //get watch subscription id
              const watchID = Geolocation.watchPosition(
                (position) => {
                  console.log('watchPosition', JSON.stringify(position));
                  const metadata=[1,1,position.coords.longitude,position.coords.latitude,position.coords.altitude]
                  const logData={
                          datetime:Date.now(),
                          type:'Log',
                          module:'Runner',
                          metadata:metadata,
                          message:"Test"};
                  LogService.createLog(logData);
                  setPosition(position);
                },
                (error) => Alert.alert('WatchPosition Error', JSON.stringify(error)),
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
              );

              setSubscriptionId(watchID);

            } catch (error) {
              Alert.alert('WatchPosition Error', JSON.stringify(error));
            }
      /*}
      else{
      console.log("else");}*/


  };

  const clearWatch = () => {

    if (typeof subscriptionId ==="number") {
        Geolocation.clearWatch(subscriptionId);

        setSubscriptionId(null);
        setPosition(null);
      }
  };

  const [position, setPosition] = useState<{} | null >(null);
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
  useEffect(() => {
    return () => {
        config= {skipPermissionRequests:false, locationProvider: 'playServices'};
        Geolocation.setRNConfiguration(config);
      clearWatch();
    };
  }, []);

  return (
    <View style={styles.container}>
          {subscriptionId !== null ? (
            <Button title="Stop Location" onPress={clearWatch} />
          ) : (
            <Button title="Start Location" onPress={watchPosition} />
          )}

          {(subscriptionId !== null && position===null) && (
          <Text style={styles.title}>Loading ... </Text>)}
          {position && position.coords && (
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Latitude: </Text>
              <Text>{position.coords.latitude}</Text>
              <Text style={styles.title}>Longitude: </Text>
              <Text>{position.coords.longitude}</Text>
              <Text style={styles.title}>Altitude: </Text>
              <Text>{position.coords.altitude}</Text>
            </View>
          )}
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonContainer: {
        marginVertical: 20,
      },
      infoContainer: {
        marginVertical: 20,
      },
      title: {
        fontWeight: '500',
      },
    });