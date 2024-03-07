import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useState} from 'react';
import {newPasswordApi} from './../../apis.js';
import { useNavigation } from '@react-navigation/native';

function CodePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');

  const navigation = useNavigation()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSend = async () => {
    try {
      if (newPassword.trim() === confirmPassword.trim()) {
        const resp = await newPasswordApi(code.trim(), newPassword.trim());
        Alert.alert('Éxito', resp.msg, [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }
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
      <Text>Ingrese el codigo que se le envio a su correo electronico:</Text>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={code}
          onChangeText={setCode}
          secureTextEntry={!showPassword} // Oculta la contraseña si showPassword es falso
        />
      </View>
      <Text>Ingrese la nueva contraseña:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showPassword} // Oculta la contraseña si showPassword es falso
        />
      </View>

      <Text>Confirme su contraseña:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword} // Oculta la contraseña si showPassword es falso
        />
      </View>
      <TouchableOpacity onPress={toggleShowPassword} style={styles.button}>
        <Text style={styles.eyeIcon}>
          {showPassword ? '👁️No Ver' : '👁️Ver'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSend} style={styles.button}>
        <Text style={styles.textButton}>Enviar</Text>
      </TouchableOpacity>
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
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
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
  button: {
    width: 186,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#D0BBFD',
    borderWidth: 1,
    borderColor: '#AA84FC',
    marginTop: 40,
  },
  textButton: {
    textAlign: 'center',
    color: '#4505D0',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CodePassword;
