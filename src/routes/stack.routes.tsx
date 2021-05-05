import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../pages/Welcome';
import UserIndentification from '../pages/UserIndentification';
import Confirmation from '../pages/Confirmation';
import PlantSave from '../pages/PlantSave';

import AuthRoutes from './tab.routes';
import { useTheme } from '../context/ThemeContext';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {
  const { colors } = useTheme();

  return (
    <stackRoutes.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white
        },
      }}
    >
      <stackRoutes.Screen 
        name="Welcome"
        component={Welcome}
      />
  
      <stackRoutes.Screen 
        name="UserIndentification"
        component={UserIndentification}
      />
  
      <stackRoutes.Screen 
        name="Confirmation"
        component={Confirmation}
      />
  
      <stackRoutes.Screen 
        name="PlantSelect"
        component={AuthRoutes}
      />
  
      <stackRoutes.Screen 
        name="PlantSave"
        component={PlantSave}
      />
  
      <stackRoutes.Screen 
        name="MyPlants"
        component={AuthRoutes}
      />
    </stackRoutes.Navigator>
  );
}

export default AppRoutes;