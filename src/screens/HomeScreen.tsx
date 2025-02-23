// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useGetTasksQuery } from '../api/tasksApi';
import TaskCard from '../components/TaskCard';

const HomeScreen: React.FC = () => {
    const { data: tasks, error, isLoading, refetch } = useGetTasksQuery();

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !tasks) {
        return (
            <View style={styles.container}>
                <Text>Error fetching tasks.</Text>
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
    container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
    list: { padding: 16 },
});

export default HomeScreen;
