import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";

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
                <Input callBack={setTitle} title={title} onKeyPress={onKeyPressHandler} className={error}/>
                <Button name={'+'} callBack={addTaskHandler}/>
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
                            <Button name={'x'} callBack={() => props.removeTask(t.id)}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button name={'All'} callBack={() => onClickFilterHandler('all')} className={props.filter === 'all' ? "activeFilter" : ''}/>
                <Button name={'Active'} callBack={() => onClickFilterHandler('active')} className={props.filter === 'active' ? "activeFilter" : ''}/>
                <Button name={'Completed'} callBack={() => onClickFilterHandler('completed')} className={props.filter === 'completed' ? "activeFilter" : ''}/>
            </div>
        </div>
    )
}