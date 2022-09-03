import React, { useState, useEffect } from 'react';
import "./App.css";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";

function App() {
  const history = useHistory();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
        
  useEffect(() => {
    checkToken();
    history.push('/');
    if(loggedIn) {
      mainApi.getProfileInfo()
        .then(({ name, email, _id }) => {
          setCurrentUser({ name, email, _id });
          history.push(location.pathname);
        })
        .catch((err) => {
          console.log(err);
    });
  }
        // eslint-disable-next-line react-hooks/exhaustive-deps
}, [loggedIn, history]);

  useEffect(() => {
    if (loggedIn && location.pathname === "/movies") {
        moviesApi.getMovies()
        .then((allMovies) => {
          localStorage.setItem("movieList", JSON.stringify(allMovies));
        })
        .catch((err) => {
          console.log(`Ошибка при загрузке фильмов: ${err}`)
      })
    }
  }, [loggedIn, location]);


useEffect(() => {
  if (loggedIn && (location.pathname === "/saved-movies"|| location.pathname === "/movies")) {
          mainApi.getMovies()
              .then((res) => {
                 const savedMoviesList = res.filter(item => (item.owner === currentUser._id));
                 localStorage.setItem("savedMovieList", JSON.stringify(savedMoviesList));
                 setSavedMovies(JSON.parse(localStorage.getItem("savedMovieList")));
              })
              .catch((err) => {
                console.log(`Ошибка при загрузке фильмов: ${err}`)
              })
          }
}, [loggedIn, location, currentUser]);

useEffect(() => {
  const token = localStorage.getItem('jwt');
  if(token){
    mainApi.checkToken(token)
      .then((res) => {
        if(res){
          checkToken();
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err); 
      });
  }
}, [history]);

function checkToken() {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    setLoggedIn(true);
  }
}

function handleSearchMovie(movie) {
  const movieList = JSON.parse(localStorage.getItem('movieList'));
  if (movieList) {
    const searchedMovies = movieList.filter(
      (item) => (item.nameRU.toLowerCase().includes(movie.toLowerCase())) && (isShortMovies ? item.duration < 40 : ' '));
    if (searchedMovies.length) {
      setMovies(searchedMovies);
      } else {
      setMovies([]);
      }
    }
  }
  
  function handleSearchSavedMovie(movie) {
    const savedMovieList = JSON.parse(localStorage.getItem("savedMovieList"));
    if (savedMovieList) {
    const searchSavedMovies = savedMovieList.filter(
      (item) => (item.nameRU.toLowerCase().includes(movie.toLowerCase())) && (isShortMovies ? item.duration < 40 : ' '));
      if (searchSavedMovies.length) {
        setSavedMovies(searchSavedMovies);
        } else {
        setSavedMovies([]);
        }
      }
    }
  
  function handleSaveMovie(movie) {
    mainApi
      .addMovie(movie)
      .then((userAddedMovie) => {
          localStorage.setItem("savedMovieList", JSON.stringify(userAddedMovie));
          setSavedMovies([JSON.parse(localStorage.getItem("savedMovieList")), ...savedMovies]);
        })
      .catch((err) => {
        console.log(`Ошибка при сохранении фильма: ${err}`);
      });
  }

	function handleDeleteMovie(movie) {
		mainApi
      .deleteMovie(movie.movieId)
      .then(() => {
        const res = savedMovies.filter((item) => item.movieId !== movie.movieId);
        localStorage.setItem("savedMovieList", JSON.stringify(res));
        setSavedMovies(JSON.parse(localStorage.getItem("savedMovieList")));
      })
      .catch((err) => {
        console.log(`Ошибка при удалении фильма: ${err}`);
      });
}

function handleMovieForDelete(movie) {
  const movieForDelete = savedMovies.filter((item) => +item.movieId === movie.id);
  handleDeleteMovie(movieForDelete[0]);
}

function searchShortMovies() {
  setIsShortMovies(!isShortMovies);
}

function editProfile(user) {
  mainApi.editProfile(user)
  .then((userUpdatedData) => {
    setCurrentUser({
      ...currentUser,
      name: userUpdatedData.name,
      email: userUpdatedData.email,
    });
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
   });
}

function handleRegister(name, email, password) {
 mainApi.register(name, email, password)
 .then((res) => {
    if (res) {
      handleLogin(email, password);
      setCurrentUser(res);
    }
})
  .catch((err) => {
    console.log(`Ошибка при регистрации: ${err}`);
  });
}

function handleLogin(email, password) {
  mainApi.login(email, password)
  .then((data) => {
    if(data.token) {
      localStorage.setItem("jwt", data.token);
      checkToken();
      history.push("/movies");
    }
  })
  .catch((err) => {
    console.log(`Ошибка при авторизации: ${err}`);
    localStorage.removeItem("jwt");
  });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setMovies([]);
    setSavedMovies([]);
    setCurrentUser({});
    history.push('/');
  }

    return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
      <div className="page">
      <Switch>
        <Route exact path="/">
          <Header loggedIn={loggedIn}/>
          <Main loggedIn={loggedIn}/>
          <Footer/>
        </Route>
        <ProtectedRoute 
            path="/movies"
            loggedIn={loggedIn}
            movies={movies}
            savedMovies={savedMovies}
            isShortMovie={isShortMovies}
            searchShortMovies ={searchShortMovies}
            saveMovie={handleSaveMovie}
            searchMovies={handleSearchMovie}
            deleteMovie={handleMovieForDelete}
            component={Movies}>
        </ProtectedRoute>
        <ProtectedRoute path="/saved-movies"
            loggedIn={loggedIn}
            movies={movies}
            savedMovies={savedMovies}
            searchMovies={handleSearchSavedMovie}
            isShortMovie={isShortMovies}
            searchShortMovies ={searchShortMovies}
            deleteSavedMovie={handleDeleteMovie}
            component={SavedMovies}>
        </ProtectedRoute>
         <Route path="/signup">
          <Register 
           handleRegister={handleRegister} 
        />
        </Route>
        <Route path="/signin">
          <Login 
            handleLogin={handleLogin} 
        />
        </Route>
        <ProtectedRoute path="/profile"
         loggedIn={loggedIn}
         onSignOut={handleSignOut}
         editProfile={editProfile}
         component={Profile}>
        </ProtectedRoute>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;