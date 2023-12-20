import { useEffect, useState } from 'react';
import axios from 'axios';
import Sort from './components/Sort/Sort';
import Search from './components/Search/Search';
import TodoItem from './components/TodoItem/TodoItem';
import AddTodo from './components/AddTodo/AddTodo';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortType, setSortType] = useState({
    name: 'задачам',
    sort: 'text',
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://65695793de53105b0dd6ecf0.mockapi.io/todos?${
          searchText !== '' ? `search=${searchText}` : ''
        }&sortBy=${sortType.sort}&order=asc`
      );
      setTodoList(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchText, sortType]);

  const addTodo = (todo) => {
    setTodoList([...todoList, todo]);
  };
  return (
    <div className='container'>
      <div className='todo-app'>
        <h1>TODO</h1>
        <AddTodo addTodo={addTodo} />
        <div className='controls'>
          <Sort sortType={sortType} setSortType={setSortType} />
          <Search searchText={searchText} setSearchText={setSearchText} />
        </div>
        {todoList.map((el) => (
          <TodoItem
            key={el.id}
            {...el}
            todoList={todoList}
            setTodoList={setTodoList}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
