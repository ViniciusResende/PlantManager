import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeContextProvider } from '../context/ThemeContext';
import StackRoutes from './stack.routes';

const Routes: React.FC  = () => (
  <NavigationContainer>
    <ThemeContextProvider>
      <StackRoutes />
    </ThemeContextProvider>
  </NavigationContainer>
);

export default Routes;