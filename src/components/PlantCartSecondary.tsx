import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

import fonts from '../styles/fonts';
import { useTheme } from '../context/ThemeContext';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

const PlantCardSecondary = ({ data, handleRemove, ...rest}: PlantProps) => {
  const { colors } = useTheme();
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View style={[styles.buttonRemoveView, { backgroundColor: colors.red }]}>
            <RectButton
              style={[styles.buttonRemove, { backgroundColor: colors.red }]}
              onPress={handleRemove}
            >
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton
        style={[styles.container, { backgroundColor: colors.shape }]}
        {...rest}
      >
        <SvgFromUri 
          uri={data.photo} 
          width={50}
          height={50}
        />
        <Text style={[styles.title, { color: colors.heading }]}>
          { data.name }
        </Text>
        <View style={styles.details}>
          <Text style={[styles.timeLabel, {color: colors.body_light}]}>
            Regar às
          </Text>
          <Text style={[styles.time, { color: colors.body_dark }]}>
            {data.hour}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  )
}

export default PlantCardSecondary;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,    
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17,
  },
  details: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
  },
  buttonRemoveView: {
    width: 120,
    height: 85,
    marginTop: 15,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 10,
    paddingLeft: 10
  },
  buttonRemove: {
    width: 120,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 10,
    paddingLeft: 10
  }
})