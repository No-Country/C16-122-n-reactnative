import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from 'react-native';

const MenuView = () => {
  return (
    <View style={styles.MenuContainer}>
      <TouchableOpacity style={styles.containers}>
        <Text style={styles.text}>Salon</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containers}>
        <Text style={styles.text}>Productos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containers}>
        <Text style={styles.text}>Reportes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containers}>
        <Text style={styles.text}>Empleados</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containers}>
        <Text style={styles.text}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  MenuContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#7131fa',
    width: 200,
  },
  containers: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MenuView;
