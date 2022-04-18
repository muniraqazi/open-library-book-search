import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./styles/styles.scss";

import BookShelves from "./components/BookShelves";
import PulseLoader from "react-spinners/PulseLoader";


function App() {
  const [userInput, setUserInput] = useState("");
  const [books, setBooks] = useState([]);
  const [searchedTitle, setSearchedTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios.get(`https://openlibrary.org/search.json?title=${userInput}`,)
      .then (response => {
        setBooks(response.data.docs);
        setIsLoading(false);
        setIsLoaded(true);
      }).catch((error) => {
        console.log(error)
      })
    }, [userInput]);


    const handleChange = (event) => {
      setSearchedTitle(event.target.value)
    }
    
    const handleSubmit = (event) => {
      event.preventDefault();
      setUserInput(searchedTitle);
      setIsLoading(true)
      setIsLoaded(false)
    }

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

        {isLoaded ?
          <BookShelves 
            books={books}
            setBooks={setBooks}
            isLoaded={isLoaded}
          />
          : isLoading ?
          <div className="loadingContainer">
            <PulseLoader
              size={15}
              loading={true}
              color={"rgb(207, 164, 207)"}
            />
            <p>Loading your search results</p>
          </div>
          : null}

      </div> {/**end of main container */}
    </div>
  );
}

export default App;




