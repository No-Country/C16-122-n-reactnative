import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import Navbar from '../../components/Navbar/Navbar';
import Tables from '../../components/Tables/Tables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import Dialog from '../../components/Dialog/Dialog';
import {getTables} from '../../redux/actions';
import {createTables, deleteTables} from '../../apis';
import {Button, YStack, ZStack} from 'tamagui';

function Salon({route, navigation}) {
  const {tables} = useSelector(state => state.reducers);
  const [mesasOcupadas, setmesasOcupadas] = useState([]);
  const [mesasDesocupadas, setmesasDesocupadas] = useState([]);
  const [rol, setrol] = useState('waitress');
  const [open, setOpen] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [openMenu, setopenMenu] = useState(false);
  const [count, setCount] = useState(0);
  const [tableLength, settableLength] = useState(0);

  const dispatch = useDispatch();

  // const {role} = route.params;
  useEffect(() => {
    setCount(0);
    let ocupadas = [];
    let desocupadas = [];
    if (tables !== undefined && tables) {
      loadRole();
      tables.map(mesa => {
        if (mesa.isOccupied) {
          ocupadas.push(mesa);
        } else {
          desocupadas.push(mesa);
        }
      });
      console.log('OCUPADAS', ocupadas, 'DESOCUPADAS', desocupadas);
      setmesasOcupadas(ocupadas);
      setmesasDesocupadas(desocupadas);
      settableLength(tables.length);
    } else {
      setmesasOcupadas([]);
      setmesasDesocupadas([]);
    }
  }, [tables]);

  const loadRole = async () => {
    let role = await AsyncStorage.getItem('role');
    console.log('ROL ADMIN?', role);
    setrol(role);
  };

  const handleOpenMenu = () => {
    setopenMenu(!openMenu);
    console.log('OPEN MENU', openMenu);
  };

  const handleOpenDialog = () => {
    setOpen(!open);
    setCount(0);
  };

  const handleOpenEditDialog = () => {
    setopenEdit(!openEdit);
    settableLength(tables.length);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  useFocusEffect(
    useCallback(() => {
      console.log('entreas as');
      dispatch(getTables());
    }, []),
  );
  const handleManageProfiles = () => {
    setopenMenu(!openMenu);
    navigation.navigate('ManageProfile');
  };

  const handleDecrement = () => {
    console.log('ACTUAL COUNT', count);
    if (count > 0 || count > tableLength) {
      console.log('ENTRE A COUNT > 0');
      setCount(count - 1);
    } else {
      console.log('ENTRE A COUNT NORMAL');
      setCount(0);
    }
  };

  const handleCloseSession = async () => {
    await AsyncStorage.removeItem('role');
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('accessTokenProfile');
    navigation.navigate('Login');
  };

  const handleConfirmAdd = () => {
    Alert.alert(
      'Confirmar Agregar',
      `¿Estas Seguro que deseas agregar ${count} mesa${
        count == 1 ? '?' : 's?'
      }`,
      [
        {
          text: 'SI',
          onPress: handleAddTables,
        },
        {
          text: 'NO',
          onPress: () => {},
        },
      ],
    );
  };

  const handleAddTables = async () => {
    const tablesCreated = await createTables(count);
    if (tablesCreated.status) {
      Alert.alert('Exito', 'Mesas Creadas');
      dispatch(getTables());
      setOpen(!open);
      setCount(0);
    } else if (!tablesCreated.status) {
      Alert.alert('Error', 'No se Crearon Mesas.');
    }
  };

  const handleConfirmEdit = () => {
    Alert.alert(
      'Confirmar Editar',
      'El salon ahora tendra ' + tableLength + ' mesas en total',
      [
        {
          text: 'SI',
          onPress: handleEditTables,
        },
        {
          text: 'NO',
          onPress: () => {},
        },
      ],
    );
  };

  const prueba = () => {
    console.log('prueba');
  };

  const handleEditTables = async () => {
    if (tables !== undefined && tables) {
      let eliminarMesas = tables.length - tableLength;
      let cantidad = Math.min(eliminarMesas, tables.length);
      let finish = false;
      console.log('CANTIDAD', cantidad, eliminarMesas);
      if (tableLength > tables.length) {
        let mesasAgregar = tableLength - tables.length;
        console.log('MESAS AGREGAR', mesasAgregar);
        const tablesCreated = await createTables(mesasAgregar);
        if (tablesCreated.status) {
          Alert.alert('Exito', 'Mesas Creadas');
          dispatch(getTables());
          handleOpenEditDialog();
        } else if (!tablesCreated.status) {
          Alert.alert('Error', 'No se Crearon Mesas.');
        }
      } else {
        for (let i = tables.length - 1; i >= tables.length - cantidad; i--) {
          const id = tables[i].id;
          const tablesDeleted = await deleteTables(id);
          finish = tablesDeleted.status;

          console.log('ID', id, tablesDeleted);
        }
        if (finish) {
          Alert.alert('Exito', 'Mesas Creadas');
          dispatch(getTables());
          handleOpenEditDialog();
        } else if (!finish) {
          Alert.alert('Error', 'No se Crearon Mesas.');
        }
      }
    } else {
      console.log('MESAS UNDEFINED', tables);
    }
  };
  console.log('asdasdtables', tables);

  return (
    <View style={styles.container}>
      {openMenu && rol == 'ADMIN' ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
          }}>
          <TouchableWithoutFeedback onPress={handleOpenMenu}>
            <ZStack
              maxWidth={'100%'}
              maxHeight={'100%'}
              width={'100%'}
              flex={1}>
              <YStack
                borderColor="gray"
                fullscreen
                height={175}
                width={'35%'}
                gap="$1"
                y={50}
                x={230}
                borderWidth={2}
                borderRadius="$4"
                padding="$2">
                <Button size="$3" backgroundColor={'#AA84FC'} onPress={prueba}>
                  Reportes
                </Button>
                <Button
                  size="$3"
                  backgroundColor={'#AA84FC'}
                  onPress={handleManageProfiles}>
                  Empleados
                </Button>
                <Button
                  size="$3"
                  backgroundColor={'#AA84FC'}
                  onPress={handleCloseSession}>
                  Cerrar Sesion
                </Button>
              </YStack>
            </ZStack>
          </TouchableWithoutFeedback>
        </View>
      ) : null}

      <View>
        <Navbar
          title={'Salón'}
          role={rol}
          onPressAdd={handleOpenDialog}
          onPressEdit={handleOpenEditDialog}
          showMenu={openMenu}
          onPressMenu={handleOpenMenu}
          onPlusOptions={true}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <Text style={styles.table}>Mesas ocupadas</Text>
          <Text style={[styles.ballon, {backgroundColor:'#F7505A'}]}>{mesasOcupadas.length}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <Text style={styles.table}>Mesas desocupadas</Text>
          <Text style={[styles.ballon, {backgroundColor:'#7BE769'}]}>{mesasDesocupadas.length}</Text>
        </View>
      </View>

      <View style={styles.tablesContainer}>
        <Tables tables={tables} />
      </View>
      <Dialog
        isVisible={open}
        isCount={count}
        isEdit={false}
        countTables={tables !== undefined && tables.length ? tables.length : 0}
        onHidePress={handleOpenDialog}
        title={'# Mesas Actual: '}
        description={'¿Cuantas mesas deseas agregar?'}
        onAdd={handleIncrement}
        onRemove={handleDecrement}
        onConfirm={handleConfirmAdd}
      />
      <Dialog
        isVisible={openEdit}
        editTables={tableLength}
        onEditTables={settableLength}
        isEdit={true}
        countTables={tables !== undefined && tables.length ? tables.length : 0}
        onHidePress={handleOpenEditDialog}
        title={'# Mesas Actual: '}
        description={'¿Cuantas mesas tienes actualmente?'}
        onConfirm={handleConfirmEdit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginHorizontal:10,
  },
  ballon:{
    width:45,
    height:25,
    color:'white',
    fontSize:14,
    paddingTop:2,
    textAlign:'center',
    paddingHorizontal:8,
    borderRadius:16,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: -1, height: 4},
    textShadowRadius: 6,
    marginLeft:2
  },
  table: {
    color: "#0305C5",
    marginVertical:10,
    fontSize: 15,
  },
  tablesContainer: {
    width: '100%',
    height: '86.5%',
    alignItems:'center',
    justifyContent:'center'
  }
  

});

export default Salon;
