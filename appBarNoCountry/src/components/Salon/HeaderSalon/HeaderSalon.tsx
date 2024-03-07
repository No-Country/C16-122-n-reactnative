import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import MenuView from '../MenuView/MenuView';

const HeaderSalon = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  };
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Salón</Text>
      <View style={styles.optionsHeader}>
        <TouchableOpacity>
          <Image
            style={styles.Images}
            source={require('../../../assets/add-table.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.Images}
            source={require('../../../assets/pencil.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShowMenu}>
          <Image
            style={styles.Images}
            source={require('../../../assets/menu.png')}
          />
        </TouchableOpacity>
      </View>
      {showMenu && ( 
        <View style={styles.MenuViewContainer}>
          <MenuView />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    color: '#0305C5',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 10, // Ajustar el espacio vertical para centrar el texto
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 4},
    textShadowRadius: 6
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 25,
    backgroundColor: '#b897ff',
    position: 'relative',
  },
  optionsHeader: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Images: {
    width: 30,
    height: 30,
  },
  MenuViewContainer: {
    position: 'absolute',
    right: 0,
    top: 80,
  },
});

export default HeaderSalon;
