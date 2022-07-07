import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValueType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS", isDone: false},
    ])

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(f => f.id !== taskId))
    }

    let [filter, setFilter] = useState<FilterValueType>('all')

    let taskForTodolist = tasks
    if (filter === 'active') {
        taskForTodolist = tasks.filter(f => !f.isDone)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(f => f.isDone)
    }

    const changeFilterTask = (value: FilterValueType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilterTask={changeFilterTask}
            />
        </div>
    );
}

export default App;
