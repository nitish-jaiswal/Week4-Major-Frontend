// src/screens/TaskDetailScreen.tsx
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
    ActivityIndicator,
    Button,
    Provider as PaperProvider,
    Paragraph,
    Switch,
    TextInput,
    Title,
} from 'react-native-paper';
import {
    useDeleteTaskMutation,
    useGetTaskByIdQuery,
    useUpdateTaskMutation,
} from '../api/tasksApi';
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
            refetch();
        } catch (err) {
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
                        Alert.alert('Error', 'Failed to delete the task.');
                    }
                },
            },
        ]);
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

    if (error || !task) {
        return (
            <PaperProvider>
                <View style={styles.center}>
                    <Paragraph style={styles.solidText}>Error fetching task details.</Paragraph>
                </View>
            </PaperProvider>
        );
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                {isEditing ? (
                    <>
                        <Title style={[styles.title, styles.solidText]}>Edit Task</Title>
                        <TextInput
                            label="Title"
                            mode="outlined"
                            value={title}
                            onChangeText={setTitle}
                            style={[styles.input, { color: '#000' }]}
                            contentStyle={{ color: '#000' }}
                            theme={{
                                colors: {
                                    background: '#fff',
                                    text: '#000',
                                    placeholder: '#000',
                                    primary: '#000',
                                },
                            }}
                        />
                        <TextInput
                            label="Description"
                            mode="outlined"
                            value={description}
                            onChangeText={setDescription}
                            style={[styles.input, { color: '#000' }]}
                            contentStyle={{ color: '#000' }}
                            theme={{
                                colors: {
                                    background: '#fff',
                                    text: '#000',
                                    placeholder: '#000',
                                    primary: '#000',
                                },
                            }}
                        />
                        <View style={styles.switchContainer}>
                            <Paragraph style={[styles.label, styles.solidText]}>Completed:</Paragraph>
                            <Switch value={completed} onValueChange={setCompleted} color="#51158C" />
                        </View>
                        <View style={styles.buttonRow}>
                            <Button mode="contained" onPress={handleSave} style={styles.button}>
                                {isUpdating ? 'Saving...' : 'Save'}
                            </Button>
                            <Button mode="outlined" onPress={() => setIsEditing(false)} style={styles.button}>
                                Cancel
                            </Button>
                        </View>
                    </>
                ) : (
                    <>
                        <Title style={[styles.title, styles.solidText]}>{task.title}</Title>
                        <Paragraph style={[styles.label, styles.solidText]}>Description:</Paragraph>
                        <Paragraph style={[styles.value, styles.solidText]}>{task.description}</Paragraph>
                        <Paragraph style={[styles.label, styles.solidText]}>Status:</Paragraph>
                        <Paragraph style={[styles.value, styles.solidText]}>
                            {task.completed ? 'Completed' : 'Pending'}
                        </Paragraph>
                        <Paragraph style={[styles.label, styles.solidText]}>Category:</Paragraph>
                        <Paragraph style={[styles.value, styles.solidText]}>{task.category}</Paragraph>
                        <Paragraph style={[styles.label, styles.solidText]}>Created At:</Paragraph>
                        <Paragraph style={[styles.value, styles.solidText]}>
                            {new Date(task.createdAt).toLocaleString()}
                        </Paragraph>
                        <Paragraph style={[styles.label, styles.solidText]}>Updated At:</Paragraph>
                        <Paragraph style={[styles.value, styles.solidText]}>
                            {new Date(task.updatedAt).toLocaleString()}
                        </Paragraph>
                        <View style={styles.buttonRow}>
                            <Button mode="contained" onPress={() => setIsEditing(true)} style={styles.button}>
                                Edit
                            </Button>
                            <Button
                                mode="contained"
                                onPress={handleDelete}
                                style={[styles.button, { backgroundColor: '#C8393A' }]}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </Button>
                        </View>
                    </>
                )}
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
    label: { fontSize: 16, fontWeight: '600', marginTop: 8 },
    value: { fontSize: 16, marginBottom: 8 },
    input: { marginVertical: 6 },
    switchContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
    button: { flex: 1, marginHorizontal: 4 },
    solidText: { color: '#000', opacity: 1 },
});

export default TaskDetailScreen;
