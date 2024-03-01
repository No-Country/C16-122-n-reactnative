import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import Login from './screens/Login/Login';
import Welcom from './screens/Welcom/Welcom';
import SignUp from './screens/SignUp/SignUp';
import SelectPerfil from './screens/SelectPerfil/SelectPerfil.jsx';
import Salon from './screens/Salon/Salon.jsx';
import Password from './screens/Password/Password';

import Order from './screens/Order/Order.jsx';
import ProfilePin from './screens/ProfilePin/ProfilePin.jsx';
import Menu from './screens/Menu/Menu';
import Receipt from './screens/Receipt/Receipt';
const Stack = createStackNavigator();

function Tabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcom" component={Welcom} />
      <Stack.Screen
        options={{
          headerStyle: styles.headerScreen,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerStyle: styles.headerScreen,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen
        options={{
          headerStyle: styles.headerScreen,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Password"
        component={Password}
      />
      <Stack.Screen name="SelectPerfil" component={SelectPerfil} />
      <Stack.Screen name="Salon" component={Salon} />
      <Stack.Screen
        options={{
          headerStyle: styles.headerScreen,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Receipt"
        component={Receipt}
      />

      <Stack.Screen
        options={{
          headerStyle: styles.headerScreen,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Menu"
        component={Menu}
      />
      <Stack.Screen
        options={{
          headerStyle: styles.headerScreen,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Order"
        component={Order}
      />

      <Stack.Screen name="ProfilePin" component={ProfilePin} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerScreen: {
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
  },
});

export default Tabs;
