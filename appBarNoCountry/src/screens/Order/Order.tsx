import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../hooks/hooks';
import {getCategories} from '../../redux/actions';
import CardProduct from '../../components/CardProduct/CardProduct';
import {BillOrder, OrderDetail} from '../../interfaces/interface';
import {ScreenProp} from '../../Tabs';
import {AppDispatch} from '../../redux/store';
import axiosInstance from '../../services/axiosInstance';
import DialogGeneral from '../../components/Dialog/DialogGeneral';

function Order() {
  const dispatch: AppDispatch = useDispatch();
  const [isViewEditOrder, setIsViewEditOrder] = useState(false);
  const [orderSelect, setOrderSelect] = useState<OrderDetail | null>(null);
  const navigation = useNavigation<ScreenProp>();
  const [billOrder, setBillOrder] = useState<BillOrder | null>(null);
  const table = useAppSelector(state => state.table);

  const handleEditOrder = (order: OrderDetail) => {
    setOrderSelect(order);
    setIsViewEditOrder(true);
  };
  const handleDeleteOrder = async (id: number) => {
    const {status} = await axiosInstance.delete(`/order-detail/${id}`);
    if (status) {
      Alert.alert('Exito', 'Pedido Borrado');
      getBillOrder();
    }
  };

  const handleShowDeleteOrder = (id: number) => {
    Alert.alert(
      'Eliminar Pedido',
      '¿Esta Seguro que Desea Eliminar Este Pedido?',
      [
        {
          text: 'SI',
          onPress: () => handleDeleteOrder(id),
        },
        {
          text: 'NO',
        },
      ],
    );
  };
  const handleChangeData = (key: string, value: string) => {
    if (!orderSelect) return;
    const newData: OrderDetail = {...orderSelect, [key]: value};
    setOrderSelect(newData);
  };
  const handleMenu = () => {
    navigation.navigate('Menu');
  };

  const handleViewDialogOrder = () => {
    setOrderSelect(null);
    setIsViewEditOrder(!isViewEditOrder);
  };
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      getBillOrder();
    }, []),
  );
  const handleSubmitOrder = async () => {
    if (!orderSelect) return;
    handleViewDialogOrder();
    const {quantity, description} = orderSelect;
    const order = await axiosInstance.patch(`/order-detail/${orderSelect.id}`, {
      quantity,
      description,
    });
    if (order.status) {
      Alert.alert('Exito', 'Pedido Editado correctamente');
      getBillOrder();
    }
  };
  const handleBill = () => {
    if (!billOrder) return;
    Alert.alert('Factura.', '¿Esta seguro que desesa facturar esta orden?', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Aceptar',
        onPress: () => {
          axiosInstance.patch(`/bill-orders/${billOrder.id}/pay`).then(res => {
            const {billOrder} = res.data;
            navigation.navigate('Factura', {
              billOrder,
              tableNumber: table.tableNumber,
            });
          });
        },
      },
    ]);
  };
  const getBillOrder = async () => {
    axiosInstance
      .get(`/bill-orders/table/${table.id}`)
      .then(res => setBillOrder(res.data.billOrder));
  };
  return (
    <View style={styles.orderContainer}>
      <View style={styles.orderBar}>
        <Text style={styles.text}>Mesa {table.tableNumber}</Text>

        <TouchableOpacity onPress={handleMenu}>
          <Image
            style={styles.Image}
            source={require('../../assets/add.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.orderText}>
        <Text style={styles.text}>Pedidos</Text>
      </View>

      {billOrder?.orderDetails && (
        <>
          <FlatList
            data={billOrder.orderDetails}
            renderItem={({item}) => (
              <CardProduct
                product={item.product}
                quantity={item.quantity}
                handleEditProduct={() => handleEditOrder(item)}
                handleShowDeleteProduct={() => handleShowDeleteOrder(item.id)}
                havePermision
              />
            )}
            keyExtractor={item => String(item.id)}
          />
          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.total}>
              <Text style={styles.textTotal}>Total: ${billOrder?.total}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sendButton} onPress={handleBill}>
              <Text style={styles.textButton}>Facturar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {orderSelect && (
        <DialogGeneral
          isVisible={isViewEditOrder}
          title={'Editar una orden'}
          labelProp1="cantidad"
          labelProp2="Mensaje"
          prop1={String(orderSelect.quantity)}
          prop2={orderSelect.description}
          onChangeProp1={value => handleChangeData('quantity', value)}
          onChangeProp2={value => handleChangeData('description', value)}
          onHidePress={handleViewDialogOrder}
          onConfirm={handleSubmitOrder}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  orderContainer: {
    padding: 20,
    flex: 1,
    gap: 10,
  },
  orderBar: {
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
  Image: {
    width: 30,
    height: 30,
  },
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  orderText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trash: {
    width: 30,
    height: 30,
  },
  orderItem: {
    borderRadius: 16,
    backgroundColor: 'white',
    width: 250,
    height: 100,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imageOrder: {
    width: 80,
    height: 80,
  },
  typeFood: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  category: {
    fontSize: 13,
  },
  price: {
    color: '#EBB426',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
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
  textTotal: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 20,
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
  },
});

export default Order;
