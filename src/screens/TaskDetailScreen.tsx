// src/screens/TaskDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useGetTaskByIdQuery } from '../api/tasksApi';

type RouteParams = {
    id: string;
};

const TaskDetailScreen: React.FC = () => {
    const route = useRoute();
    const { id } = route.params as RouteParams;
    const { data: task, error, isLoading } = useGetTaskByIdQuery(id);

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !task) {
        return (
            <View style={styles.center}>
                <Text>Error fetching task details.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.label}>Description:</Text>
            <Text>{task.description}</Text>
            <Text style={styles.label}>Status:</Text>
            <Text>{task.completed ? 'Completed' : 'Pending'}</Text>
            <Text style={styles.label}>Category:</Text>
            <Text>{task.category}</Text>
            <Text style={styles.label}>Created At:</Text>
            <Text>{new Date(task.createdAt).toLocaleString()}</Text>
            <Text style={styles.label}>Updated At:</Text>
            <Text>{new Date(task.updatedAt).toLocaleString()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
    label: { fontSize: 16, fontWeight: '600', marginTop: 8 },
});

export default TaskDetailScreen;
