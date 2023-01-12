import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { MainContext } from '../../context/TodoContext';

const AddTodo = () => {
    const { addTodo } = useContext(MainContext)!;
    const [text, setText] = useState("");

    const handleClick = async(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        addTodo(text);
        setText('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setText(e.target.value)
    }

    return (
        <TextField
            margin="normal"
            required
            fullWidth
            placeholder="Todo task"
            value={text}
            name="todo"
            autoFocus
            onChange={handleChange}
            InputProps={{
            endAdornment: <InputAdornment position="end">
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleClick}
                >
                    Add
                </Button>
            </InputAdornment>,
            }}
        />
    );
}

export default AddTodo;