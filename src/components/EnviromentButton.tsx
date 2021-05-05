import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from '../context/ThemeContext';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps{
  title: string;
  active?: boolean;
}

const EnviromentButton = ({
  title,
  active = false,
  ...rest
}: EnviromentButtonProps) => {
  const { colors } = useTheme();
  
  return (
    <RectButton
      style={[
        styles.container,
        { backgroundColor: colors.shape},
        active && { backgroundColor: colors.green_light },
      ]}
      {...rest}
    >
      <Text style={[
        styles.text,
        active && styles.textActive,
        { color: colors.heading },
        active && { color: colors.green_dark }
      ]}>
        { title }
      </Text>
    </RectButton>
  );
}

export default EnviromentButton;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 76,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5,
  },
  text: {
    fontFamily: fonts.text
  },
  textActive: {
    fontFamily: fonts.heading,
  }
});