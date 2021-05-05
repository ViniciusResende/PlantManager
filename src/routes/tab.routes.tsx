import React from 'react';
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlantSelect from '../pages/PlantSelect';
import { MaterialIcons } from '@expo/vector-icons';
import MyPlants from '../pages/MyPlants';
import { useTheme } from '../context/ThemeContext';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  const { colors } = useTheme()

  return(
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 70,
          backgroundColor: colors.gray,
        },
      }}>
        <AppTab.Screen 
          name="Nova Planta"
          component={PlantSelect}
          options={{
            tabBarIcon: (({ size, color }) => (
              <MaterialIcons 
                name="add-circle-outline"
                size={size}
                color={color}
              />
            ))
          }}
        />
        <AppTab.Screen 
          name="Minhas Plantas"
          component={MyPlants}
          options={{
            tabBarIcon: (({ size, color }) => (
              <MaterialIcons 
                name="format-list-bulleted"
                size={size}
                color={color}
              />
            ))
          }}
        />
      </AppTab.Navigator>
  )
}

export default AuthRoutes;