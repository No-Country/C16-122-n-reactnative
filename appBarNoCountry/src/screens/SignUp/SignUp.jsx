import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { Button, Spinner } from 'tamagui'
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { signUpApi } from '../../apis';
import validation from '../../validation';

function SignUp() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setloading] = useState(false)

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const formState = {name, userName, email, password}; // Estado actual del formulario
    const errors = validation(formState); // Validar el formulario
    setErrors(errors); // Actualizar el estado de los errores
    setIsValid(Object.keys(errors).length === 0); // Verificar si el formulario es válido
  }, [name, userName, email, password]);//

  const navigation = useNavigation();

  const handleSend = async () => {
    setloading(true)
    const userData = {
      name: name.trim(),
      userName: userName.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    try {
      const response = await signUpApi(userData);
      console.log('Respuesta del registro:', response);
      setloading(false)
      Alert.alert('Éxito', 'Usuario creado correctamente', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ]);
    } catch (error) {
      console.log('Error al registrar:', error);
      setloading(false)
      Alert.alert('Error', 'Usuario ya Existe', [
        {
          text: 'OK',
          onPress: () => {
          },
        },
      ]);
    }
  };

  const handleLogIn = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.signUpContainer}>
      <ScrollView>
      <View style={styles.acountContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/landing-page.png')}
        />
        <Text style={styles.information}>Completa los campos para crear una cuenta</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre del Bar/Restaurante</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
        />
        {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      <View style={styles.sendContainer}>
        { loading ?
          <Spinner size="large" color="$orange10" />:
          <TouchableOpacity
          onPress={handleSend}
          style={[styles.button, !isValid && styles.disabledButton]}
          disabled={!isValid}>
          <Text style={[styles.textButton, !isValid && styles.disabledButton]}>Regístrame</Text>
        </TouchableOpacity>
        }
        

        <View style={styles.logInContainer}>
          <Text>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={handleLogIn}>
            <Text style={styles.textLogIn}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    width:'100%',
    display: 'flex',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%'
  },
  acountContainer: {
    width:'100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    padding: 30,
    marginTop: 20,
  },
  image: {
    width: 70,
    height: 70,
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
  },
  input: {
    borderRadius: 8,
    backgroundColor: '#D7D7D7',
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginVertical: 0,
    width: 288,
    height: 35,
    marginBottom:15
  },
  label: {
    fontSize: 16,
    color: '#0305C5',
    marginBottom:-6
  },
  sendContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
  },
  button: {
    width: 186,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
    marginTop: 2,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    color: '#eee',
    borderColor: '#aaa',
  },
  textButton: {
    textAlign: 'center',
    color: '#4505D0',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logInContainer: {
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  textLogIn: {
    color: '#3F86FC',
  },
  errorText: {
    color: 'red',
    marginTop: -20,
  },
  information: {
    color: '#8586FF',
    fontSize: 15,
    marginVertical: 10,
  }
});

export default SignUp;
