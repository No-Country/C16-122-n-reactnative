import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import {Spinner} from 'tamagui';
import {View} from 'tamagui';
import ProfileCards from '../../components/ProfileCards/ProfileCards';
import {useSelector} from 'react-redux';

function SelectPerfil() {
  const profilesSelectPerfil = useSelector(state => state.reducers.profiles);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Selecciona tu perfil</Text>
        <ScrollView>
          <View style={styles.profilesContainer}>

          {profilesSelectPerfil.profiles !== undefined &&
          profilesSelectPerfil.profiles ? (
            profilesSelectPerfil?.profiles.map(profile => (
              <ProfileCards
                name={profile.name}
                role={profile.role}
                key={profile.id}
                id={profile.id}
              />
            ))
          ) : (
            <Spinner size="large" color="$orange10" />
          )}
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    backgroundColor: '#EEEBEB',
    borderWidth: 1,
    width:'100%',
    height:'100%'
  },
  profilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Alinear las columnas en el espacio disponible
    paddingHorizontal: 10, // Añadir espacio horizontal para evitar que los perfiles toquen los bordes
    paddingBottom: 10, // Añadir espacio en la parte inferior para evitar que los perfiles toquen el borde inferior
  },
  title: {
    fontSize: 26,
    color: '#0305C5',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 10, // Ajustar el espacio vertical para centrar el texto
  },
});

export default SelectPerfil;
