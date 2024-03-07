import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {
  Category,
  ProductQuantity,
  Profile,
} from '../../interfaces/interface';
import {AppDispatch, RootState} from '../../redux/store';
import CardProduct from '../../components/CardProduct/CardProduct';
import {FlatList} from 'react-native-gesture-handler';
import {useAppSelector} from '../../hooks/hooks';
import {ScreenProp} from '../../Tabs';
import axiosInstance from '../../services/axiosInstance';
import {Icon} from '@rneui/themed';
import {getCategories} from '../../redux/actions';
import {
  apiCreateCategory,
  apiCreateProduct,
  apiDeleteProduct,
  apiEditCategory,
  apiEditProduct,
} from '../../apis';
import DialogGeneral from '../../components/Dialog/DialogGeneral';

// import { Dialog } from 'tamagui';

interface CategoryData {
  id: null | number;
  name: string;
  description: string;
}
export interface ProductData {
  id: null | number;
  name: string;
  description: string;
  price: number;
  productCategoryId: number | null;
}

const INIT_VALUES_CATEGORY: CategoryData = {
  id: null,
  name: '',
  description: '',
};
const INIT_VALUES_PRODUCT: ProductData = {
  id: null,
  name: '',
  description: '',
  price: 0,
  productCategoryId: null,
};

function Menu() {
  const {id: tableId} = useAppSelector(state => state.table);
  const dispatch: AppDispatch = useDispatch();

  const categories: Category[] = useSelector(
    (state: RootState) => state.reducers.categories,
  );
  const profile: Profile = useSelector(
    (state: RootState) => state.reducers.profileSession,
  );


  const [isDialogVisibleCat, setIsDialogVisibleCat] = useState(false);
  const [isDialogVisibleEditProd, setIsDialogVisibleEditProd] = useState(false);
  const [categorySelect, setCategorySelect] = useState<Category | null>(null);
  const [product, setProduct] = useState(INIT_VALUES_PRODUCT);
  const [category, setCategory] = useState(INIT_VALUES_CATEGORY);
  const [quantity, setQuantity] = useState<ProductQuantity>({});
  const navigation = useNavigation<ScreenProp>();

  const selectCategory = (category: Category) => setCategorySelect(category);

  useEffect(() => {
    if (categorySelect) {
      const findCategory = categories.find(({id}) => id === categorySelect.id);
      if (findCategory) {
        setCategorySelect(findCategory);
      }
    }
  }, [categories]);
  useEffect(() => {
    if (categories.length > 0) {
      const findCategory = categories[0];
      if (findCategory) {
        setCategorySelect(findCategory);
      }
    }
  }, []);

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

  const handleChangeData = (
    key: string,
    value: string,
    type: 'category' | 'product',
  ) => {
    if (type === 'category') {
      const newData = {...category, [key]: value};
      console.log(newData)
      setCategory(newData);
    }
    if (type === 'product') {
      const newData = {...product, [key]: value};
      setProduct(newData);
    }
  };
  const handleSubmitCategory = async () => {
    handleVieDialogCategory();
    if (category.id) {
      const {status} = await apiEditCategory(category);
      if (status) Alert.alert('Exito', 'Categoria Editado');
    } else {
      const {status} = await apiCreateCategory(category);
      if (status) Alert.alert('Exito', 'Categoria Creada');
    }
    dispatch(getCategories());
  };
  const handleVieDialogCategory = () => {
    setCategory(INIT_VALUES_CATEGORY);
    setIsDialogVisibleCat(!isDialogVisibleCat);
  };
  const handleEditCategory = (category: CategoryData) => {
    setCategory(category);
    setIsDialogVisibleCat(true);
  };
  const handleSubmitProduct = async () => {
    handleVieDialogProduct();
    if (product.id) {
      const {status} = await apiEditProduct(product);
      if (status) Alert.alert('Exito', 'Producto Editado');
    } else {
      const {status} = await apiCreateProduct({
        ...product,
        productCategoryId: categorySelect?.id,
      });
      if (status) Alert.alert('Exito', 'Producto Creado');
    }
    dispatch(getCategories());
  };

  const handleVieDialogProduct = () => {
    setProduct(INIT_VALUES_PRODUCT);
    setIsDialogVisibleEditProd(!isDialogVisibleEditProd);
  };

  const handleEditProduct = (product: ProductData) => {
    setProduct(product);
    setIsDialogVisibleEditProd(true);
  };

  const handleDeleteProduct = async (id: number) => {
    const {status} = await apiDeleteProduct(id);
    if (status) {
      Alert.alert('Exito', 'Producto Borrado');
      dispatch(getCategories());
    }
  };

  const handleShowDeleteProduct = (id: number) => {
    Alert.alert(
      'Eliminar Producto',
      '¿Esta Seguro que Desea Eliminar Este Producto?',
      [
        {
          text: 'SI',
          onPress: () => handleDeleteProduct(id),
        },
        {
          text: 'NO',
        },
      ],
    );
  };
  const isAdmin = profile.role === 'ADMIN';
  return (
    <View style={styles.menuContainer}>
      <View>
        <FlatList
          data={categories}
          renderItem={({
            item: {
              id,
              name,
              description,
              products,
              barId,
              createdAt,
              updatedAt,
            },
          }) => (
            <TouchableOpacity
              style={{
                ...styles.foodItem,
                backgroundColor: id !== categorySelect?.id ? '#fff' : '#8586FF',
              }}
              onPress={() =>
                selectCategory({
                  id,
                  name,
                  description,
                  products,
                  barId,
                  createdAt,
                  updatedAt,
                })
              }>
              <Text
                style={{
                  ...styles.foodName,
                  color: id !== categorySelect?.id ? '#8586FF' : '#fff',
                }}>
                {name}
              </Text>
              {isAdmin && (
                <TouchableOpacity
                  onPress={() => handleEditCategory({description, id, name})}>
                  <Icon name="edit" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          )}
          horizontal={true}
          ListHeaderComponent={() =>
            isAdmin ? (
              <TouchableOpacity
                style={styles.foodItem}
                onPress={handleVieDialogCategory}>
                <Icon name="edit" />
              </TouchableOpacity>
            ) : (
              <></>
            )
          }
          keyExtractor={item => String(item.id)}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.text}>Productos:</Text>
        {isAdmin && (
          <TouchableOpacity
            onPress={handleVieDialogProduct}
            style={{alignItems: 'flex-end'}}>
            <Icon name="add-circle" color={'green'} />
          </TouchableOpacity>
        )}
      </View>
      {categorySelect?.products && (
        <FlatList
          data={categorySelect?.products}
          renderItem={({item}) => (
            <CardProduct
              handleAdd={handleAdd}
              handleSubtract={handleSubtract}
              product={item}
              quantity={quantity[item.id] || 0}
              handleShowDeleteProduct={handleShowDeleteProduct}
              handleEditProduct={handleEditProduct}
              havePermision={isAdmin}
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

      <DialogGeneral
        isVisible={isDialogVisibleCat}
        title={category.id ? 'Editar Categoria' : 'Agregar nueva Categoria'}
        labelProp1="Nombre"
        labelProp2="Descripcion"
        prop1={category.name}
        prop2={category.description}
        onChangeProp1={value => handleChangeData('name', value, 'category')}
        onChangeProp2={value =>
          handleChangeData('description', value, 'category')
        }
        onHidePress={handleVieDialogCategory}
        onConfirm={handleSubmitCategory}
      />
      <DialogGeneral
        isVisible={isDialogVisibleEditProd}
        title={product.id ? 'Editar Producto' : 'Agregar nueva Producto'}
        labelProp1="Nombre"
        labelProp2="Descripcion"
        labelProp3="Precio"
        labelProp4={product.id ? 'Categoria' : undefined}
        prop1={product.name}
        prop2={product.description}
        prop3={product.price.toString()}
        prop4={categorySelect?.id}
        arrayValues={categories.map(({id, name}) => ({label: name, value: id}))}
        onChangeProp1={value => handleChangeData('name', value, 'product')}
        onChangeProp2={value =>
          handleChangeData('description', value, 'product')
        }
        onChangeProp3={value => handleChangeData('price', value, 'product')}
        onChangeProp4={value =>
          handleChangeData('productCategoryId', value, 'product')
        }
        onHidePress={() => setIsDialogVisibleEditProd(false)}
        onConfirm={handleSubmitProduct}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    justifyContent: 'flex-start',
    padding: 20,
    gap: 10,
    flex: 1,
  },

  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: '#3032FC',
  },
  foodItemActive: {
    backgroundColor: 'white',
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
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    fontWeight: '800',
  },
});

export default Menu;
