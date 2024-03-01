import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function Password() {
  const navigation = useNavigation();

  const handleSignUP = () => {
    navigation.navigate('SignUp' as never);
  };

  const handleLogIn = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/landing-page.png')}
        style={styles.image}
      />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Ingresa tu correo</Text>
        <TextInput style={styles.input} />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>Recupera tu contraseña</Text>
      </TouchableOpacity>

      <View style={styles.createCountContainer}>
        <Text>¿Aún no tienes una cuenta?</Text>
        <TouchableOpacity onPress={handleSignUP}>
          <Text style={styles.createCount}>Registrarme</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.createCountContainer}>
        <Text>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity onPress={handleLogIn}>
          <Text style={styles.createCount}>Inicia sesión</Text>
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
    marginTop: 20,
  },
  formContainer: {
    display: 'flex',
    gap: 10,
    marginTop: 60,
  },
  input: {
    borderRadius: 8,
    backgroundColor: '#D7D7D7',
    width: 288,
    height: 35,
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
    marginTop: 60,
    marginBottom: 40,
  },
  textButton: {
    textAlign: 'center',
    color: '#4505D0',
    fontWeight: 'bold',
    fontSize: 16,
  },
  createCountContainer: {
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 10,
  },
  createCount: {
    color: '#3F86FC',
    lineHeight: 17.07,
  },
});

export default Password;
