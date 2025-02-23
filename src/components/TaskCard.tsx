// src/components/TaskCard.tsx
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph, Text, Title } from 'react-native-paper';
import type { Task } from '../api/tasksApi';
import type { AuthStackParamList } from '../navigation/AuthStack';

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const statusColor = task.completed ? 'green' : 'red';

    return (
        <Card style={styles.card} onPress={() => navigation.navigate('TaskDetail', { id: task._id })}>
            <Card.Content>
                <Title style={styles.title}>{task.title}</Title>
                <Paragraph style={styles.description}>{task.description}</Paragraph>
                <Text style={styles.status}>
                    Status: <Text style={[styles.statusValue, { color: statusColor }]}>{task.completed ? 'Completed' : 'Pending'}</Text>
                </Text>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    description: {
        marginTop: 8,
        fontStyle: 'italic',
        color: '#000',
    },
    status: {
        marginTop: 4,
        fontSize: 14,
        color: '#000',
    },
    statusValue: {
        fontWeight: 'bold',
    },
});

export default TaskCard;
