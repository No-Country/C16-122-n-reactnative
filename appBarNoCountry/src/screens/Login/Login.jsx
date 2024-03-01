import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Spinner} from 'tamagui';
import {apiLogin} from '../../apis';
import {getProfile} from '../../redux/actions';
import { useNavigation } from '@react-navigation/native'; // Agregado para usar la navegación
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {
  const dispatch = useDispatch(); // Obtiene la función de despacho de Redux
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña
  const navigation = useNavigation(); // Instanciación de useNavigation
  
  const handleSend = async () => {
    setloading(true);
    const userData = {
      userName: userName,
      password: password,
    };

    try {
      const resp = await apiLogin(userData);
      console.log('Respuesta del login:', resp);
      await AsyncStorage.setItem('accessToken', resp.token);
      console.log('Token guardado correctamente en AsyncStorage.');
      setloading(false);
      Alert.alert('Éxito', 'Sesion iniciada', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(getProfile());
            navigation.navigate('SelectPerfil');
          },
        },
      ]);
    } catch (error) {
      console.log('Error al login:', error);
      setloading(false);
      Alert.alert(
        'Error',
        'Usuario no encontrado, por favor intentelo de nuevo',
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ],
      );
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handlePassword = () => {
    navigation.navigate('Password');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // useEffect(() => {
  //   dispatch(getProfile());
  //   // Despacha la acción para obtener los perfiles
  // }, [dispatch]); // Dependencia dispatch, para asegurarse de que se ejecute solo una vez

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/landing-page.png')}
        style={styles.image}
      />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
        />
        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} // Oculta la contraseña si showPassword es falso
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handlePassword}>
          <Text style={styles.textPassword}>Olvide Mi contraseña</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Spinner size="large" color="$orange10" />
      ) : (
        <TouchableOpacity onPress={handleSend} style={styles.button}>
          <Text style={styles.textButton}>Inicia sesión</Text>
        </TouchableOpacity>
      )}

      <View style={styles.createCountContainer}>
        <Text>¿Aún no tienes una cuenta?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.createCount}>Registrarme</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 174,
    height: 163.8,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 100,
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  formContainer: {
    display: 'flex',
    gap: 10,
    marginTop: 40,
  },
  input: {
    borderRadius: 8,
    backgroundColor: '#D7D7D7',
    padding: 10,
    width: 288,
    height: 35,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  passwordInput: {
    flex: 1,
    height: 35,
    padding: 10,
    backgroundColor: '#D7D7D7',
    borderRadius: 8,
    borderTopRightRadius:0 ,
    borderBottomRightRadius: 0
  },
  textTitle: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'left',
    padding: 10,
  },
  textButton: {
    textAlign: 'center',
    color: '#4505D0',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textPassword: {
    color: '#3F86FC',
    textAlign: 'right',
    fontWeight: '400',
    fontFamily: 'Montserrat',
  },
  button: {
    width: 186,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
    marginTop: 40,
  },
  createCountContainer: {
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 50,
  },
  createCount: {
    color: '#3F86FC',
    lineHeight: 17.07,
  },
  eyeIcon: {
    fontSize: 15,
    paddingHorizontal: 10,
    height: 35,
    padding: 10,
    backgroundColor: '#D7D7D7',
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

export default Login;
