import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from '@rneui/themed';
import {Button, XStack, Input} from 'tamagui';

interface DialogProps {
  isVisible: boolean;
  isEdit: boolean;
  isCount: number;
  editTables: number;
  countTables: number;
  onHidePress: () => void;
  onEditTables: (text:number)=> void;
  title: string;
  description: string;
  onAdd: () => void;
  onConfirm: () => void;
  onRemove: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  isVisible,
  title,
  isEdit,
  editTables,
  description,
  isCount,
  countTables,
  onEditTables,
  onHidePress,
  onConfirm,
  onAdd,
  onRemove,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onHidePress}>
      <TouchableWithoutFeedback onPress={onHidePress}>
        <View style={styles.overlay}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {title}
                <Text style={styles.cantText}>{countTables}</Text>
              </Text>
              <Text style={styles.descriptionText}>{description}</Text>
              <View style={styles.buttonsView}>
                {isEdit ? (
                  <XStack
                    gap="$1"
                    width={'15%'}
                    justifyContent="center"
                    alignItems="center"
                    style={{marginRight: 5}}>
                    <Input
                      maxLength={3}
                      value={editTables === null ? '' : editTables.toString() }
                      onChangeText={(text:string) => {
                        // Validar si el texto no está vacío antes de intentar convertirlo a número
                        if (text.trim() === '') {
                          // Si el texto está vacío, enviar 0 a onEditTables
                          onEditTables(0);
                        } else {
                          // Si el texto no está vacío, convertirlo a número y enviarlo a onEditTables
                          const numberValue = parseInt(text);
                          if (!isNaN(numberValue)) { // Verificar si es un número válido
                            onEditTables(numberValue);
                          }
                        }
                      }}
                      flex={1}
                      size="$3"
                      borderWidth={2}
                      placeholder={`00`}
                      style={{backgroundColor: 'white', color: 'black', paddingVertical: 0, textAlign: 'center', marginVertical: 10 }}
                    />
                  </XStack>
                ) : (
                  <XStack
                    gap="$1"
                    justifyContent="center"
                    alignItems="center"
                    style={{marginRight: 5}}>

                    <Button size="$3" chromeless onPress={onRemove} style={{marginBottom:15}}>
                      <Icon name="remove" color={'red'} />
                    </Button>
                    <Text style={styles.modalText}>{isCount.toString()}</Text>
                    <Button size="$3" chromeless onPress={onAdd} style={{marginBottom:15}}>
                      <Icon name="add" color={'green'} />
                    </Button>
                  </XStack>
                )}
              </View>
              <Button
                size="$3"
                backgroundColor={'$green10'}
                onPress={onConfirm}
                style={{marginRight: 5}}>
                OK
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const buttonStyle = StyleSheet.create({
  container: {
    backgroundColor: '#835cf5',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 5,
    marginTop: 5,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
  },
});
const buttonStyle2 = StyleSheet.create({
  container: {
    backgroundColor: '#a285f3',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 5,
    marginTop: 5,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
  },
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo gris translúcido
  },
  buttonsView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '95%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 23,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  descriptionText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cantText: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default Dialog;
