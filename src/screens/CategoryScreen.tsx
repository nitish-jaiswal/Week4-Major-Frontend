// src/screens/CategoryScreen.tsx
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CategoryCard from '../components/CategoryCard';

const categories = [
    'WORK',
    'PERSONAL',
    'SHOPPING',
    'HEALTH',
    'EDUCATION',
    'FINANCE',
    'OTHER',
];

const CategoryScreen: React.FC = () => {
    return (
        <FlatList
            contentContainerStyle={styles.container}
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <CategoryCard category={item} />}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
});

export default CategoryScreen;
