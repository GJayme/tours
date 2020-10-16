import React, { useState, useEffect } from 'react';
import Loading from './Component/Loading';
import Tours from './Component/Tours';

const URL = 'https://course-api.netlify.app/api/react-tours-project';

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTorus = async () => {
    setLoading(true);
    try {
      const response = await fetch(URL);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (erro) {
      setLoading(false);
      console.log(erro);
    }
  };

  useEffect(() => {
    fetchTorus();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button className="btn" onClick={fetchTorus}>
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
