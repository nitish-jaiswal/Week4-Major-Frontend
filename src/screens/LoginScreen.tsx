// src/screens/LoginScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput, Title } from 'react-native-paper';
import { useLoginMutation } from '../api/authApi';
import { AuthStackParamList } from '../navigation/AuthStack';
import { setToken } from '../store/authSlice';
import { useAppDispatch } from '../store/hooks';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [login, { data, isError, isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            dispatch(setToken(data.token));
            AsyncStorage.setItem('token', data.token);
            navigation.navigate('Home');
        }
        if (isError) {
            Alert.alert('Login Failed', 'Please check your credentials');
        }
    }, [data, isError]);

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Login</Title>
            <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
            />
            <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
            <Button
                mode="contained"
                onPress={() => login({ email, password })}
                loading={isLoading}
                style={styles.buttonContainer}
            >
                Login
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>New User?</Text>
            </TouchableOpacity>
        </View>
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
    input: {
        width: '80%',
        marginBottom: 12,
    },
    buttonContainer: {
        width: '60%',
        marginBottom: 12,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10,
        fontSize: 16
    },
});

export default LoginScreen;
