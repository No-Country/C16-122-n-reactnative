import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import Login from './screens/Login/Login';
import Welcom from './screens/Welcom/Welcom';
import SignUp from './screens/SignUp/SignUp';
import SelectPerfil from './screens/SelectPerfil/SelectPerfil.jsx';
import ManageProfiles from './screens/ManageProfiles/ManageProfiles.jsx';
import Salon from './screens/Salon/Salon.jsx';
import Password from './screens/Password/Password';
import Order from './screens/Order/Order.jsx';
import ProfilePin from './screens/ProfilePin/ProfilePin.jsx';
import Menu from './screens/Menu/Menu.jsx';
import OrderDetail from './screens/orderDetail/orderDetail.jsx';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
      <Stack.Screen name="SelectPerfil" component={SelectPerfil} options={{ headerShown: false }} />
      <Stack.Screen name="ManageProfile" component={ManageProfiles} options={{ headerShown: false }} />
      <Stack.Screen name="Salon" component={Salon} options={{ headerShown: false }}/>
      <Stack.Screen
        options={{ headerShown: false }}
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
      <Stack.Screen name="Detalle del Pedido" component={OrderDetail} />
    
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
