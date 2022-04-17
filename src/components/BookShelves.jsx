import React, {useState} from 'react'
import noImage from '../assets/no-image-available.webp'

import { AiOutlineSortAscending } from 'react-icons/ai';
import { AiOutlineSortDescending } from 'react-icons/ai';

import { BsSortNumericDown } from 'react-icons/bs';
import { BsSortNumericUp } from 'react-icons/bs';

const BookShelves = ({books, setBooks}) => {
  const coverImage = (coverID) => {
    return `http://covers.openlibrary.org/b/id/${coverID}-M.jpg`;
  };

  const openLibraryUrl = "https://openlibrary.org";

  const [sortAlphabetically, setSortAlphabetically] = useState(false);
  const [sortByYear, setSortByYear] = useState(false);

  const sortByTitle = () => {
    const sortedResult = [...books];
    const sortedList = sortedResult.sort((a, b) =>
    sortAlphabetically
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title)
    );
    setBooks(sortedList);
    setSortAlphabetically(!sortAlphabetically);
  };

  const sortByPublishedYear = () => {
    const sortedResult = [...books];
    const sortedList = sortedResult.sort((a, b) =>
      sortByYear
        ? a.first_publish_year - b.first_publish_year
        : b.first_publish_year - a.first_publish_year
    );
    setBooks(sortedList);
    setSortByYear(!sortByYear);
  };

  return (
    <>
      <div className='buttonContainer'>
        <div className='sortingButton' onClick={sortByTitle}>
        {sortAlphabetically ?
          <AiOutlineSortAscending/>
          :
          <AiOutlineSortDescending/>
        }
        </div>
        <div className='sortingButton' onClick={sortByPublishedYear}>
        {sortByYear ?
          <BsSortNumericDown/>
          :
          <BsSortNumericUp/>
        }
        </div>
      </div>

      <div className='bookContainer'>
        {books.map((data) => (
          <div className='shelf'>
            <div className='bookImg'>
              { data.cover_i ?
                <img src={coverImage(data.cover_i)} alt="" />
                :
                <img src={noImage} alt="" />
              }
            </div>
            <div className='bookInfo'>
              <p>{data.title}</p>

              <div className='authContainer'>
                {data.author_name ? 
                  data.author_name.map((author, index) => (
                    <p key={index}>{author}</p> 
                  ))
                  :
                  <p>N/A</p>
                }
              </div>

              <p>Published: {data.first_publish_year ? 
                data.first_publish_year : "N/A"}
              </p>
              <div className='moreButtonContainer'>
                <a href={openLibraryUrl + data.key}>More Info</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default BookShelves


