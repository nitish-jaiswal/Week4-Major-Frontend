// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, RefreshControl, Modal, TextInput, Button, TouchableOpacity } from 'react-native';
import { useGetTasksQuery, useCreateTaskMutation } from '../api/tasksApi';
import TaskCard from '../components/TaskCard';

const HomeScreen: React.FC = () => {
    const { data: tasks, error, isLoading, refetch } = useGetTasksQuery();
    const [createTask] = useCreateTaskMutation();

    const [isModalVisible, setModalVisible] = useState(false);
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
            setModalVisible(false);
            setNewTitle('');
            setNewDescription('');
            setNewCategory('');
        } catch (err) {
            console.error('Failed to create task', err);
        }
    };

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
                <Text>Error fetching tasks.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>

            <FlatList
                contentContainerStyle={styles.list}
                data={tasks}
                keyExtractor={(item) => item._id}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
                renderItem={({ item }) => <TaskCard task={item} />}
            />

            <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Task</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={newTitle}
                            onChangeText={setNewTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={newDescription}
                            onChangeText={setNewDescription}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Category (e.g., PERSONAL)"
                            value={newCategory}
                            onChangeText={setNewCategory}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                            <Button title="Add" onPress={handleAddTask} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    center: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
    list: { padding: 16 },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        margin: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: { color: '#fff', fontSize: 18 },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 16,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 6,
        borderRadius: 4,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
});

export default HomeScreen;
