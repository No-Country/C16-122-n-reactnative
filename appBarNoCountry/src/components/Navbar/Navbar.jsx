import * as React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon, ListItem, Avatar} from '@rneui/themed';
import {Button, XGroup, XStack, YStack, ZStack} from 'tamagui';
import adminImage from '../../assets/menu/admin.png';
import employeeImage from '../../assets/waiter.png';
import chefImage from '../../assets/chef.png';

function Navbar({
  role,
  title,
  onPressAdd,
  onPressEdit,
  onPressMenu,
  onPlusOptions,
  isGoBack
}) {
  const navigation = useNavigation();
  const [expanded, setExpanded] = React.useState(false);

  let imageSource;

  if (role === 'ADMIN') {
    imageSource = adminImage;
  } else if (role === 'EMPLOYEE') {
    imageSource = employeeImage;
  } else {
    imageSource = chefImage;
  }
  return (
    <View style={styles.navbar}>
      <View style={styles.titleContainer}>
        <View style={{flexDirection: 'row'}}>
          {isGoBack ? (
            <Button
              size="$3"
              chromeless
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="arrow-back" />
            </Button>
          ) : null}

          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      {role === 'ADMIN' ? (
        <XStack gap="$-3" justifyContent="center" style={{marginRight: 5}}>
          <Button size="$3" chromeless onPress={onPressAdd}>
            <Icon name="add-circle" color={'#4505D0'} iconStyle={styles.iconStyle} />
          </Button>
          {onPlusOptions ? (
            <>
              <Button size="$3" chromeless onPress={onPressEdit}>
                <Icon name="edit" color={'#4505D0'} iconStyle={styles.iconStyle} />
              </Button>
              <Button size="$3" chromeless onPress={onPressMenu}>
                <Icon name="menu" color={'#4505D0'} iconStyle={styles.iconStyle} />
              </Button>
            </>
          ) : null}
        </XStack>
      ) : null}

      {onPlusOptions ? (
        <TouchableOpacity onPress={() => navigation.navigate('SelectPerfil')}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={imageSource}
            />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 0,
    backgroundColor: '#D0BBFD', // Color de fondo de la barra de navegación
  },
  titleContainer: {
    flex: 1,
  },
  iconStyle: {paddingVertical:5,
  textShadowColor: 'rgba(0, 0, 0, 0.1)',
  textShadowOffset: {width: -1, height: 4},
  textShadowRadius: 6
  },
  title: {
    fontSize: 26,
    color: '#0305C5',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 10,// Ajustar el espacio vertical para centrar el texto
    paddingHorizontal: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: -1, height: 4},
    textShadowRadius: 6
  },
  imageContainer: {
    // Ajusta el contenedor de la imagen según sea necesario
  },
  image: {
    width: 40,
    height: 40,

  },
});

export default Navbar;
