import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    callBack: (newTitle: string) => void
    title: string
    onKeyPress: (a: KeyboardEvent<HTMLInputElement>) => void
    className?: string | null
}

export const Input = (props: InputPropsType) => {
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.value)
    }


    return (
        <input
            value={props.title}
            onChange={onChangeInputHandler}
            onKeyPress={props.onKeyPress}
            className={props.className ? 'error' : ''}
        />
    );
};

