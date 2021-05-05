import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';

import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  }
}

const PlantCardPrimary = ({ data, ...rest}: PlantProps) => {
  const { colors } = useTheme();

  return (
    <RectButton
      style={[styles.container, { backgroundColor: colors.shape }]}
      {...rest}
    >
      <SvgFromUri 
        uri={data.photo} 
        width={70}
        height={70}
      />
      <Text style={[styles.text, { color: colors.green_dark }]}>
        { data.name }
      </Text>
    </RectButton>
  )
}

export default PlantCardPrimary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10
  },
  text: {
    fontFamily: fonts.heading,
    marginVertical: 16
  }
})