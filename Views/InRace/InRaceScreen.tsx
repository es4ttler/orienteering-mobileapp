
import {View,Text} from 'react-native'

import WatchPosition from './WatchPosition';
import QRCodeScannerScreen from './QRCodeScanner'

import checkAllPermissions from '../../utils/permissions';

export default function InRaceScreen() {

const isGranted  = checkAllPermissions();

    return (
       <View>
           {isGranted &&(
             <>
               <Text>Lastname Firstname</Text>
               <Text>Bib number</Text>
               <WatchPosition />
               <Text></Text>
               <QRCodeScannerScreen />
             </>
           ) }
           {!isGranted &&(
             <Text>Permissions not granted</Text>
           )}
         </View>
    );
};