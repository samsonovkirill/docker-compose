import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchValues = () => axios.get('/api/values/current');
const fetchIndexes = () => axios.get('/api/values/all');
const sendValue = (index) => axios.post('/api/values', { index }); 

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    async function fetchApi() {
      const values = await fetchValues();
      const seenIndexes = await fetchIndexes();
      setValues(values.data);
      setSeenIndexes(seenIndexes.data);
    }
    fetchApi();
  }, [fetchValues, fetchIndexes]);

  const renderSeenIndexes = () => seenIndexes
    .map(({ number }) => number)
    .join(', ');

  const renderCalculatedValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      )
    }
    return entries;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendValue(index);
    setIndex('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          type="text"
          value={index}
          onChange={event => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen</h3>
      {renderSeenIndexes()}
      <h3>Calculated values</h3>
      {renderCalculatedValues()}
    </div>
  )
};

export default Fib;
