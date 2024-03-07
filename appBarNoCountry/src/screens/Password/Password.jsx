import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { passwordRecovery } from '../../apis';

function Password() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleSignUP = () => {
    navigation.navigate('SignUp');
  };

  const handleLogIn = () => {
    navigation.navigate('Login');
  };

  const handleCode = async () => {
    try {
      const resp = await passwordRecovery(email.trim());
      // console.log("respPASSWRD",resp);
      
      Alert.alert('Éxito', resp.msg, [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('CodePassword');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.response.data.message , [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/landing-page.png')}
        style={styles.image}
      />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Ingresa tu correo</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCode}>
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
    height: '100%',
  },
  image: {
    width: 174,
    height: 163.8,
    padding: 0,
    marginBottom:25,
  },
  formContainer: {
    display: 'flex',
    gap: 0,
    marginTop: 30,
  },
  input: {
    borderRadius: 8,
    backgroundColor: '#D7D7D7',
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginVertical: 0,
    width: 288,
    height: 35,
  },
  label: {
    fontSize: 16,
    color: '#0305C5',
    marginBottom:-6
  },
  button: {
    width: 200,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
    marginVertical: 45,
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
    marginBottom:10,
  },
  createCount: {
    color: '#3F86FC',
  },
});

export default Password;
