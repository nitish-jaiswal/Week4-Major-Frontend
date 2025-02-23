// src/screens/TaskDetailScreen.tsx
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useDeleteTaskMutation, useGetTaskByIdQuery, useUpdateTaskMutation } from '../api/tasksApi';
import type { AuthStackParamList } from '../navigation/AuthStack';

type RouteParams = {
    id: string;
};

const TaskDetailScreen: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const { id } = route.params as RouteParams;

    const { data: task, error, isLoading, refetch } = useGetTaskByIdQuery(id);
    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
    const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    // When task is fetched, update local state (if not editing)
    useEffect(() => {
        if (task && !isEditing) {
            setTitle(task.title);
            setDescription(task.description);
            setCompleted(task.completed);
        }
    }, [task, isEditing]);

    const handleSave = async () => {
        try {
            await updateTask({ id, title, description, completed }).unwrap();
            setIsEditing(false);
            refetch(); // Refresh details after update
        } catch (err) {
            console.log('Update error', err);
            Alert.alert('Error', 'Failed to update the task.');
        }
    };

    const handleDelete = async () => {
        Alert.alert('Confirm Delete', 'Are you sure you want to delete this task?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deleteTask(id).unwrap();
                        navigation.goBack();
                    } catch (err) {
                        console.log('Delete error', err);
                        Alert.alert('Error', 'Failed to delete the task.');
                    }
                }
            }
        ]);
    };

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
            {isEditing ? (
                <>
                    <Text style={styles.label}>Title:</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <View style={styles.switchContainer}>
                        <Text style={styles.label}>Completed:</Text>
                        <Switch value={completed} onValueChange={setCompleted} />
                    </View>
                    <View style={styles.buttonRow}>
                        <Button title={isUpdating ? 'Saving...' : 'Save'} onPress={handleSave} />
                        <Button title="Cancel" onPress={() => setIsEditing(false)} />
                    </View>
                </>
            ) : (
                <>
                    <Text style={styles.title}>{task.title}</Text>
                    <Text style={styles.label}>Description:</Text>
                    <Text style={styles.value}>{task.description}</Text>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={styles.value}>{task.completed ? 'Completed' : 'Pending'}</Text>
                    <Text style={styles.label}>Category:</Text>
                    <Text style={styles.value}>{task.category}</Text>
                    <Text style={styles.label}>Created At:</Text>
                    <Text style={styles.value}>{new Date(task.createdAt).toLocaleString()}</Text>
                    <Text style={styles.label}>Updated At:</Text>
                    <Text style={styles.value}>{new Date(task.updatedAt).toLocaleString()}</Text>
                    <View style={styles.buttonRow}>
                        <Button title="Edit" onPress={() => setIsEditing(true)} />
                        <Button title={isDeleting ? 'Deleting...' : 'Delete'} onPress={handleDelete} color="red" />
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
    label: { fontSize: 16, fontWeight: '600', marginTop: 8 },
    value: { fontSize: 16, marginBottom: 8 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 6,
        borderRadius: 4,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
});

export default TaskDetailScreen;
