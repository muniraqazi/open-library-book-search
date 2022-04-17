import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./styles/styles.scss";



import BookShelves from "./components/BookShelves";



function App() {
  const [userInput, setUserInput] = useState("");
  const [books, setBooks] = useState([]);
  const [searchedTitle, setSearchedTitle] = useState("");

  useEffect(() => {
    axios.get(`http://openlibrary.org/search.json?q=${userInput}`,)
      .then (response => {
        setBooks(response.data.docs); 
      })
    }, [userInput]);

    const handleChange = (event) => {
      setSearchedTitle(event.target.value)
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      setUserInput(searchedTitle);
    }
    console.log(userInput)


  return (
    <div className='wrapper'>
      <div className="mainContainer">
        <div className="headerContainer">
          <h1>✿ Little Library ✿</h1>
          <h2>🕮 Search for any book title:</h2>
          <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type="text" placeholder="Book Title..."/>
            <button>🔍</button>
          </form>

          

        </div> {/**end of header container */}
        <div className="shelfContainer">
          <BookShelves 
            books={books}
            setBooks={setBooks}
          />
        </div>
      </div> {/**end of main container */}
    </div>
  );
}

export default App;




