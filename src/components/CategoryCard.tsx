// src/components/CategoryCard.tsx
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useGetTasksByCategoryQuery } from '../api/tasksApi';

interface CategoryCardProps {
    category: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    const { data: tasks, error, isLoading } = useGetTasksByCategoryQuery(category);

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{category}</Text>
            {isLoading ? (
                <ActivityIndicator size="small" />
            ) : error || !tasks ? (
                <Text style={styles.error}>Error fetching tasks</Text>
            ) : (
                <>
                    <Text style={styles.count}>Tasks: {tasks.length}</Text>
                    <FlatList
                        data={tasks}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <Text style={styles.taskTitle}>• {item.title}</Text>
                        )}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 12,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    count: {
        fontSize: 16,
        marginVertical: 4,
    },
    taskTitle: {
        fontSize: 14,
        marginLeft: 8,
    },
    error: {
        color: 'red',
    },
});

export default CategoryCard;
