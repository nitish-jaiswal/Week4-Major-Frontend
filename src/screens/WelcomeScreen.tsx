// src/screens/WelcomeScreen.tsx
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Provider as PaperProvider, Paragraph, Title } from 'react-native-paper';
import type { AuthStackParamList } from '../navigation/AuthStack';

const WelcomeScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Title style={styles.title}>Welcome to the App!</Title>
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => navigation.navigate('Register')}
                >
                    Get Started
                </Button>
                <Paragraph style={styles.paragraph}>Created by, Nitish Jaiswal</Paragraph>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        marginBottom: 30,
        marginTop: 250,
        color: '#51158C',
    },
    paragraph: {
        fontSize: 20,
        marginTop: 300,
        marginBottom: 0,
        color: '#000',
    },
    button: {
        width: '60%',
    },
});

export default WelcomeScreen;
