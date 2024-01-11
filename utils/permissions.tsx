import {PermissionsAndroid, Alert} from 'react-native'
import {useState} from 'react'

const checkAllPermissions = async () => {
const [result,setResult]=useState(true);
const [error,setError]=useState({});

    try {
      const allPermissions = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        ]
      );


      for (const [permissionName, status] of Object.entries(allPermissions)) {
        if (status  !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log(`Permission ${permissionName} not granted`);
          setResult(false);
          setError([...error,`Permission ${permissionName} is required.`])
          console.log(error);
        }
        else{
        console.log(`Permission ${permissionName} granted`);
        }
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
     return {result,error};
  };



export default checkAllPermissions;