// src/screens/ProfileScreen.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Provider as PaperProvider, Paragraph, Title } from 'react-native-paper';
import { useGetProfileQuery } from '../api/authApi';
import { useAppSelector } from '../store/hooks';

const ProfileScreen: React.FC = () => {
    const token = useAppSelector((state) => state.auth.token);
    const { data, error, isLoading } = useGetProfileQuery(token, { skip: !token });

    if (isLoading) {
        return (
            <PaperProvider>
                <View style={styles.container}>
                    <ActivityIndicator animating={true} size="large" />
                </View>
            </PaperProvider>
        );
    }

    if (error || !data) {
        return (
            <PaperProvider>
                <View style={styles.container}>
                    <Paragraph style={styles.text}>Error fetching profile data.</Paragraph>
                </View>
            </PaperProvider>
        );
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Title style={[styles.title, styles.text]}>Profile</Title>
                <Paragraph style={styles.text}>Name: {data.name}</Paragraph>
                <Paragraph style={styles.text}>Email: {data.email}</Paragraph>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        marginBottom: 20
    },
    text: {
        color: '#51158C', // solid black color
        opacity: 1,    // full opacity
    },
});

export default ProfileScreen;
