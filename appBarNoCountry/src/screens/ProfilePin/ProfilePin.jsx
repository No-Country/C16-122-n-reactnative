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
import {useDispatch} from 'react-redux';
import {setProfileSession} from '../../redux/actions';
import adminImage from '../../assets/menu/admin.png';
import employeeImage from '../../assets/waiter.png';
import chefImage from '../../assets/chef.png';

function ProfilePin({route}) {
  const [pin, setPin] = useState('');
  const navigation = useNavigation();
  const {idProfile, role, name} = route.params;

  const dispatch = useDispatch();

  const handleLogin = async () => {
    const profileLogin = await postLoginProfile(pin.trim(), idProfile);
    const {profile} = profileLogin;
    dispatch(setProfileSession(profile));
    if (profileLogin.status) {
      Alert.alert('Exito', 'PIN correcto.');
      navigation.navigate('Salon', {role: role});
    } else if (!profileLogin.status) {
      Alert.alert('Error', 'PIN incorrecto. Por favor, inténtalo de nuevo.');
      setPin('');
    }
  };



  let imageSource;

  if (role === 'ADMIN') {
    imageSource = adminImage;
  } else if (role === 'EMPLOYEE') {
    imageSource = employeeImage;
  } else {
    imageSource = chefImage;
  }


   

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={imageSource}
      />
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.title}>Ingrese el Pin (2bc6e8)</Text>
      <TextInput
        style={styles.input}
        placeholder="PIN"
        value={pin}
        onChangeText={setPin}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.textButton}>Ingresar</Text>
      </TouchableOpacity>

    </View>
  );
}

export default ProfilePin;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    gap: 30,
    marginTop: 20,
  },
  text:{
    color: "#2A2A2A",
    fontSize: 16,
  },
  input: {
    width: '50%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 0,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#D7D7D7',
  },
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#0305C5',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  textButton:{
    color: "#4505D0",
    fontWeight: "bold",
    fontSize:16,
    textAlign: "center"
  }
});
