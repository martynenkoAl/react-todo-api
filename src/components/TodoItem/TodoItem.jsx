import React, { useState } from 'react';
import axios from 'axios';
import './TodoItem.scss';

export default function TodoItem({
  text,
  completed,
  date,
  id,
  todoList,
  setTodoList,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(text);

  const updateTodo = (todo) => {
    setTodoList(todoList.map((el) => (el.id === todo.id ? todo : el)));
  };

  const removeTodo = (todo) => {
    setTodoList(todoList.filter((el) => el.id !== todo.id));
  };

  const cancelEdit = () => {
    setIsEdit(false);
    setEditValue(text);
  };

  const toggleComplete = async () => {
    try {
      const res = await axios.put(
        `https://65695793de53105b0dd6ecf0.mockapi.io/todos/${id}`,
        { completed: !completed }
      );
      updateTodo(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTodo = async () => {
    try {
      const res = await axios.delete(
        `https://65695793de53105b0dd6ecf0.mockapi.io/todos/${id}`
      );
      removeTodo(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const editTodo = async () => {
    try {
      const res = await axios.put(
        `https://65695793de53105b0dd6ecf0.mockapi.io/todos/${id}`,
        {
          text: editValue,
        }
      );
      updateTodo(res.data);
      setIsEdit(false);
    } catch (error) {
      console.log(error.message);
      setIsEdit(false);
    }
  };

  return (
    <>
      {isEdit ? (
        <div className='todo edit'>
          <input
            className='todo__edit'
            type='text'
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <div className='todo__btns'>
            <button onClick={editTodo}>Подтвердить</button>
            <button onClick={cancelEdit}>Отменить</button>
          </div>
        </div>
      ) : (
        <div className='todo'>
          <input
            className='todo__status'
            type='checkbox'
            checked={completed}
            onChange={toggleComplete}
          />
          <div className='todo__text'>
            <p className={completed ? 'checked' : ''}>{text}</p>
            <span>{date}</span>
          </div>
          <div className='todo__btns'>
            <button onClick={() => setIsEdit(true)}>Редактировать</button>
            <button onClick={deleteTodo}>Удалить</button>
          </div>
        </div>
      )}
    </>
  );
}
