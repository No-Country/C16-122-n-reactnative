import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'react-native-elements';
import {Icon} from '@rneui/themed';
import {Spinner, XStack, Button, View} from 'tamagui';
import ProfileCards from '../../components/ProfileCards/ProfileCards';
import {useSelector, useDispatch} from 'react-redux';
import {getProfile} from '../../redux/actions';
import {apiCreateProfile, apiDeleteProfile, apiEditProfile} from '../../apis';
import Dialog from '../../components/Dialog/DialogProfile';

function SelectPerfil({navigation}) {
  const profilesSelectPerfil = useSelector(state => state.reducers.profiles);

  const dispatch = useDispatch();
  const [rol, setrol] = useState('waitress');
  const [loading, setLoading] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isDialogVisibleEdit, setIsDialogVisibleEdit] = useState(false);
  const [profileEdit, setProfileEdit] = useState({
    name: '',
    role: '',
    pinCode: '',
  });
  const [profile, setProfile] = useState({
    name: '',
    role: '',
    pinCode: '',
  });

  useEffect(() => {
    console.log('profilesSelectPerfil', profilesSelectPerfil.profiles);
    loadRole();
  }, []);

  const loadRole = async () => {
    let role = await AsyncStorage.getItem('role');
    console.log('ROL ADMIN?', role);
    setrol(role);
  };

  const handleCleanprofile = ()=>{
    setProfile({
      name: '',
      role: '',
      pinCode: '',
    });
  }
  const handleCleanprofileEdit = ()=>{
    setProfileEdit({
      name: '',
      role: '',
      pinCode: '',
    });
  }

  const handleChangeName = name => {
    setProfile(prevProfile => ({
      ...prevProfile,
      name: name,
    }));
  };

  const handleChangeRole = role => {
    setProfile(prevProfile => ({
      ...prevProfile,
      role: role,
    }));
  };

  const handleChangeEditName = name => {
    setProfileEdit(prevProfile => ({
      ...prevProfile,
      name: name,
    }));
  };

  const handleChangeEditRole = role => {
    setProfileEdit(prevProfile => ({
      ...prevProfile,
      role: role,
    }));
  };


  const handleChangePinCode = pinCode => {
    setProfile(prevProfile => ({
      ...prevProfile,
      pinCode: pinCode,
    }));
  };

  const handleCreateProfile = async () => {
    setLoading(true);
    console.log('Perfil a Agregar', profile);
    const profileCreated = await apiCreateProfile(profile);
    if (profileCreated.status) {
      Alert.alert('Exito', 'Perfil Creado');
      dispatch(getProfile());
      setIsDialogVisible(false);
      handleCleanprofile()
      setLoading(false);
      
    } else if (!profileCreated.status) {
      Alert.alert('Error', 'No se Creo Perfil.');
      setLoading(false);
    }
  };

  const handleShowEditProfile = (perfil) => {
    setProfileEdit(perfil);
      setIsDialogVisibleEdit(true)
  }

  const handleShowDeleteProfile = (perfil) => {
    Alert.alert(
        'Eliminar Usuario',
        '¿Esta Seguro que Desea Eliminar Este Usuario?',
        [
          {
            text: 'SI',
            onPress: ()=>{handleDeleteProfile(perfil)},
          },
          {
            text: 'NO',
            onPress: () => {},
          },
        ],
      );
  }


  const handleEditProfile = async () => {
    setLoading(true);
    console.log('Perfil a Editar', profileEdit);
    const profileEdited = await apiEditProfile(profileEdit);
    if (profileEdited.status) {
      Alert.alert('Exito', 'Perfil Editado');
      dispatch(getProfile());
      setIsDialogVisibleEdit(false)
      handleCleanprofileEdit()
      setLoading(false);
    } else if (!profileEdited.status) {
      Alert.alert('Error', 'No se Creo Perfil.');
      setLoading(false);
    }
  };

  const handleDeleteProfile = async (perfil) => {
    setLoading(true);
    console.log('Perfil a Borrar', perfil);
    const profileDeleted = await apiDeleteProfile(perfil.id);
    if (profileDeleted.status) {
      Alert.alert('Exito', 'Perfil Borrado');
      dispatch(getProfile());
      setLoading(false);
    } else if (!profileDeleted.status) {
      Alert.alert('Error', 'No se Creo Perfil.');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <XStack gap="$1" justifyContent="center" style={{marginVertical: 15}}>
        <Button
            size="$3"
            chromeless
            onPress={() => {
                navigation.navigate('Salon',{role: rol});;
            }}>
            <Icon name="home" color={'gray'} />
          </Button>
          <Text style={styles.title}>Manejar Perfiles </Text>
          <Button
            size="$3"
            chromeless
            onPress={() => {
              setIsDialogVisible(true);
            }}>
            <Icon name="add-circle" color={'green'} />
          </Button>
        </XStack>
        {!loading ? (
          <ScrollView style={{marginBottom: 100}}>
            {profilesSelectPerfil.profiles !== undefined &&
            profilesSelectPerfil.profiles ? (
              profilesSelectPerfil?.profiles
                .map(profile => (
                  <ProfileCards
                    name={profile.name}
                    role={profile.role}
                    key={profile.id}
                    id={profile.id}
                    rol={rol}
                    onPressEdit={()=>{handleShowEditProfile(profile)}}
                    onPressDelete={()=>{handleShowDeleteProfile(profile)}}
                  />
                ))
                .slice(1)
            ) : (
              <Spinner size="large" color="$orange10" />
            )}
          </ScrollView>
        ) : (
          <Spinner size="large" color="$orange10" />
        )}

        <Dialog
          isVisible={isDialogVisible}
          title="Nuevo Usuario"
          labelProp1="Nombre Completo"
          labelProp2="Rol"
          labelProp3="Pin"
          prop1={profile.name}
          prop2={profile.role}
          prop3={profile.pinCode}
          onChangeProp1={handleChangeName}
          onChangeProp2={handleChangeRole}
          onChangeProp3={handleChangePinCode}
          onHidePress={() => setIsDialogVisible(false)}
          onConfirm={handleCreateProfile}
        />
        <Dialog
          isVisible={isDialogVisibleEdit}
          title="Editar Usuario"
          labelProp1="Nombre Completo"
          labelProp2="Rol"
          prop1={profileEdit.name}
          prop2={profileEdit.role}
          onChangeProp1={handleChangeEditName}
          onChangeProp2={handleChangeEditRole}
          onHidePress={() => setIsDialogVisibleEdit(false)}
          onConfirm={handleEditProfile}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 6, // Padding general
  },
  cardContainer: {
    width: '48%', // Ancho del contenedor de tarjeta para que dos tarjetas se muestren en una fila
    marginBottom: 12, // Espacio entre las tarjetas
    backgroundColor: '#B5B2B2', // Fondo blanco de las tarjetas
    borderRadius: 15, // Bordes redondeados de las tarjetas
    padding: 12, // Padding dentro del contenedor de tarjeta
    shadowColor: '#000000', // Color de la sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 2, // Radio de la sombra
    elevation: 3, // Elevación de la tarjeta
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
  },
});

export default SelectPerfil;
