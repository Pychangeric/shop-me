import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import NavBar from './nav';
import './Home.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
    author: '',
    amount: '',
    genre: '',
    image_url: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9292/books');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createBook = async () => {
    try {
      const response = await fetch('http://localhost:9292/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      const createdBook = await response.json();
      setData(prevData => [...prevData, createdBook]);
      setNewBook({
        title: '',
        description: '',
        author: '',
        amount: '',
        genre: '',
        image_url: ''
      });
      closeModal();
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await fetch(`http://localhost:9292/books/${bookId}`, {
        method: 'DELETE',
      });
      setData(prevData => prevData.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const openModal = (book) => {
    setSelectedItem(book);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsEditMode(false);
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  return (
    <div className="Home">
      <NavBar />
      <h1>Bookstore</h1>

      <div className="search">
        <form>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newBook.title}
            onChange={handleInputChange}
          />
          <button type="button" onClick={openAddModal}>
            Add Book
          </button>
        </form>
      </div>

      <ul>
        {data && Array.isArray(data) && data.map((item) => (
          <li key={item.id}>
            <button onClick={() => openModal(item)}>
              <img src={item.image_url} alt="Book cover" />
            </button>
            <button onClick={() => deleteBook(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          contentLabel="Create or Edit Book"
        >
          <h2>{isEditMode ? 'Edit Book' : 'Create a New Book'}</h2>
          <form>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
            />
            <br />

            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={newBook.description}
              onChange={handleInputChange}
            />
            <br />

            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
            />
            <br />

            <label htmlFor="amount">Amount:</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={newBook.amount}
              onChange={handleInputChange}
            />
            <br />

            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={newBook.genre}
              onChange={handleInputChange}
            />
            <br />

            <label htmlFor="image_url">Image URL:</label>
            <input
              type="text"
              id="image_url"
              name="image_url"
              value={newBook.image_url}
              onChange={handleInputChange}
            />
            <br />

            {!isEditMode && (
              <button type="button" onClick={createBook}>
                Create
              </button>
            )}

            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </form>
        </Modal>
      )}

      {selectedItem && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          contentLabel="Book Details"
        >
          <h2>Title: {selectedItem.title}</h2>
          <p>Description: {selectedItem.description}</p>
          <button onClick={() => setIsEditMode(true)}>Edit</button>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default Home;
