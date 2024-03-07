import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, XGroup, XStack, YStack, Input} from 'tamagui';
import RNPickerSelect, {Item} from 'react-native-picker-select';
import {Icon} from '@rneui/themed';
import {Picker} from '@react-native-picker/picker';

interface DialogGeneralProps {
  isVisible: boolean;
  title: string;
  labelProp1?: string;
  labelProp2?: string;
  labelProp3?: string;
  labelProp4?: string;
  prop1?: string;
  prop2?: string;
  prop3?: string;
  prop4?: string | number;
  arrayValues?: any[];
  onHidePress: () => void;
  onChangeProp1: (text: string) => void;
  onChangeProp2?: (text: string) => void;
  onChangeProp3?: (text: string) => void;
  onChangeProp4?: (value: any) => void;
  onConfirm: () => void;
}
const DialogGeneral: React.FC<DialogGeneralProps> = ({
  isVisible,
  title,
  labelProp1,
  labelProp2,
  labelProp3,
  labelProp4,
  prop1,
  prop3,
  prop2,
  prop4,
  onChangeProp1,
  arrayValues,
  onHidePress,
  onConfirm,
  onChangeProp2,
  onChangeProp3,
  onChangeProp4,
}) => {
  const [selectedRole, setSelectedRole] = useState('EMPLOYEE');

  const [pickerFocused, setPickerFocused] = useState(false);

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
              <Text style={styles.modalText}>{title}</Text>
              <View style={styles.buttonsView}>
                <YStack
                  gap="$1"
                  justifyContent="center"
                  alignItems="center"
                  padding="$2">
                  {labelProp1 && (
                    <XStack
                      gap="$2"
                      width={'100%'}
                      justifyContent="center"
                      alignItems="center"
                      style={{marginRight: 5}}>
                      <YStack width={'41%'}>
                        <Text style={styles.descriptionText}>{labelProp1}</Text>
                      </YStack>

                      <Input
                        value={prop1}
                        onChangeText={(text: string) => {
                          onChangeProp1(text);
                        }}
                        flex={1}
                        size="$3"
                        borderWidth={2}
                        placeholder={`Nombre Completo`}
                        style={styles.modalInput}
                      />
                    </XStack>
                  )}
                  {labelProp2 && (
                    <XStack
                      gap="$2"
                      width={'100%'}
                      justifyContent="center"
                      alignItems="center"
                      style={{marginRight: 5}}>
                      <YStack width={'41%'}>
                        <Text style={styles.descriptionText}>{labelProp2}</Text>
                      </YStack>

                      <Input
                        value={prop2}
                        onChangeText={(text: string) => {
                          onChangeProp2?.(text);
                        }}
                        flex={1}
                        size="$3"
                        borderWidth={2}
                        placeholder={`Nombre Completo`}
                        style={styles.modalInput}
                      />
                    </XStack>
                  )}
                  {labelProp3 && (
                    <XStack
                      gap="$2"
                      width={'100%'}
                      justifyContent="center"
                      alignItems="center"
                      style={{marginRight: 5}}>
                      <YStack width={'41%'}>
                        <Text style={styles.descriptionText}>{labelProp3}</Text>
                      </YStack>
                      <Input
                        value={prop3}
                        onChangeText={(text: string) => {
                          onChangeProp3?.(text);
                        }}
                        flex={1}
                        size="$3"
                        borderWidth={2}
                        placeholder={`Pin`}
                        style={styles.modalInput}
                      />
                    </XStack>
                  )}

                  {labelProp4 && (
                    <XStack
                      gap="$2"
                      width={'100%'}
                      justifyContent="center"
                      alignItems="center"
                      style={{marginRight: 5}}>
                      <YStack width={'41%'}>
                        <Text style={styles.descriptionText}>{labelProp4}</Text>
                      </YStack>
                      <View style={{width: '59%', paddingBottom: 10}}>
                        <RNPickerSelect
                          style={{
                            inputIOS: {
                              width: 200,
                              fontSize: 16,
                              borderWidth: 1,
                              borderColor: 'black',
                              borderRadius: 4,
                              color: 'black',
                            },
                            inputAndroid: {
                              width: 200,
                              fontSize: 16,
                              borderWidth: 1,
                              borderColor: 'black',
                              borderRadius: 8,
                              color: 'black',
                            },
                          }}
                          onValueChange={value => onChangeProp4?.(value)}
                          value={prop4}
                          items={arrayValues as Item[]}
                        />
                      </View>
                    </XStack>
                  )}
                </YStack>
              </View>
              <Button
                size="$3"
                backgroundColor={'$green10'}
                onPress={onConfirm}>
                OK
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo gris translúcido
  },
  modalInput: {
    backgroundColor: 'white',
    color: 'black',
    paddingVertical: 0,
    marginVertical: 10,
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

export default DialogGeneral;
