import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Category, Product, ProductQuantity} from '../../interfaces/interface';
import {RootState} from '../../redux/store';
import CardProduct from '../../components/CardProduct/CardProduct';
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';
import {urlApi} from '../../utils/definition';
import {useAppSelector} from '../../hooks/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenProp} from '../../Tabs';
import axiosInstance from '../../services/axiosInstance';

function Menu() {
  const {id: tableId} = useAppSelector(state => state.table);
  const categories: Category[] = useSelector(
    (state: RootState) => state.reducers.categories,
  );
  const [products, setProducts] = useState<Product[] | null>(null);
  const [quantity, setQuantity] = useState<ProductQuantity>({});
  const navigation = useNavigation<ScreenProp>();

  const selectProducts = (products: Product[]) => setProducts(products);

  const handleAdd = (productId: number) => {
    setQuantity({
      ...quantity,
      [productId]: (quantity[productId] || 0) + 1,
    });
  };

  const handleSubtract = (productId: number) => {
    if (quantity[productId] > 0) {
      setQuantity({
        ...quantity,
        [productId]: quantity[productId] - 1,
      });
    }
  };

  const handleOrder = () => {
    const orderData = Object.entries(quantity).map(([productId, quantity]) => ({
      productId: +productId,
      quantity,
    }));
    axiosInstance
      .post(`/bill-orders/create-or-add/${tableId}`, orderData)
      .then(() => {
        navigation.goBack();
      });
  };
  return (
    <View style={styles.menuContainer}>
      <View>
        <FlatList
          data={categories}
          renderItem={({item: category}) => (
            <TouchableOpacity
              style={styles.foodItem}
              onPress={() => selectProducts(category.products)}>
              <Text style={styles.foodName}>{category.name}</Text>
            </TouchableOpacity>
          )}
          horizontal={true}
          keyExtractor={item => String(item.id)}
        />
      </View>
      {products && (
        <FlatList
          data={products}
          renderItem={({item}) => (
            <CardProduct
              handleAdd={handleAdd}
              handleSubtract={handleSubtract}
              product={item}
              quantity={quantity[item.id] || 0}
            />
          )}
          keyExtractor={item => String(item.id)}
        />
      )}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity onPress={handleOrder} style={styles.Button}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    padding: 20,
    gap: 10,
    flex: 1
  },

  foodItem: {
    backgroundColor: '#8586FF',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: '#3032FC',
  },

  foodName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  category: {
    fontSize: 13,
  },

  quantity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  signs: {
    fontSize: 20,
  },
  showQuantity: {
    backgroundColor: '#D7D7D7',
    borderRadius: 8,
    width: 35,
    textAlign: 'center',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  Button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
    width: 60,
    height: 30,
    marginTop: 30,
    borderRadius: 5,
    position: 'absolute', 
    bottom: 0,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Menu;
