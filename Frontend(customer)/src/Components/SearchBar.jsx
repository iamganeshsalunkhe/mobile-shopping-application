// import required modules
import { useState} from "react"
import {FiSearch, FiX} from 'react-icons/fi';

function SearchBar() {
    // state for the search value
    const [searchQuery, setSearchQuery] = useState("");

    //state for checking is focus on search bar or not
    const [isFocused, setIsFocused] = useState(false);


    // function for clearing search bar when clicked on clear icon
    function clearSearch(){
        setSearchQuery("");
    }

    return (
      <>
        <div
          className={`relative transition-all duration-300 ${
            isFocused ? "w-96" : "w-82"
          }`}
        >
          <div
            className={`
        flex items-center border-1 bg-white rounded-lg px-3 py-2
        ${
          isFocused
            ? "border-indigo-600 shadow-lg"
            : "border-gray-500 hover:border-indigo-600"
        }
        transition-all duration-400
      `}
          >
            <FiSearch size={17}
              className={`text-gray-500 mr-2 ${
                isFocused ? "text-indigo-500" : ""
              }`}
            />

            <input
              type="text"
              id="search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full focus:outline-none placeholder-gray-500 text-gray-700"
              placeholder="What are you looking for?"
            />

            {searchQuery && (
              <button
                aria-label="Clear search"
                onClick={clearSearch}
                className="ml-2 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              >
                <FiX size={17}/>
              </button>
            )}
          </div>
        </div>
      </>
    );
}

export default SearchBar
