import './App.css'
import SearchIcon from './assets/search.svg'
import {useEffect, useState} from "react";
import MovieCard from "./Components/MovieCard.jsx";


//80fb5f7d
const API_URL = `http://www.omdbapi.com?apikey=80fb5f7d`;

function App() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search)
    }

    const handleEnterKey = (event) => {
        let code = event.keyCode || event.which;
        if ( code === 13) {
            searchMovies(search)
        }
    }

    useEffect(() => {
        searchMovies('all')
    }, [])



  return (
    <div className='app'>
        <h1>Motion-Picture</h1>
        <div className="search">
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleEnterKey}
            />
            <img
            src={SearchIcon}
            alt="Search"
            onClick={() => searchMovies(search)}
            />
        </div>
        {
            movies?.length > 0
            ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                )
                :
                (
                    <div className="empty">
                        <h2>No movies Found!</h2>
                    </div>
                )
        }
    </div>
  )
}

export default App
