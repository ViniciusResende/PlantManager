import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import loadAnimation from '../assets/load.json';
import { useTheme } from '../context/ThemeContext';

const Load = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LottieView 
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  )
}

export default Load;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation: {
    backgroundColor: 'transparent',
    width: 200,
    height: 200
  }
})