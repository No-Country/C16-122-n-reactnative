import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Spinner} from 'tamagui';
import {useAppDispatch} from '../../hooks/hooks';
import {table, tableSet} from '../../reducers/tableReducer';

function Tables({tables}) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleSend = mesa => {
    let item = {
      ability: mesa.ability,
      barId: mesa.barId,
      id: mesa.id,
      isOccupied: mesa.isOccupied,
      location: mesa.location,
      tableNumber: mesa.tableNumber,
    };
    dispatch(tableSet(item));
    navigation.navigate('Order');
  };
console.log("tables",tables)
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tablesContainer}>
        {tables !== undefined && tables ? (
          tables?.map((table, index) => (
            <TouchableOpacity
              key={table.id}
              style={[
                styles.table,
                {backgroundColor: table.isOccupied ? '#F7505A' : '#7BE769'},
              ]}
              onPress={() => {
                handleSend(table);
              }}>
              <Text style={styles.tableText}>{table.tableNumber}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Spinner size="large" color="$orange10" />
        )}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    minHeight: '10%',
  },
  tablesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  table: {
    width: 100,
    height: 100,
    aspectRatio:1/1,
    resizeMode:'contain',
    backgroundColor: 'white', // Cambiado a fondo blanco
    borderRadius: 10, // Bordes redondeados
    alignItems: 'center', // Centra el contenido horizontalmente
    justifyContent: 'center', // Centra el contenido verticalmente
    marginVertical: 10, // Espacio vertical entre mesas
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 5,
  },
  tableText: {
    paddingTop:4,
    fontSize: 30,
    color:'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: -1, height: 4},
    textShadowRadius: 6
  },
});

export default Tables;
