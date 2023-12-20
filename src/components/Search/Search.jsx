import './Search.scss';

export default function Search({ searchText, setSearchText }) {
  return (
    <div className='search-block'>
      <label htmlFor='search'>Поиск по задачам</label>
      <input
        placeholder='Название задачи'
        id='search'
        type='text'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}
