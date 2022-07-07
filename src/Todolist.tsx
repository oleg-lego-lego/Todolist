import React from "react";
import {FilterValueType} from "./App";

type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (taskId: number) => void
    changeFilterTask: (value: FilterValueType) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const onClickFilterHandler = (value: FilterValueType) => {
        props.changeFilterTask(value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((t, index) => {
                    return (
                        <li key={index}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => props.removeTask(t.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => onClickFilterHandler('all')}>All</button>
                <button onClick={() => onClickFilterHandler('active')}>Active</button>
                <button onClick={() => onClickFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}