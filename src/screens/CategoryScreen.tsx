// src/screens/CategoryScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryScreen: React.FC = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Category Screen</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24 },
});

export default CategoryScreen;
