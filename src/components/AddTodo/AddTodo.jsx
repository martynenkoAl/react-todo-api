import React, { useState } from 'react';
import axios from 'axios';
import './AddTodo.scss';

export default function AddTodo({ addTodo }) {
  const [todoText, setTodoText] = useState('');

  const handleAddTodo = async () => {
    if (!todoText.trim().length) {
      return;
    }
    try {
      const newDate = new Date();
      const res = await axios.post(
        'https://65695793de53105b0dd6ecf0.mockapi.io/todos',
        {
          text: todoText,
          completed: false,
          date: `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`,
        }
      );
      addTodo(res.data);
      setTodoText('');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='row'>
      <input
        placeholder='Добавьте новую задачу'
        type='text'
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Добавить</button>
    </div>
  );
}
