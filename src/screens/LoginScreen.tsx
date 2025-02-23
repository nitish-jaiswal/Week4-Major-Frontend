// src/screens/LoginScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import { useLoginMutation } from '../api/authApi';
import { useAppDispatch } from '../store/hooks';
import { setToken } from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [login, { data, isError, isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            // Save token in Redux and AsyncStorage
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
            <Text style={styles.title}>Login</Text>
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
                title={isLoading ? 'Logging in...' : 'Login'}
                onPress={() => login({ email, password })}
            />
            <Button
                title="Go to Register"
                onPress={() => navigation.navigate('Register')}
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

export default LoginScreen;
