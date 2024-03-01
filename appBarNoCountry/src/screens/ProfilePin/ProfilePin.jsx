import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {postLoginProfile} from '../../apis';
import {useNavigation} from '@react-navigation/native';

function ProfilePin({ route }) {
  const [pin, setPin] = useState('');
  const [showInput, setShowInput] = useState(false);
  const navigation = useNavigation();
  // const {idProfile, role, name} = route.params;

  const handleLogin = async () => {
    const profileLogin = await postLoginProfile(pin, idProfile);
    // console.log(profileLogin.status);
    if (profileLogin.status) {
      Alert.alert('Exito', 'PIN correcto.');
      navigation.navigate('Salon');
    } else if (!profileLogin.status) {
      Alert.alert('Error', 'PIN incorrecto. Por favor, inténtalo de nuevo.');
      setPin('');
    }
    setShowInput(false);
  };

  const handleNumberPress = number => {
    setPin(pin + number);
    setShowInput(true);
  };

  const handleDeleteItem = () => {
    setPin('');
    setShowInput(false);
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Para cancelar una mesa ingresa tu PIN</Text>

      <View style={styles.deleteContainer}>
        <TextInput style={styles.pinInput} value={pin} editable={false} />
        <TouchableOpacity onPress={handleDeleteItem}>
          <Image
            style={styles.delete}
            source={require('../../assets/trash.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.numbersContainer}>
        <View style={styles.row}>
          {numbers.slice(0, 3).map(number => (
            <TouchableOpacity
              style={styles.ItemNumber}
              key={number}
              onPress={() => handleNumberPress(number)}>
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {numbers.slice(3, 6).map(number => (
            <TouchableOpacity
              style={styles.ItemNumber}
              key={number}
              onPress={() => handleNumberPress(number)}>
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {numbers.slice(6, 9).map(number => (
            <TouchableOpacity
              style={styles.ItemNumber}
              key={number}
              onPress={() => handleNumberPress(number)}>
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {numbers.slice(9, 10).map(number => (
            <TouchableOpacity
              style={styles.ItemNumber}
              key={number}
              onPress={() => handleNumberPress(number)}>
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfilePin;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    gap: 20,
    borderWidth: 1,
    borderColor: '#000',
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#0305C5',
    textAlign: 'center',
  },
  numbersContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 10,
  },
  number: {
    fontSize: 20,
    marginHorizontal: 10,
    color: '#0305C5',
    fontWeight: 'bold',
  },
  ItemNumber: {
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
    width: 80,
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: '#3032FC',
    backgroundColor: '#8586FF',
    padding: 10,
    borderRadius: 16,
    width: 90,
    height: 45,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  pinInput: {
    height: 40,
    width: 200,
    borderColor: '#3032FC',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  deleteContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  delete: {
    width: 25,
    height: 25,
    marginTop: 4,
  },
});
 