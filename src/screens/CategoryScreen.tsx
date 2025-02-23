// src/screens/CategoryScreen.tsx
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
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
        <PaperProvider>
            <FlatList
                contentContainerStyle={styles.container}
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <CategoryCard category={item} />}
            />
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
});

export default CategoryScreen;
