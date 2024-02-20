import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Navbar from '../../components/Navbar/Navbar';
import Tables from '../../components/Tables/Tables';

function Salon() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Navbar />
      </View>
      <View style={styles.textContainer}>
        <Text>Mesas ocupadas:</Text>
        <Text>Mesas desocupadas:</Text>
      </View>

      <Tables />
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
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

export default Salon;
