/**
 * Main application component for the todo app.
 * @file App.tsx
 * @module App
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';
import Task from './src/components/Task';
import TaskList from './src/components/TaskList';
import { PermissionsAndroid, ToastAndroid } from 'react-native';

/**
 * The main application component.
 * @function
 * @component
 * @return {JSX.Element} The rendered App component.
 */
const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState('');
  const [isIncompleteCollapsed, setIsIncompleteCollapsed] = useState(false);
  const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(false);

  useEffect(() => {    
    loadTasks();
  }, []);

    /**
   * Save tasks to a file.
   * @function
   * @async
   */
  const saveTasks = async () => {
    try{
      const permissionGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to save tasks.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
        console.log("permissionGranted", permissionGranted);
        
      if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED) {
        try {
          await RNFS.writeFile('tasks.json', JSON.stringify(tasks), 'utf8');
          ToastAndroid.show('Tasks saved successfully!', ToastAndroid.SHORT);
        } catch (error) {
          console.log('Error saving tasks:', error);
        }
      }
      else {
        console.log('Permission results bad', permissionGranted)
      }
      } catch (error) {
        console.log('Error permission:', error);
      }

    // try {
    //   await RNFS.writeFile('tasks.json', JSON.stringify(tasks), 'utf8');
    // } catch (error) {
    //   console.error('Error saving tasks:', error);
    // }
  };

    /**
   * Load tasks from a file.
   * @function
   * @async
   */
  const loadTasks = async () => {
    try{
      const permissionGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to save tasks.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED) {
        try {
          const fileExists = await RNFS.exists('tasks.json');
          if (fileExists) {
            const fileContent = await RNFS.readFile('tasks.json', 'utf8');
            setTasks(JSON.parse(fileContent));
          }
          
        } catch (error) {
          console.log('Error loading tasks:', error);
        }
      }
      else {
        console.log('Permission results bad', permissionGranted)
      }
    }

    catch (error){
      console.log('Error permission:', error);

    }

    // try {
    //   const fileExists = await RNFS.exists('tasks.json');
    //   if (fileExists) {
    //     const fileContent = await RNFS.readFile('tasks.json', 'utf8');
    //     setTasks(JSON.parse(fileContent));
    //   }
      
    // } catch (error) {
    //   console.error('Error loading tasks:', error);
    // }
  };

    /**
   * Add a new task.
   * @function
   */
  const addTask = () => {
    if (inputText.trim() === '') {
      return;
    }

    const newTask: Task = {
      id: tasks.length + 1,
      text: inputText,
      createdAt: Date.now(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputText('');

    saveTasks();
    setIsIncompleteCollapsed(false)

  };

    /**
   * Toggle the completion status of a task.
   * @function
   * @param {number} taskId - The ID of the task to toggle.
   */
  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
    saveTasks();
    setIsCompletedCollapsed(false)
    setIsIncompleteCollapsed(false)
  };

    /**
   * Delete a task.
   * @function
   * @param {number} taskId - The ID of the task to delete.
   */
  const deleteTask = (taskId: number) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);
            saveTasks();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
    <View style={styles.rootContainer1}>

      <TaskList
        tasks={tasks.filter(task => !task.completed)}
        title="INCOMPLETE TASKS"
        onTaskPress={toggleTaskCompletion}
        onTaskLongPress={deleteTask}
        isCollapsed={isIncompleteCollapsed}
        toggleCollapse={() => setIsIncompleteCollapsed(!isIncompleteCollapsed)}
      />

      <TaskList
        tasks={tasks.filter(task => task.completed)}
        title="COMPLETED TASKS"
        onTaskPress={toggleTaskCompletion}
        onTaskLongPress={deleteTask}
        isCollapsed={isCompletedCollapsed}
        toggleCollapse={() => setIsCompletedCollapsed(!isCompletedCollapsed)}
      />
    </View>

    <View style={styles.rootContainer2}>
      <TextInput
        value={inputText}
        onChangeText={(inputText) => {
          setInputText(inputText);
          if (inputText.length >= 250) {
            Alert.alert('Character Limit Exceeded', 'Task text cannot exceed 250 characters.');
            return;
          };
        }}
        placeholder="Enter task..."
        maxLength={250}
        style={styles.inputContainer}
        placeholderTextColor={'black'}
      />
      <TouchableOpacity onPress={addTask} style={styles.buttonContainer}>
        <Text style={styles.textContainer}>Add Task</Text>
      </TouchableOpacity>
    </View>

    </>
  );
};


const styles = StyleSheet.create({
  rootContainer1: {
    paddingHorizontal: 16,
    marginVertical: 10,
    flex: 4,
  },
  rootContainer2: {
    paddingHorizontal: 16,
    marginVertical: 10,
    flex: 1,
    justifyContent: 'center'
  },
  textContainer: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: 'black',
    height: 36,
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 2, 
    width: '100%', 
    marginVertical: 10,
  },
});

export default App;
