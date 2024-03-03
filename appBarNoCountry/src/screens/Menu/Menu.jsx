import React, {useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import {Icon, ListItem, Avatar} from '@rneui/themed';
import {Button, XGroup, XStack, YStack, Spinner} from 'tamagui';
import {
  selectedProducts,
  getProducts,
  getCategories,
} from './../../redux/actions';
import {apiCreateCategory, apiEditCategory, apiDeleteCategory, apiCreateProduct, apiEditProduct, apiDeleteProduct} from '../../apis';
import Dialog from '../../components/Dialog/DialogProfile';
import Navbar from '../../components/Navbar/Navbar';

function Menu() {
  const selecProductGlobal = useSelector(
    state => state.reducers.selectedProducts,
  );
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.reducers.categories);
  const {products} = useSelector(state => state.reducers.products);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [quantity, setQuantity] = useState(selecProductGlobal);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDialogVisibleCat, setIsDialogVisibleCat] = useState(false);
  const [isDialogVisibleEditCat, setIsDialogVisibleEditcat] = useState(false);
  const [isDialogVisibleProd, setIsDialogVisibleProd] = useState(false);
  const [isDialogVisibleEditProd, setIsDialogVisibleEditProd] = useState(false);
  const [categorias, setCategorias] = useState([{label:'default', value:0}]);
  const [categoryEdit, setCategoryEdit] = useState({
    name: '',
    description: '',
  });
  const [category, setCategory] = useState({
    name: '',
    description: '',
  });
  const [productEdit, setProductEdit] = useState({
    name: '',
    description: '',
    price: 0,
    productCategoryId: 1,
  });
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    productCategoryId: 1,
  });
  const navigation = useNavigation();

  const handleCategoryClick = id => {
    setSelectedCategory(id);
    // console.log("iDFILTER",id);
  };

  const filteredProducts =
    products &&
    products.filter(product => product.productCategoryId === selectedCategory);

  const handleAdd = productId => {
    setQuantity(prevState => ({
      ...prevState,
      [productId]: (prevState[productId] || 0) + 1,
    }));
  };

  const handleSubtract = productId => {
    if (quantity[productId] > 0) {
      setQuantity(prevState => ({
        ...prevState,
        [productId]: prevState[productId] - 1,
      }));
    }
  };

  const handleDelete = productId => {
    if (quantity[productId] > 0) {
      setQuantity(prevState => ({
        ...prevState,
        [productId]: 0,
      }));
    }
  };

  const handleOrder = () => {
    dispatch(selectedProducts(quantity));
    navigation.navigate('Order');
  };
  //  console.log("menu", selecProductGlobal);

  useEffect(() => {
    // Función asincrónica para obtener el rol de usuario desde AsyncStorage
    const getRole = async () => {
      try {
        const roleAsync = await AsyncStorage.getItem('role');
        setRole(roleAsync); // Actualiza el estado con el rol de usuario obtenido
      } catch (error) {
        console.log('Error al obtener el rol del usuario:', error);
      }
    };
    let listCategories = []
    categories !== undefined ?categories.forEach(category=>{
      listCategories.push({label: category.name, value: category.id})
    }) : null
    setCategorias(listCategories)
    getRole(); // Llama a la función para obtener el rol de usuario al cargar el componente
  }, []); // El segundo argumento [] indica que este efecto solo se ejecuta una vez al montar el componente

  useEffect(() => {
    let listCategories = []
    categories !== undefined ?categories.forEach(category=>{
      listCategories.push({label: category.name, value: category.id})
    }) : null
    setCategorias(listCategories)
  }, [categories])

  const handleCleanProduct = (isEdit)=>{
    if (isEdit){
      setProductEdit({
        name: '',
        description: '',
        price: 0,
        productCategoryId: 1,
      });
    }else{
      setProduct({
        name: '',
        description: '',
        price: 0,
        productCategoryId: 1,
      });
    }
    
  }
  const handleCleanCategory = (isEdit)=>{
    if (isEdit){
      setCategoryEdit({
        name: '',
        description: '',
      });
    }else{ 
      setCategory({
        name: '',
        description: '',
      });
    }
  }

  //Cambiar Atributos Productos

  const handleChangeNameProd = name => {
    setProduct(prevProduct => ({
      ...prevProduct,
      name: name,
    }));
  };

  const handleChangeDescription = description => {
    setProduct(prevProduct => ({
      ...prevProduct,
      description: description,
    }));
  };

  const handleChangeEditNameProd = name => {
    setProductEdit(prevProduct => ({
      ...prevProduct,
      name: name,
    }));
  };

  const handleChangeEditDescriptionProd = role => {
    setProductEdit(prevProduct => ({
      ...prevProduct,
      description: description,
    }));
  };


  const handleChangePriceProd = price => {
    setProduct(prevProduct => ({
      ...prevProduct,
      price: price,
    }));
  };

  const handleChangeEditPriceProd = price => {
    setProductEdit(prevProduct => ({
      ...prevProduct,
      price: price,
    }));
  };

  const handleChangeCategoryProd = categoryID => {
    console.log('VALUE', categoryID)
    setProduct(prevProduct => ({
      ...prevProduct,
      productCategoryId: categoryID,
    }));
  };

  const handleChangeEditCategoryProd = categoryID => {
    setProductEdit(prevProduct => ({
      ...prevProduct,
      productCategoryId: categoryID,
    }));
  };

//Cambio Atributos Categorias
  const handleChangeNameCat = name => {
    setCategory(prevProduct => ({
      ...prevProduct,
      name: name,
    }));
  };

  const handleChangeDescriptionCat = description => {
    setCategory(prevProduct => ({
      ...prevProduct,
      description: description,
    }));
  };

  const handleChangeEditNameCat = name => {
    setCategoryEdit(prevCategory => ({
      ...prevCategory,
      name: name,
    }));
  };

  const handleChangeEditDescriptionCat = description => {
    setCategoryEdit(prevCategory => ({
      ...prevCategory,
      description: description,
    }));
  };

  //Mostrar Dialogos

  const handleShowEditCategory = (category) => {
    setCategoryEdit(category);
      setIsDialogVisibleEditcat(true)
  }

  const handleShowEditProduct = (category) => {
    setProductEdit(category);
      setIsDialogVisibleEditProd(true)
  }

  //Procesos De Productos

  const handleCreateProduct = async () => {
    setLoading(true);
    console.log('Producto a Agregar', product);
    const productCreated = await apiCreateProduct(product);
    if (productCreated.status) {
      Alert.alert('Exito', 'Producto Creado');
      dispatch(getProducts());
      setIsDialogVisibleProd(false);
      handleCleanProduct(false)
      setLoading(false);
      
    } else if (!productCreated.status) {
      Alert.alert('Error', 'No se Creo Producto.');
      setLoading(false);
    }
  };

  const handleShowDeleteProduct = (product) => {
    Alert.alert(
        'Eliminar Producto',
        '¿Esta Seguro que Desea Eliminar Este Producto?',
        [
          {
            text: 'SI',
            onPress: ()=>{handleDeleteProduct(product)},
          },
          {
            text: 'NO',
            onPress: () => {},
          },
        ],
      );
  }


  const handleEditProduct = async () => {
    setLoading(true);
    console.log('Producto a Editar', productEdit);
    const productEdited = await apiEditProduct(productEdit);
    if (productEdited.status) {
      Alert.alert('Exito', 'Perfil Editado');
      dispatch(getProducts());
      setIsDialogVisibleEditProd(false)
      handleCleanProduct(true)
      setLoading(false);
    } else if (!productEdited.status) {
      Alert.alert('Error', 'No se Creo Perfil.');
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (product) => {
    setLoading(true);
    console.log('Producto a Borrar', product);
    const productDeleted = await apiDeleteProduct(product.id);
    if (productDeleted.status) {
      Alert.alert('Exito', 'Producto Borrado');
      dispatch(getProducts());
      setLoading(false);
    } else if (!productDeleted.status) {
      Alert.alert('Error', 'No se Creo Producto.');
      setLoading(false);
    }
  };

  //Procesos De Categorias

  const handleCreateCategory = async () => {
    setLoading(true);
    console.log('Categoria a Agregar', category);
    const categoryCreated = await apiCreateCategory(category);
    if (categoryCreated.status) {
      Alert.alert('Exito', 'Categoria Creada');
      dispatch(getCategories());
      setIsDialogVisibleCat(false);
      handleCleanCategory(false)
      setLoading(false);
      
    } else if (!categoryCreated.status) {
      Alert.alert('Error', 'No se Creo Categoria.');
      setLoading(false);
    }
  };

  const handleShowDeletCategory = (categoria) => {
    Alert.alert(
        'Eliminar Categoria',
        '¿Esta Seguro que Desea Eliminar Esta Categoria?',
        [
          {
            text: 'SI',
            onPress: ()=>{handleDeleteCategory(categoria)},
          },
          {
            text: 'NO',
            onPress: () => {},
          },
        ],
      );
  }


  const handleEditCategory = async () => {
    setLoading(true);
    console.log('Categoria a Editar', categoryEdit);
    const categoryEdited = await apiEditCategory(categoryEdit);
    if (categoryEdited.status) {
      Alert.alert('Exito', 'Categoria Editada');
      dispatch(getCategories());
      setIsDialogVisibleEditcat(false)
      handleCleanCategory(true)
      setLoading(false);
    } else if (!categoryEdited.status) {
      Alert.alert('Error', 'No se Creo Categoria.');
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoria) => {
    setLoading(true);
    console.log('Categoria a Borrar', categoria);
    const categoryDeleted = await apiDeleteCategory(categoria.id);
    if (categoryDeleted.status) {
      Alert.alert('Exito', 'Categoria Borrada');
      dispatch(getCategories());
      setLoading(false);
    } else if (!categoryDeleted.status) {
      Alert.alert('Error', 'No se Creo Categoria.');
      setLoading(false);
    }
  };

  const prueba=()=>{
    console.log('prueba',categories);
  }
  return (
    <View style={styles.menuContainer}>
      {loading? <Spinner size="large" color="$orange10" /> : 
      <>
      <View style={{width: '100%'}}>
        <Navbar
        title={'Menu'}
        isGoBack={true}
          role={role}
          onPressAdd={()=>setIsDialogVisibleProd(true)}
        />
      </View>
      <ScrollView style={styles.foodContainer} horizontal={true}>
        {role === 'ADMIN' ? (
          <XStack
            gap="$1"
            alignItems="center"
            justifyContent="center"
            style={{
              marginRight: 5,
              backgroundColor: '#8586FF',
              borderRadius: 16,
              padding: 10,
            }}>
            <Button size="$3" chromeless onPress={()=>setIsDialogVisibleCat(true)}>
              <Icon name="add-circle" color={'green'} />
            </Button>
          </XStack>
        ) : null}
        {categories &&
          categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.foodItem,
                index === category.name.length - 1 ? {marginRight: 60} : null,
              ]}
              onPress={() => handleCategoryClick(category.id)}>
              <Text style={styles.foodName}>{category.name}</Text>
              {role === 'ADMIN' ? (
                <XStack
                  gap="$1"
                  justifyContent="center"
                  style={{marginRight: 5}}>
                  <Button size="$3" chromeless onPress={()=>{handleShowEditCategory(category)}}>
                    <Icon name="edit" />
                  </Button>
                </XStack>
              ) : null}
            </TouchableOpacity>
          ))}
      </ScrollView>

      <ScrollView style={styles.menuItemContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.orderItem}>
            {filteredProducts &&
              filteredProducts.map((producto, index) => (
                <TouchableOpacity
                  key={index}
                  // onPress={() => handleCategoryClick(category.name)}
                >
                  <Image
                    style={styles.imageOrder}
                    source={require('../../assets/menu/burguer.png')}
                  />
                  {role === 'ADMIN' ? (
                    <XStack
                      gap="$1"
                      justifyContent="center"
                      style={{marginRight: 5}}>
                        <Button size="$3" chromeless onPress={()=>{handleShowEditProduct(producto)}}>
                        <Icon name="edit" />
                      </Button>
                      <Button size="$3" chromeless onPress={()=>{handleShowDeleteProduct(producto)}}>
                        <Icon name="delete" color={'red'} />
                      </Button>
                    </XStack>
                  ) : null}
                  <Text style={styles.typeFood}>{producto.name}</Text>
                  <Text style={styles.category}>{producto.description}</Text>
                  <Text style={styles.price}>{producto.price}</Text>
                  <View style={styles.quantity}>
                    <TouchableOpacity
                      onPress={() => handleSubtract(producto.id)}>
                      <Text style={styles.signs}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.showQuantity}>
                      {quantity[producto.id] || 0}
                    </Text>
                    <TouchableOpacity onPress={() => handleAdd(producto.id)}>
                      <Text style={styles.signs}>+</Text>
                    </TouchableOpacity>
                    {quantity[producto.id] > 0 && (
                      <TouchableOpacity
                        onPress={() => handleDelete(producto.id)}>
                        <Text style={styles.signs}>Delete</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity onPress={handleOrder} style={styles.Button}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
      </>}

      <Dialog
          isVisible={isDialogVisibleCat}
          title="Agregar Nueva Categoria"
          labelProp1="Nombre"
          labelProp2="Descripcion"
          prop1={category.name}
          prop2={category.description}
          onChangeProp1={handleChangeNameCat}
          onChangeProp2={handleChangeDescriptionCat}
          onHidePress={() => setIsDialogVisibleCat(false)}
          onConfirm={handleCreateCategory}
        />
        <Dialog
          isVisible={isDialogVisibleProd}
          title="Nuevo Producto"
          labelProp1="Nombre"
          labelProp2="Descripcion"
          labelProp3="Precio"
          labelProp4="Categoria"
          prop1={product.name}
          prop2={product.description}
          prop3={product.price.toString()}
          prop4={product.productCategoryId}
          arrayValues={categorias}
          onChangeProp1={handleChangeNameProd}
          onChangeProp2={handleChangeDescription}
          onChangeProp3={handleChangePriceProd}
          onChangeProp4={handleChangeCategoryProd}
          onHidePress={() => setIsDialogVisibleProd(false)}
          onConfirm={handleCreateProduct}
        />
        {
          //EDITS
        }
        <Dialog
          isVisible={isDialogVisibleEditCat}
          title="Editar Categoria"
          labelProp1="Nombre"
          labelProp2="Descripcion"
          prop1={categoryEdit.name}
          prop2={categoryEdit.description}
          onChangeProp1={handleChangeEditNameCat}
          onChangeProp2={handleChangeEditDescriptionCat}
          onHidePress={() => setIsDialogVisibleEditcat(false)}
          onConfirm={handleEditCategory}
        />
        <Dialog
          isVisible={isDialogVisibleEditProd}
          title="Editar Producto"
          labelProp1="Nombre"
          labelProp2="Descripcion"
          labelProp3="Precio"
          labelProp4="Categoria"
          prop1={productEdit.name}
          prop2={productEdit.description}
          prop3={productEdit.price.toString()}
          prop4={productEdit.productCategoryId}
          arrayValues={categorias}
          onChangeProp1={handleChangeEditNameProd}
          onChangeProp2={handleChangeEditDescriptionProd}
          onChangeProp3={handleChangeEditPriceProd}
          onChangeProp4={handleChangeEditCategoryProd}
          onHidePress={() => setIsDialogVisibleEditProd(false)}
          onConfirm={handleEditProduct}
        />
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
    padding: 10,
  },
  foodItem: {
    backgroundColor: '#8586FF',
    borderRadius: 16,
    padding: 10,
    marginLeft: 10,
    width: 125,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3032FC',
  },
  foodName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuItemContainer: {
    marginBottom: 100,
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
  imageOrder: {
    width: 80,
    height: 80,
  },
});

export default Menu;
