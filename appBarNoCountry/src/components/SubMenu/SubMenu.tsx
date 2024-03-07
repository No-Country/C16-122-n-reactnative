import React from 'react';
import {Button, YStack, ZStack} from 'tamagui';
import { View, TouchableWithoutFeedback } from 'react-native';

interface SubMenuProps {
  showCategories: () => void;
  showReports: ()=> void;
  showEmployers: () => void;
  closeSession: () => void;
  handleOpenMenu: () => void;
}

const Dialog: React.FC<SubMenuProps> = ({
  showCategories,
  showReports,
  showEmployers,
  closeSession,
  handleOpenMenu
}) => {
  return (
    <View>
    <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
          }}>
          <TouchableWithoutFeedback onPress={handleOpenMenu}>
          <ZStack maxWidth={'100%'} maxHeight={'100%'} width={'100%'} flex={1}>
            <YStack
              borderColor="gray"
              fullscreen
              height={175}
              width={'35%'}
              gap="$1"
              y={50}
              x={230}
              borderWidth={2}
              borderRadius="$4"
              padding="$2">
              <Button size="$3" backgroundColor={'#AA84FC'} onPress={showCategories}>
                Categorias
              </Button>
              <Button size="$3" backgroundColor={'#AA84FC'} onPress={showReports}>
                Reportes
              </Button>
              <Button size="$3" backgroundColor={'#AA84FC'} onPress={showEmployers}>
                Empleados
              </Button>
              <Button size="$3" backgroundColor={'#AA84FC'} onPress={closeSession}>
                Cerrar Sesion
              </Button>
            </YStack>
            </ZStack>
          </TouchableWithoutFeedback>
        </View>
        </View>
  );
}
