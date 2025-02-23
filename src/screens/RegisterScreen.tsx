// src/screens/RegisterScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
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
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button
                title={isLoading ? 'Registering...' : 'Register'}
                onPress={() => register({ name, email, password })}
            />
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center' },
    title: { fontSize: 24, marginBottom: 20 },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default RegisterScreen;
