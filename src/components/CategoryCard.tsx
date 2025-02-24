// src/components/CategoryCard.tsx
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator, Card, Text, Title } from 'react-native-paper';
import { useGetTasksByCategoryQuery } from '../api/tasksApi';

interface CategoryCardProps {
    category: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    const { data: tasks, error, isLoading } = useGetTasksByCategoryQuery(category);

    return (
        <Card style={styles.card}>
            <Card.Content>
                <Title style={styles.title}>{category}</Title>
                {isLoading ? (
                    <ActivityIndicator animating={true} size="small" />
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
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000', // Solid black for opacity
    },
    count: {
        fontSize: 16,
        marginVertical: 4,
        color: '#000', // Solid, opaque text
    },
    taskTitle: {
        fontSize: 14,
        marginLeft: 8,
        color: '#000', // Solid black text
    },
    error: {
        color: 'red',
    },
});

export default CategoryCard;
