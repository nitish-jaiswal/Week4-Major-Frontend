// src/navigation/HomeTabs.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryScreen from '../screens/CategoryScreen';
import CompletedTasksScreen from '../screens/CompletedTasksScreen';
import HomeScreen from '../screens/HomeScreen';
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
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={({ route }) => ({
                headerShown: true,
                tabBarStyle: {
                    height: 60,
                    paddingVertical: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 15,
                },
                tabBarActiveTintColor: '#592A80', // Active tab color
                tabBarIcon: ({ color }) => {
                    let iconName = '';
                    if (route.name === 'HomeTab') {
                        iconName = 'home';
                    } else if (route.name === 'Category') {
                        iconName = 'view-grid';
                    } else if (route.name === 'CompletedTasks') {
                        iconName = 'check-circle';
                    } else if (route.name === 'Profile') {
                        iconName = 'account';
                    }
                    return <MaterialCommunityIcons name={iconName} color={color} size={30} />;
                },
            })}
        >
            <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
            <Tab.Screen name="Category" component={CategoryScreen} options={{ title: 'Category' }} />
            <Tab.Screen name="CompletedTasks" component={CompletedTasksScreen} options={{ title: 'Completed Tasks' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
};

export default HomeTabs;
