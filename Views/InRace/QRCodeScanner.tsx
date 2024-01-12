import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ToastAndroid,Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';
import BeaconService from '../../Services/BeaconService'

const QRCodeScannerScreen = () => {
  const [openedWindow, setOpenedWindow] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [position,setPosition]=useState({});

const getCurrentLocation = (dataScanned) => {
  Geolocation.getCurrentPosition(
    (position) => {
      console.log('Current position:', position);
      setPosition(position);

      // Your logic that depends on the position goes here
      handlePosition(position,dataScanned);
    },
    (error) => {
      console.error('Error getting current location:', error);
      Alert.alert("Some issue getting location, please retry");
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
};

const handlePosition = (position, dataScanned) => {
  if (position && dataScanned) {
    const posXYZ = {
      longitude:position?.coords.longitude,
      latitude:position?.coords.latitude,
      altitude:position?.coords.altitude,
    };

    const data = {
      id_race: 1,
      id_runner: 1,
      beacon_name: dataScanned,
      runner_pos_GPS: posXYZ,
    };

    BeaconService.checkBeacon(data)
      .then((res) => {
      console.log(res);
        Alert.alert('Validé !');
        setPosition({});
      })
      .catch((error) => {
        Alert.alert('Echec',error.error);
      });
  }
};

const onScanSuccess = (e) => {
  setOpenedWindow(false);
  setScannedData(e.data);

  getCurrentLocation(e.data);
};

  const handlePressScanAgain = () => {
    setOpenedWindow(true);
  };

  return (
    <View style={styles.container}>
      {openedWindow ? (
        <QRCodeScanner
          onRead={onScanSuccess}
          flashMode={RNCamera.Constants.FlashMode.auto}
          topContent={<Text style={styles.centerText}>Scannez le QR Code</Text>}
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable} onPress={() => setOpenedWindow(false)}>
              <Text style={styles.buttonText}>Fermer le scan</Text>
            </TouchableOpacity>
          }
        />
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultData}>{scannedData ? `Dernière balise scannée : ${scannedData}` : null}</Text>
          <TouchableOpacity style={styles.buttonTouchable} onPress={handlePressScanAgain}>
            <Text style={styles.buttonText}>Scanner la balise</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resultData: {
    fontSize: 18,
    marginBottom: 32,
  },
  buttonTouchable: {
    padding: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default QRCodeScannerScreen;
