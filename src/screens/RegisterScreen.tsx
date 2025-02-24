// src/screens/RegisterScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput, Title } from 'react-native-paper';
import { useRegisterMutation } from '../api/authApi';
import { AuthStackParamList } from '../navigation/AuthStack';
import { setToken } from '../store/authSlice';
import { useAppDispatch } from '../store/hooks';

type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [register, { data, isError, isLoading }] = useRegisterMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            dispatch(setToken(data.token));
            AsyncStorage.setItem('token', data.token);
            navigation.navigate('Home');
        }
        if (isError) {
            console.log('Registration error details:', data);
            Alert.alert('Registration Failed', 'Please try again');
        }
    }, [data, isError]);

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Register</Title>
            <TextInput
                label="Name"
                mode="outlined"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                label="Email"
                mode="outlined"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
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
                onPress={() => register({ name, email, password })}
                loading={isLoading}
                style={styles.buttonContainer}
            >
                Register
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Already Have an account?</Text>
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
        marginBottom: 20
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginBottom: 10,
        fontSize: 16
    },
});

export default RegisterScreen;
