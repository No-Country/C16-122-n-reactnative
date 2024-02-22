import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function SignUp() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const handleSend = () => {
    console.log('Nombre:', user);
    console.log('Email:', email);
    console.log('Password:', password);

    navigation.navigate('SelectPerfil' as never);
  };

  const handleLogIn = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <View style={styles.signUpContainer}>
      <View style={styles.acountContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/landing-page.png')}
        />
        <Text>Completa los campos para crear una cuenta</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.labelInput}>Usuario</Text>
        <TextInput style={styles.input} value={user} onChangeText={setUser} />
        <Text style={styles.labelInput}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <Text style={styles.labelInput}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.sendContainer}>
        <TouchableOpacity onPress={handleSend} style={styles.button}>
          <Text style={styles.textButton}>Registrame</Text>
        </TouchableOpacity>

        <View style={styles.logInContainer}>
          <Text>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={handleLogIn}>
            <Text style={styles.textLogIn}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  acountContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    padding: 30,
    marginTop: 20,
  },
  image: {
    backgroundColor: '#fff',
    borderRadius: 200,
    width: 60,
    height: 60,
  },
  textSigUp: {
    textAlign: 'left',
    padding: 10,
    borderBottomColor: 'gray',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    padding: 20,
  },
  input: {
    backgroundColor: '#D7D7D7',
    width: 280,
    height: 35,
    borderRadius: 8,
  },
  labelInput: {
    fontWeight: 'bold',
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
    marginTop: 20,
  },
  textButton: {
    textAlign: 'center',
    color: '#4505D0',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logInContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    padding: 20,
  },
  textLogIn: {
    color: '#3F86FC',
  },
});

export default SignUp;
