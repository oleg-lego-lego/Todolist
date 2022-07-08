import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false},
    ])

    const removeTask = (taskId: string) => {
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

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: isDone} : el))
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilterTask={changeFilterTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
