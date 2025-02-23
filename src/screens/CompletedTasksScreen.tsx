// src/screens/CompletedTasksScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CompletedTasksScreen: React.FC = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Completed Tasks Screen</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24 },
});

export default CompletedTasksScreen;
