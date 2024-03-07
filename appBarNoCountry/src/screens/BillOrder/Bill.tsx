import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList, ScreenProp} from '../../Tabs';
import {formatDate} from '../../utils/formatDate';
import {FlatList} from 'react-native-gesture-handler';

type OrderDetailRouteProp = RouteProp<RootStackParamList, 'Factura'>;

const Bill = () => {
  const route = useRoute<OrderDetailRouteProp>();
  const navigation = useNavigation<ScreenProp>();
  const {billOrder, tableNumber} = route.params;
  if (!billOrder) navigation.goBack();
  const handleReturn = () => navigation.navigate('Salon');
  return (
    <View style={styles.billContainer}>
      <View style={styles.header}>
        <Text style={styles.text}>Recibo</Text>
      </View>
      <View style={styles.billCard}>
        <View style={styles.billRow}>
          <Text style={styles.textLeft}>N° Pedido:</Text>
          <Text style={styles.textRight}>#{billOrder.billOrderNumber}</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.textLeft}>N° Mesa:</Text>
          <Text style={styles.textRight}>
            #{String(tableNumber).padStart(3, '0')}
          </Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.textLeft}>Fecha y Hora</Text>
          <Text style={styles.textRight}>{formatDate(new Date())}</Text>
        </View>
        <View style={styles.billTable}>
          <View style={styles.billRow}>
            <Text style={{...styles.textTableTitle, flex: 2.3}}>Producto</Text>
            <Text style={styles.textTableTitle}>Cantidad</Text>
            <Text style={{...styles.textTableTitle, textAlign: 'center'}}>
              P/U
            </Text>
            <Text style={{...styles.textTableTitle, textAlign: 'center'}}>
              Precio
            </Text>
          </View>
          <FlatList
            data={billOrder.orderDetails}
            renderItem={({item: {product, quantity}}) => (
              <View>
                <View style={styles.billRow}>
                  <Text style={{...styles.textTableNormal, flex: 2.3}}>
                    {product.name}
                  </Text>
                  <Text
                    style={{
                      ...styles.textTableNormal,
                      textAlign: 'center',
                    }}>
                    {quantity}
                  </Text>
                  <Text
                    style={{...styles.textTableNormal, textAlign: 'center'}}>
                    $ {product.price}
                  </Text>
                  <Text
                    style={{
                      ...styles.textTableNormal,
                      textAlign: 'center',
                    }}>
                    $ {product.price * quantity}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={item => String(item.id)}
          />
        </View>
        <View style={styles.billRow}>
          <Text style={styles.textLeft}>Tva</Text>
          <Text style={styles.textRight}>$ 0</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.textLeft}>Sub Total</Text>
          <Text style={styles.textRight}> $ {billOrder.total}</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={{...styles.textLeft, ...styles.textTotal}}>Total</Text>
          <Text style={{...styles.textRight, ...styles.textTotal}}>
            $ {billOrder.total}
          </Text>
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.sendButton} onPress={handleReturn}>
            <Text style={styles.textButton}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  billContainer: {
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    height: 600,
    
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#0305C5',
  },
  billCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  billRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  billTable: {
    borderStyle: 'dotted',
    borderTopWidth: 3,
    borderBottomWidth: 3,
    paddingVertical: 8,
    height: 200,
  },
  textTableTitle: {
    color: 'black',
    flex: 1,

    fontWeight: 'bold',
    fontSize: 14,
  },
  textTableNormal: {
    flex: 1,
    color: 'black',
    fontSize: 14,
  },
  textLeft: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'black',
  },
  textRight: {flex: 1, fontSize: 14, color: 'black', textAlign: 'right'},
  textTotal: {
    fontWeight: '900',
    fontSize: 21,
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  total: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textButton: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
  sendButton: {
    paddingHorizontal: 25,
    paddingVertical: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
    borderRadius: 5,
    position: "absolute",
    bottom: -100,
  },
});

export default Bill;
