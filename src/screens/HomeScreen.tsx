// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import {
    ActivityIndicator,
    Button,
    Dialog,
    FAB,
    Provider as PaperProvider,
    Paragraph,
    Portal,
    TextInput
} from 'react-native-paper';
import { useCreateTaskMutation, useGetTasksQuery } from '../api/tasksApi';
import TaskCard from '../components/TaskCard';

const HomeScreen: React.FC = () => {
    const { data: tasks, error, isLoading, refetch } = useGetTasksQuery();
    const [createTask] = useCreateTaskMutation();

    const [isDialogVisible, setDialogVisible] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newCategory, setNewCategory] = useState('');

    const handleAddTask = async () => {
        try {
            await createTask({
                title: newTitle,
                description: newDescription,
                category: newCategory,
            }).unwrap();
            setDialogVisible(false);
            setNewTitle('');
            setNewDescription('');
            setNewCategory('');
        } catch (err) {
            console.error('Failed to create task', err);
        }
    };

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
                    <Paragraph>Error fetching tasks.</Paragraph>
                </View>
            </PaperProvider>
        );
    }

    return (
        <PaperProvider>
            <View style={{ flex: 1 }}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={tasks}
                    keyExtractor={(item) => item._id}
                    refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
                    renderItem={({ item }) => <TaskCard task={item} />}
                />

                <FAB
                    style={styles.fab}
                    icon="plus"
                    label="Add Task"
                    extended
                    onPress={() => setDialogVisible(true)}
                />


                <Portal>
                    <Dialog visible={isDialogVisible} onDismiss={() => setDialogVisible(false)}>
                        <Dialog.Title>Add New Task</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label="Title"
                                mode="outlined"
                                value={newTitle}
                                onChangeText={setNewTitle}
                                style={styles.input}
                            />
                            <TextInput
                                label="Description"
                                mode="outlined"
                                value={newDescription}
                                onChangeText={setNewDescription}
                                style={styles.input}
                            />
                            <TextInput
                                label="Category (e.g., PERSONAL)"
                                mode="outlined"
                                value={newCategory}
                                onChangeText={setNewCategory}
                                style={styles.input}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
                            <Button onPress={handleAddTask}>Add</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    input: {
        marginBottom: 12,
    },
});

export default HomeScreen;
