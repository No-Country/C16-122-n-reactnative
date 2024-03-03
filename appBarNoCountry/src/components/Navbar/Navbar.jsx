import * as React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon, ListItem, Avatar} from '@rneui/themed';
import {Button, XGroup, XStack, YStack, ZStack} from 'tamagui';

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
        <XStack gap="$1" justifyContent="center" style={{marginRight: 5}}>
          <Button size="$3" chromeless onPress={onPressAdd}>
            <Icon name="add-circle" color={'green'} />
          </Button>
          {onPlusOptions ? (
            <>
              <Button size="$3" chromeless onPress={onPressEdit}>
                <Icon name="edit" />
              </Button>
              <Button size="$3" chromeless onPress={onPressMenu}>
                <Icon name="menu" />
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
              source={
                role === 'ADMIN'
                  ? require('../../assets/menu/addmin.png')
                  : require('../../assets/menu/waiter.png')
              }
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
    paddingVertical: 10,
    backgroundColor: '#AA84FC', // Color de fondo de la barra de navegación
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    marginTop: 5,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
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
