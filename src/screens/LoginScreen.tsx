// src/screens/LoginScreen.tsx
import React, { useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    Alert,
    TouchableOpacity
} from 'react-native';
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
            <View style={styles.buttonContainer}>
                <Button
                    title={isLoading ? 'Logging in...' : 'Login'}
                    onPress={() => login({ email, password })}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Go to Register</Text>
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
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        width: '80%',
    },
    buttonContainer: {
        width: '60%', // Reduced width for the login button
        marginBottom: 12,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
});

export default LoginScreen;
