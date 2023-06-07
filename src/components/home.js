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
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const createBook = async () => {
    try {
      const response = await fetch('http://localhost:9292/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      const createdBook = await response.json();
      setData([...data, createdBook]);
      setNewBook({
        title: '',
        description: '',
        author: '',
        amount: '',
        genre: '',
      });
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await fetch(`http://localhost:9292/${bookId}`, {
        method: 'DELETE',
      });
      setData(data.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const openModal = (book) => {
    setSelectedItem(book);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = event.target.elements.search.value;

    // Perform search logic here
    const filteredData = data.filter((item) => {
      // Assuming you want to search by book title
      return item.title.toLowerCase().includes(searchValue.toLowerCase());
    });

    setSearchResults(filteredData);
  };

  return (
    <div className="Home">
      <NavBar />
      <h1>The Novels</h1>

      <div className="row2">
        <h2>Find Your Book</h2>
        <div className="search">
          <form onSubmit={handleSearch}>
            <input type="text" name="search" placeholder="Enter Book Name" />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>

      <ul>
        {searchResults.length > 0
          ? searchResults.map((item) => (
              <li key={item.id}>
                <button onClick={() => openModal(item)}>
                  <img src={item.image_url} alt="Book cover" />
                </button>
                <button onClick={() => deleteBook(item.id)}>Delete</button>
              </li>
            ))
          : data.map((item) => (
              <li key={item.id}>
                <button onClick={() => openModal(item)}>
                  <img src={item.image_url} alt="Book cover" />
                </button>
                <button onClick={() => deleteBook(item.id)}>Delete</button>
              </li>
            ))}
      </ul>

      <button type="button" onClick={() => setIsModalOpen(true)}>
        Create a New Book
      </button>

      {isModalOpen && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          contentLabel="Create a New Book"
        >
          <h2>Create a New Book</h2>
          <form>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
            />
            <br />

            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={newBook.description}
              onChange={handleInputChange}
            />
            <br />

            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
            />
            <br />

            <label>Amount:</label>
            <input
              type="text"
              name="amount"
              value={newBook.amount}
              onChange={handleInputChange}
            />
            <br />

            <label>Genre:</label>
            <input
              type="text"
              name="genre"
              value={newBook.genre}
              onChange={handleInputChange}
            />
            <br />

            <button type="submit" onClick={createBook}>
              Submit
            </button>
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
          <p>Author: {selectedItem.author}</p>
          <p>Amount: {selectedItem.amount}</p>
          <p>Genre: {selectedItem.genre}</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default Home;
