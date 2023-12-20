import './Sort.scss';

const filters = [
  { name: 'задачам', sort: 'text' },
  { name: 'важности', sort: 'completed' },
  { name: 'дате', sort: 'date' },
];

export default function Sort({ sortType, setSortType }) {
  return (
    <div className='sorting-block'>
      <label htmlFor='select'>Сортировка по:</label>
      <select
        id='select'
        defaultValue={sortType}
        onChange={(e) => setSortType(JSON.parse(e.target.value))}
      >
        {filters.map((el, i) => (
          <option value={JSON.stringify(el)} key={i}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
}
