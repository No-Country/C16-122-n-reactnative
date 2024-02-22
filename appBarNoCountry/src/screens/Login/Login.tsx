import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSend = () => {
    console.log('Nombre:', user);
    console.log('Password:', password);

    navigation.navigate('SelectPerfil' as never);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp' as never);
  };

  const handleMenu = () => {
    navigation.navigate('Menu' as never);
  };

  const handlePassword = () => {
    navigation.navigate('Password' as never);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/landing-page.png')}
        style={styles.image}
      />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput style={styles.input} value={user} onChangeText={setUser} />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={handlePassword}>
          <Text style={styles.textPassword}>Olvide Mi contraseña</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSend} style={styles.button}>
        <Text style={styles.textButton}>Inicia sesión</Text>
      </TouchableOpacity>

      <View style={styles.createCountContainer}>
        <Text>¿Aún no tienes una cuenta?</Text>
        <TouchableOpacity onPress={handleMenu}>
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
    width: 288,
    height: 35,
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
});

export default Login;
