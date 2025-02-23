// src/screens/CompletedTasksScreen.tsx
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useGetCompletedTasksQuery } from '../api/tasksApi';
import TaskCard from '../components/TaskCard';

const CompletedTasksScreen: React.FC = () => {
    const { data: tasks, error, isLoading, refetch } = useGetCompletedTasksQuery();

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !tasks) {
        return (
            <View style={styles.center}>
                <Text>Error fetching completed tasks.</Text>
            </View>
        );
    }

    return (
        <FlatList
            contentContainerStyle={styles.list}
            data={tasks}
            keyExtractor={(item) => item._id}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
            renderItem={({ item }) => <TaskCard task={item} />}
        />
    );
};

const styles = StyleSheet.create({
    center: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
    list: { padding: 16 },
});

export default CompletedTasksScreen;
