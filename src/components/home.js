import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './Home.css';
import NavBar from './nav';

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9292/');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="Home">
        <NavBar/>
      <h1>Data List</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <button onClick={() => openModal(item)}>
              <img src={item.image_url} alt="Book cover" />
            </button>
          </li>
        ))}
      </ul>
      {selectedItem && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          contentLabel="Book Details"
        >
          <button onClick={closeModal}>Close</button>
          <h2>Title: {selectedItem.title}</h2>
          <p>Description: <br />
           {selectedItem.description}</p>
          <p>Author: {selectedItem.author}</p>
          <p>amount: {selectedItem.amount}</p>
          <p>Format: {selectedItem.format}</p>
          <p>Language: {selectedItem.language}</p>
          <p>Genre: {selectedItem.genre}</p>
          
        </Modal>
      )}
    </div>
  );
};

export default Home;
