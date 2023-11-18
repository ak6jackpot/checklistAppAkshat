/**
 * Component representing a list of tasks.
 * @file TaskList.tsx
 * @module TaskList
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';

import Task from './Task';

interface TaskListProps {
  tasks: Task[];
  title: string;
  onTaskPress: (id: number) => void;
  onTaskLongPress: (id: number) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

/**
 * The TaskList component.
 * @function
 * @component
 * @param {TaskListProps} props - The props for the component.
 * @return {JSX.Element} The rendered TaskList component.
 */
const TaskList: React.FC<TaskListProps> = ({
  tasks,
  title,
  onTaskPress,
  onTaskLongPress,
  isCollapsed,
  toggleCollapse,
}) => (
  <View style={styles.rootContainer}>

    <TouchableOpacity onPress={toggleCollapse}>
        <Text style={styles.titleContainer}>{title}</Text>
    </TouchableOpacity>

    <Collapsible collapsed={isCollapsed}>
    {tasks.map(task => (
        <View key={task.id}>
          <TouchableOpacity
            onPress={() => onTaskPress(task.id)}
            onLongPress={() => onTaskLongPress(task.id)}>
            <Text style={styles.taskContainer}>{task.text}</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>
    ))}
    </Collapsible>

  </View>
);

const styles = StyleSheet.create({
    rootContainer: {
        marginVertical: 10,
    },
    titleContainer: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
        borderWidth: 2,
        padding: 2,
    },
    taskContainer: {
        fontSize: 24,
        fontWeight: '600',
        color: 'gray',
    },
    buttonContainer: {
        backgroundColor: 'gray',
    },
    inputContainer: {
        borderWidth: 2, 
        width: '100%', 
        marginVertical: 10
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginVertical: 5,
    },
  });

export default TaskList;
