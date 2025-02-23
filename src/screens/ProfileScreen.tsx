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
                <View style={styles.circle}>
                    <Title style={[styles.title, styles.text]}>Profile</Title>
                    <Paragraph style={[styles.profileText, styles.text]}>Hello {data.name}</Paragraph>
                    <Paragraph style={[styles.profileText, styles.text]}>{data.email}</Paragraph>
                </View>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: '#51158C',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    profileText: {
        fontSize: 18, // Increased font size for name and email
        marginVertical: 4,
    },
    text: {
        color: '#51158C',
        opacity: 1,
    },
});

export default ProfileScreen;
