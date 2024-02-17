import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Text } from 'tamagui';
import Navbar from '../../components/Navbar/Navbar';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

const Stack = createStackNavigator();

function Salon() {
  return (
    <View>
    <Navbar/>
    <Text>SALON</Text>
    <Text>SALON</Text>
    </View>
  );
}

export default Salon;