/**
 * Interface representing a task.
 * @file Task.tsx
 * @module Task
 */

/**
 * The Task interface.
 * @interface
 */
interface Task {
    id: number;
    text: string;
    createdAt: number;
    completed: boolean;
  }
  
  export default Task;
  