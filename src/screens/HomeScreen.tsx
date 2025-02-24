// src/screens/HomeScreen.tsx
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Modal,
    TextInput as NativeTextInput,
    RefreshControl,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Button, FAB, Provider as PaperProvider } from 'react-native-paper';
import { useCreateTaskMutation, useGetTasksQuery } from '../api/tasksApi';
import TaskCard from '../components/TaskCard';

const categoryOptions = [
    'WORK',
    'PERSONAL',
    'SHOPPING',
    'HEALTH',
    'EDUCATION',
    'FINANCE',
    'OTHER',
];

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
            <PaperProvider>
                <View style={styles.center}>
                    <ActivityIndicator size="large" />
                </View>
            </PaperProvider>
        );
    }

    if (error || !tasks) {
        return (
            <PaperProvider>
                <View style={styles.center}>
                    <Text>Error fetching tasks.</Text>
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
                    onPress={() => setModalVisible(true)}
                />

                <Modal visible={isModalVisible} animationType="slide" transparent>
                    <View style={styles.modalOverlay}>
                        <View style={styles.customDialog}>
                            <Text style={styles.dialogTitle}>Add New Task</Text>
                            <NativeTextInput
                                style={styles.input}
                                placeholder="Title"
                                placeholderTextColor="#888"
                                value={newTitle}
                                onChangeText={setNewTitle}
                            />
                            <NativeTextInput
                                style={styles.input}
                                placeholder="Description"
                                placeholderTextColor="#888"
                                value={newDescription}
                                onChangeText={setNewDescription}
                            />
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={newCategory}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setNewCategory(itemValue)}
                                >
                                    <Picker.Item label="Select Category" value="" />
                                    {categoryOptions.map((option) => (
                                        <Picker.Item key={option} label={option} value={option} />
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.dialogActions}>
                                <Button mode="outlined" onPress={() => setModalVisible(false)} style={styles.dialogButton}>
                                    Cancel
                                </Button>
                                <Button mode="contained" onPress={handleAddTask} style={styles.dialogButton}>
                                    Add
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
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
        bottom: 0
    },
    input: {
        marginBottom: 12,
        padding: 14,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        color: '#000',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#fff',
        marginBottom: 12,
    },
    picker: {
        height: 60,
        width: '100%',
        color: '#000',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    customDialog: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        width: '90%',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    dialogTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12
    },
    dialogActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    dialogButton: {
        flex: 1,
        marginHorizontal: 4,
    },
});

export default HomeScreen;
