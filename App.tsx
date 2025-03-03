// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { Provider } from 'react-redux';
import AuthStack from './src/navigation/AuthStack';
import { store } from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
