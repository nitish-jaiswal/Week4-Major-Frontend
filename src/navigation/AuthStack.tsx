// src/navigation/AuthStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeTabs from './HomeTabs';

export type AuthStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    TaskDetail: { id: string };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Welcome' }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
            <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Task Detail' }} />
        </Stack.Navigator>
    );
};

export default AuthStack;
