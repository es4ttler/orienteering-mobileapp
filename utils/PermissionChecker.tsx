import React, { useState, useEffect } from 'react';
import { View, Alert, Button, PermissionsAndroid } from 'react-native';

const PermissionsPage = () => {
  const [requestedPermissions, setRequestedPermissions] = useState([]);

  const requestPermissions = async () => {
    try {
      const grantedPermissions = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]
      );

      for (const permission of grantedPermissions) {
        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          console.log(`Permission ${permission} granted`);
          setRequestedPermissions([...requestedPermissions, permission]);
        } else {
          console.log(`Permission ${permission} not granted`);
          setRequestedPermissions([...requestedPermissions, permission]);
          Alert.alert('Permission denied', `Permission ${permission} is required.`);
        }
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  const checkAllPermissions = async () => {
    try {
      const allPermissions = await PermissionsAndroid.checkMultiplePermissions(
        [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]
      );

      for (const permission of allPermissions) {
        if (!permission) {
          console.log(`Permission ${permission.permissionName} not granted`);
          setRequestedPermissions([...requestedPermissions, permission.permissionName]);
          Alert.alert('Permission required', `Permission ${permission.permissionName} is required.`);
        } else {
          console.log(`Permission ${permission.permissionName} granted`);
          setRequestedPermissions([...requestedPermissions, permission.permissionName]);
        }
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  const onPressRequestPermissions = () => {
    if (requestedPermissions.length === 0) {
      Alert.alert('Permissions granted', 'All required permissions are granted.');
    } else {
      requestPermissions();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Request all permissions" onPress={onPressRequestPermissions} />
    </View>
  );
};

export default PermissionsPage;
