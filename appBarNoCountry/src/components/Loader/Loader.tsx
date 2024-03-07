import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Spinner} from 'tamagui';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const Loader = () => {
  const {isLoading} = useSelector((state: RootState) => state.reducers);
  return (
    <>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <Spinner size="large" color="$green10" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffffd9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Loader;
