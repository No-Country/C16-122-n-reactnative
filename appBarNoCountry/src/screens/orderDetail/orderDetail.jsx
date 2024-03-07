import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

function OrderDetail({route}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {totalCuenta, filteredProducts, numberTable} = route.params;
  const selectedProducts = useSelector(
    state => state.reducers.selectedProducts,
  );

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  return (
    <View style={styles.orderContainer}>
         <Text>Recibo:</Text>
      <Text>Numero de Mesa: {numberTable}</Text>
      <Text>Fecha y hora:{currentDateTime.toLocaleString()}</Text>
      {filteredProducts &&
        filteredProducts.map((producto, index) => (
          <TouchableOpacity key={index}>
            <Text style={styles.typeFood}>
              -------------------------------------------------------------------------------------
            </Text>
            <Text style={styles.typeFood}>{producto.name}</Text>
         
            <Text style={styles.price}>${producto.price}</Text>
            <View>
              <Text>cantidad: {selectedProducts[producto.id]}</Text>
            </View>
            <Text style={styles.typeFood}>
              --------------------------------------------------------------------------------------
            </Text>
          </TouchableOpacity>
        ))}
      <View style={styles.footerContainer}>
        <Text style={styles.textTotal}>Total: ${totalCuenta}</Text>

        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => console.log('hola')}>
          <Text>Imprimir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => console.log('hola')}>
          <Text>Pagar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => console.log('hola')}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderDetailContainer: {
    padding: 20,
    flex: 1,
  },
});

export default OrderDetail;
