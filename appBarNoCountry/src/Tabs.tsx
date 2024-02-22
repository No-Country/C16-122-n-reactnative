import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import Login from './screens/Login/Login';
import Welcom from './screens/Welcom/Welcom';
import SignUp from './screens/SignUp/SignUp';
import SelectPerfil from './screens/SelectPerfil/SelectPerfil.jsx';
import Salon from './screens/Salon/Salon.jsx';
import Password from "./screens/Password/Password"
import AdminPinScreen from './screens/AdminPinScreen/AdminPinScreen.jsx';
import Comanda from './screens/Comanda/Comanda.jsx';
import Menu from './screens/Menu/Menu.jsx';
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
      <Stack.Screen name="AdminPinScreen" component={AdminPinScreen} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Comanda" component={Comanda} />
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
