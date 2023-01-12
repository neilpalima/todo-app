import React, { useContext } from "react";

import { MainContext } from '../../context/TodoContext';
import Todo from './Todo';

const TodoList = () => {
    const { todos } = useContext(MainContext)!;

    return (<div>
        {todos.map(todo => (
            <Todo key={todo.id} {...todo} />
        ))}
        </div>
    );
};

export default TodoList;