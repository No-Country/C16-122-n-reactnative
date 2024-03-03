import React, {useState} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  FlatList,
} from 'react-native';
import {FoodItem} from './ReceiptTypes';

function Receipt() {
  const data: FoodItem[] = [
    {id: 1, product: '1', quantity: 2, pU: 30, price: 23},
    {id: 2, product: '2', quantity: 1, pU: 25, price: 23},
    {id: 3, product: '3', quantity: 4, pU: 35, price: 23},
  ];

  const renderItem = ({item}: {item: FoodItem}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.product}</Text>
      <Text style={styles.cell}>{item.quantity}</Text>
      <Text style={styles.cell}>{item.pU}</Text>
      <Text style={styles.cell}>{item.price}</Text>
    </View>
  );
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.nameReceipt}>Recibo </Text>
      <View style={styles.receiptContainer}>
        <View style={styles.containers}>
          <View style={styles.ItemContainer}>
            <Text style={styles.TextReceipt}>N° pedido</Text>
            <Text>#33</Text>
          </View>
          <View style={styles.ItemContainer}>
            <Text style={styles.TextReceipt}>N° mesa</Text>
            <Text>#2</Text>
          </View>
          <View style={styles.ItemContainer}>
            <Text style={styles.TextReceipt}>Fecha y hora</Text>
            <Text>12:00/2/01/2024</Text>
          </View>
        </View>

        <View style={styles.menuListContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Producto</Text>
            <Text style={styles.headerText}>Cantidad</Text>
            <Text style={styles.headerText}>P/U</Text>
            <Text style={styles.headerText}>Precio</Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>

        <View style={styles.containers}>
          <View style={styles.ItemContainer}>
            <Text style={styles.TextReceipt}>TVA(10.0%)</Text>
            <Text>$4.00</Text>
          </View>
          <View style={styles.ItemContainer}>
            <Text style={styles.TextReceipt}>Subtotal</Text>
            <Text>$4.000</Text>
          </View>
          <View style={styles.ItemContainer}>
            <Text style={styles.textTotal}>Total</Text>
            <Text style={styles.textTotal}>$4.000</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.imageButton}
            source={require('../../assets/print.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.imageButton}
            source={require('../../assets/email.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.imageButton}
            source={require('../../assets/download.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.imageButton}
            source={require('../../assets/cancel.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    height: 700,
    gap: 10,
    padding: 20,
  },
  nameReceipt: {
    color: '#0305C5',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  receiptContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  containers: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
  ItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextReceipt: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
  menuListContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderTopColor: '#fff',
    borderRightWidth: 0,
    borderLeftWidth: 0,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#000',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
    width: '25%',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  cell: {
    textAlign: 'center',

    width: '50%',
  },
  textTotal: {
    fontSize: 23,
    color: '#000',
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
    padding: 5,
    borderRadius: 5,
  },
  imageButton: {
    width: 30,
    height: 30,
  },
});

export default Receipt;
