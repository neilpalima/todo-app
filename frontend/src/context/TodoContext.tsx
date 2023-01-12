import { createContext, useState, useEffect, ReactNode } from "react";
import axios from 'axios';

import { TodoType } from '../types';

interface MainContextInterface {
    todos: TodoType[];
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
    delTodo: (id: string) => void;
    editTodo: (id: string, text: string) => void;
    addTodo: (text: string) => void;
}

interface Props {
    children: ReactNode;
}

export const MainContext = createContext<MainContextInterface | null>(null);

const todoApi = axios.create({
    baseURL: process.env.TODO_API_URL || 'http://localhost:8080/api/todo',
});

export const MainProvider = ({ children }: Props) => {
    const [todos, setTodos] = useState<TodoType[]>([]);

    useEffect(() => {
        todoApi.get<TodoType[]>('/')
            .then(response => {
                const newTodos = response.data;
                setTodos(newTodos);
            });
    }, []);

    const addTodo = async (description: string) => {
        if (description.trim()) {
            const newTodo = {
                description,
            };

            const response = await todoApi.post<TodoType>('/', newTodo);
            const createdTodo = response.data;

            const newTodos = [...todos, createdTodo];
            setTodos(newTodos);
        }
    };

    const editTodo = async (
        id: string,
        text: string
    ) => {
        if (!(text === null) && text.trim()) {
            await todoApi.put(id, { description: text });
            setTodos(
                todos.map((todo) => {
                    if (todo.id === id) todo.description = text;
                    return todo;
                })
            );
        }
    };

    const delTodo = async (id: string) => {
        await todoApi.delete(id);
        setTodos(todos.filter((todo) => todo.id !== id));
   }

    const mainContextValue: MainContextInterface = {
        todos,
        setTodos,
        delTodo,
        editTodo,
        addTodo,
    };

    return (
        <MainContext.Provider value={mainContextValue}>
            {children}
        </MainContext.Provider>
    );
};