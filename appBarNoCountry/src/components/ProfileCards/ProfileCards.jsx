import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {Button, XStack, Input, View, YStack} from 'tamagui';
import {Icon} from '@rneui/themed';
import adminImage from '../../assets/menu/admin.png';
import employeeImage from '../../assets/waiter.png';
import chefImage from '../../assets/chef.png';
import { color } from '@rneui/base';

function ProfileCards({
  name,
  role,
  id,
  rol,
  onPressAdd,
  onPressEdit,
  onPressDelete,
}) {
  const navigation = useNavigation();

  const handleSalonAdm = () => {
    navigation.navigate('ProfilePin', {idProfile: id, role: role, name: name});
  };
  let imageSource;
  let rolTraducido;
  if (role === 'ADMIN') {
    imageSource = adminImage;
    rolTraducido = 'Administrador'
  } else if (role === 'EMPLOYEE') {
    imageSource = employeeImage;
    rolTraducido = 'Mesero'
  } else {
    imageSource = chefImage;
    rolTraducido = 'Cocinero'
  }



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSalonAdm} style={styles.cardContainer}>
        <View>
          <Image
            style={styles.image}
            source={imageSource}
          />
          <YStack
            gap="$1"
            justifyContent="center"
            alignItems="center"
            padding="$2">
            <Text style={[styles.titleName]}>{name}</Text>
            <Text style={[styles.titleProfile]}>{rolTraducido}</Text>
            {rol == 'ADMIN' ? (
              <XStack gap="$1" justifyContent="center" style={{marginRight: 5}}>
                <Button size="$3" chromeless onPress={onPressEdit}>
                  <Icon name="edit" color={'yellow'} />
                </Button>
                <Button size="$3" chromeless onPress={onPressDelete}>
                  <Icon name="delete" color={'red'} />
                </Button>
              </XStack>
            ) : null}
          </YStack>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ProfileCards;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#EEEBEB',
    width: '50%',
    // Centrar elementos horizontalmente
  },
  imageContainer: {
    marginBottom: 10,
    // Espacio entre la imagen y el texto
  },
  cardContainer: {
    width: '80%',
    display: 'flex',
    borderRadius: 16,
    justifyContent: 'center',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowColor: 'black',
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 5,

  },
  image: {
    width: 70,
    height: 70,
    alignSelf: 'center'
  },

  titleName: {
    fontWeight: '400', // Texto en negrita
    textAlign: 'center', // Centrar texto horizontalmente
    fontSize: 16,
    lineHeight: 25,
    color:'#0305C5',
    marginBottom:-8,
  },
  titleProfile: {
    fontSize: 10,
    fontWeight:'400',
    color: '#8586FF'
  },
});
