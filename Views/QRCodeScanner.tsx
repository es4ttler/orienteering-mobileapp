/*import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRCodeScannerScreen = () => {
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  const onScanSuccess = (e) => {
    setScanned(true);
    setScannedData(e.data);
  };

  const handlePressScanAgain = () => {
    setScanned(false);
  };

  return (
    <View style={styles.container}>
      {!scanned ? (
        <QRCodeScanner
          onRead={onScanSuccess}
          flashMode={RNCamera.Constants.FlashMode.auto}
          topContent={<Text style={styles.centerText}>Scannez le QR Code</Text>}
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable} onPress={() => setScanned(true)}>
              <Text style={styles.buttonText}>Scanner à nouveau</Text>
            </TouchableOpacity>
          }
        />
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>QR Code Scanné !</Text>
          <Text style={styles.resultData}>{scannedData}</Text>
          <TouchableOpacity style={styles.buttonTouchable} onPress={handlePressScanAgain}>
            <Text style={styles.buttonText}>Scanner à nouveau</Text>
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

export default QRCodeScannerScreen;*/
