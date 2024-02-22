import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import { FoodItem } from './Menu.type';

function Menu() {
  const [food, setFood] = useState<FoodItem[]>([
    {type: 'Clasicos', name: 'Hamburguesa', price: '$10.67', quantity: 0},
    {type: 'Bebida', name: 'Refresco', price: '$2.55', quantity: 0},
    {type: 'Aperitivo', name: 'Papas fritas', price: '$5.45', quantity: 0},
    {type: 'Desayuno', name: 'salmón', price: '$15', quantity: 0},
  ]);

  const [selectedType, setSelectedType] = useState('');
  const navigation = useNavigation();

  const incrementCounter = (foodItem: FoodItem) => {
    const newFood = food.map(item =>
      item === foodItem ? { ...item, quantity: item.quantity + 1 } : item
    );
    setFood(newFood);
  };
  
  const decrementCounter = (foodItem: FoodItem) => {
    const newFood = food.map(item =>
      item === foodItem && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setFood(newFood);
  };
  

  const handleFoodContainerClick = (type: string) => {
    setSelectedType(type);
  };

  const handleOrder = () => {

    navigation.navigate('Order' as never);
  };

  return (
    <View style={styles.menuContainer}>
      <ScrollView style={styles.foodContainer} horizontal={true}>
        {food.map((foodItem, index) => (
          <TouchableOpacity
            key={index}
            style={[
                styles.foodItem,
                index === food.length - 1 ? { marginRight: 60 } : null 
              ]}
            onPress={() => handleFoodContainerClick(foodItem.type)} 
          >
            <Text style={styles.foodName}>{foodItem.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.menuItemContainer}>
        {food
          .filter(foodItem => foodItem.type === selectedType) 
          .map((foodItem, index) => (
            <TouchableOpacity  key={index} style={styles.menuItem}>
              <Image
                style={styles.images}
                source={require('../../assets/menu/burguer.png')}
              />
              <View>
                <View>
                  <Text style={styles.typeFood}>{foodItem.type}</Text>
                  <Text style={styles.category}>{foodItem.name}</Text>
                </View>
                <View>
                  <Text style={styles.price}>{foodItem.price}</Text>
                  <View style={styles.quantity}>
                    <TouchableOpacity onPress={() => incrementCounter(foodItem)}>
                      <Text style={styles.signs}>+</Text>
                    </TouchableOpacity>

                    <Text style={styles.showQuantity}>{foodItem.quantity}</Text>

                    <TouchableOpacity onPress={() => decrementCounter(foodItem)}>
                      <Text style={styles.signs}>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>


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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    width: 'auto',
  },
  foodItem: {
    backgroundColor: '#8586FF',
    borderRadius: 16,
    padding: 10,
    marginLeft: 10,
    width: 100,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#3032FC"
  },
  foodName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuItemContainer: {
    padding: 10,
  },
  menuItem: {
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
  images: {
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
    flex: 1,
    position: 'absolute',
    top: 600,
    width: '100%',
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
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Menu;
