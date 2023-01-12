import React from 'react'
import Box from '@mui/material/Box';

import AddTodo from './AddTodo';
import TodoList from './TodoList';

const Todo = () => {
    return (
        <>
            <Box sx={{ mt: 1, width: '100%' }}>
                <AddTodo />
            </Box>
            <Box sx={{ mt: 1, width: '100%' }}>
                <TodoList />
            </Box>
        </>
    );
}

export default Todo;