// src/components/TaskCard.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Switch, TouchableOpacity } from 'react-native';
import { Task } from '../api/tasksApi';
import { useUpdateTaskMutation, useDeleteTaskMutation } from '../api/tasksApi';
import { useNavigation } from '@react-navigation/native';
import type { AuthStackParamList } from '../navigation/AuthStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [completed, setCompleted] = useState(task.completed);

    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
    const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

    const handleSave = async () => {
        try {
            await updateTask({ id: task._id, title, description, completed }).unwrap();
            setIsEditing(false);
        } catch (error) {
            console.log('Update error', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTask(task._id).unwrap();
        } catch (error) {
            console.log('Delete error', error);
        }
    };

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('TaskDetail', { id: task._id })}
            activeOpacity={0.8}
        >
            <View style={styles.card}>
                {isEditing ? (
                    <>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Title"
                        />
                        <TextInput
                            style={styles.input}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Description"
                        />
                        <View style={styles.switchContainer}>
                            <Text>Completed: </Text>
                            <Switch value={completed} onValueChange={setCompleted} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title={isUpdating ? 'Saving...' : 'Save'} onPress={handleSave} />
                            <Button title="Cancel" onPress={() => setIsEditing(false)} />
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>{task.title}</Text>
                        <Text style={styles.description}>{task.description}</Text>
                        <Text>Status: {task.completed ? 'Completed' : 'Pending'}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Edit" onPress={() => setIsEditing(true)} />
                            <Button title={isDeleting ? 'Deleting...' : 'Delete'} onPress={handleDelete} />
                        </View>
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        marginVertical: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 4,
        borderRadius: 4,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
});

export default TaskCard;
