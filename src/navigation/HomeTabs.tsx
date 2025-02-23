// src/navigation/HomeTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CompletedTasksScreen from '../screens/CompletedTasksScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type HomeTabsParamList = {
    HomeTab: undefined;
    Category: undefined;
    CompletedTasks: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabs = () => {
    return (
        <Tab.Navigator initialRouteName="HomeTab">
            <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
            <Tab.Screen name="Category" component={CategoryScreen} options={{ title: 'Category' }} />
            <Tab.Screen name="CompletedTasks" component={CompletedTasksScreen} options={{ title: 'Completed Tasks' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
};

export default HomeTabs;
