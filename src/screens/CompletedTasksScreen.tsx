// src/screens/CompletedTasksScreen.tsx
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Provider as PaperProvider, Paragraph } from 'react-native-paper';
import { useGetCompletedTasksQuery } from '../api/tasksApi';
import TaskCard from '../components/TaskCard';

const CompletedTasksScreen: React.FC = () => {
    const { data: tasks, error, isLoading, refetch } = useGetCompletedTasksQuery();

    if (isLoading) {
        return (
            <PaperProvider>
                <View style={styles.center}>
                    <ActivityIndicator animating={true} size="large" />
                </View>
            </PaperProvider>
        );
    }

    if (error || !tasks) {
        return (
            <PaperProvider>
                <View style={styles.center}>
                    <Paragraph>Error fetching completed tasks.</Paragraph>
                </View>
            </PaperProvider>
        );
    }

    return (
        <PaperProvider>
            <FlatList
                contentContainerStyle={styles.list}
                data={tasks}
                keyExtractor={(item) => item._id}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
                renderItem={({ item }) => <TaskCard task={item} />}
            />
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        padding: 16
    },
});

export default CompletedTasksScreen;
