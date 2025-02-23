// src/screens/ProfileScreen.tsx
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useGetProfileQuery } from '../api/authApi';
import { useAppSelector } from '../store/hooks';

const ProfileScreen: React.FC = () => {
    const token = useAppSelector(state => state.auth.token);
    const { data, error, isLoading } = useGetProfileQuery(token, { skip: !token });

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !data) {
        return (
            <View style={styles.container}>
                <Text>Error fetching profile data.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text>Name: {data.name}</Text>
            <Text>Email: {data.email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, marginBottom: 20 },
});

export default ProfileScreen;
