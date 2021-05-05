import React from 'react';
import { 
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps
 } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps{
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  const { colors } = useTheme();
  
  return(
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.green }]} 
      {...rest}
    >
      <Text style={[styles.text, { color: colors.white }]}>
        { title }
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 16, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.heading
  }
})