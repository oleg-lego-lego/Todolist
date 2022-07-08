import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";

type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (taskId: string) => void
    changeFilterTask: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValueType
}

export const Todolist = (props: TodolistPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onClickFilterHandler = (value: FilterValueType) => {
        props.changeFilterTask(value)
    }

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(taskId, e.currentTarget.checked)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t, index) => {
                    return (
                        <li key={index} className={t.isDone ? "isDone" : ''}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={(e) => onChangeTaskStatusHandler(t.id, e)}
                            />
                            <span>{t.title}</span>
                            <button onClick={() => props.removeTask(t.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? "activeFilter" : ''} onClick={() => onClickFilterHandler('all')}>All</button>
                <button className={props.filter === 'active' ? "activeFilter" : ''} onClick={() => onClickFilterHandler('active')}>Active</button>
                <button className={props.filter === 'completed' ? "activeFilter" : ''} onClick={() => onClickFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}