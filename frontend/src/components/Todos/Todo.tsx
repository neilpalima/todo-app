import React, { useContext, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { MainContext } from '../../context/TodoContext';
import { TodoType } from '../../types';

const Todo = (props: TodoType) => {
    const { delTodo, editTodo } = useContext(MainContext)!;

    const [text, setText] = useState(props.description);
    const [canUpdate, setCanUpdate] = useState(false);



    const handleDeleteClick =  async(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        delTodo(props.id);
    };

    const handleUpdateClick =  async(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        editTodo(props.id, text);
        setCanUpdate(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setText(e.target.value)
        setCanUpdate(e.target.value !== '' && e.target.value !== props.description)
    }

    return (
        <TextField
            margin="normal"
            required
            fullWidth
            placeholder="Todo task"
            value={text}
            name="todo"
            onChange={handleChange}
            InputProps={{
            endAdornment: <InputAdornment position="end">
                {canUpdate && <Button
                    variant="contained"
                    onClick={handleUpdateClick}
                    sx={{ mr: 1 }}
                >
                    Save
                </Button>}
                <Button
                    variant="contained"
                    onClick={handleDeleteClick}
                >
                    Delete
                </Button>
            </InputAdornment>,
            }}
        />
    );
};

export default Todo;