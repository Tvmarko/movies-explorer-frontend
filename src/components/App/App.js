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
  const [moviesMessage, setMoviesMessage] = useState("");
  const [message, setMessage] = useState("");
  const [filmsInputSearch, setFilmsInputSearch] = useState('');
                 
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if((token !== null)) {
      mainApi.getProfileInfo()
        .then(({ name, email, _id }) => {
          setLoggedIn(true);
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
  const token = localStorage.getItem("jwt");
  if(token){
    mainApi.checkToken(token)
      .then((res) => {
        if(res){
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err); 
      });
  }
}, [history]);

  useEffect(() => {
  if (loggedIn && location.pathname === "/movies") {
    moviesApi.getMovies()
        .then((res) => {
        localStorage.setItem("movieList", JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err); 
        setMessage({
          successful: false,
          message:
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
        });
    })
    const localStorageFilmsInputSearch = localStorage.getItem("keyword");
    if (localStorageFilmsInputSearch) {
      setFilmsInputSearch(localStorageFilmsInputSearch);
      setMovies(JSON.parse(localStorage.getItem("foundMovieList")));
    }
  }
}, [loggedIn, location, currentUser]);

useEffect(() => {
  if (loggedIn && (location.pathname === "/saved-movies"|| location.pathname === "/movies")) {
          mainApi.getMovies()
              .then((res) => {
                 const savedMoviesList = res.filter(item => (item.owner === currentUser._id));
                 localStorage.setItem("savedMovieList", JSON.stringify(savedMoviesList));
                 setSavedMovies(JSON.parse(localStorage.getItem("savedMovieList")));
              })
              .catch((err) => {
                console.log(err);
                setMessage({
                  successful: false,
                  message:
                    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
                });
              });
            }
}, [loggedIn, location, currentUser]);

function handleSearchMovie(keyword) {
  const movieList = JSON.parse(localStorage.getItem("movieList"));
  if (movieList) {
    const searchedMovies = movieList.filter(
      (item) => (item.nameRU.toLowerCase().includes(keyword.toLowerCase())) && (isShortMovies ? item.duration < 40 : ' '));
      localStorage.setItem("foundMovieList", JSON.stringify(searchedMovies));
      localStorage.setItem("keyword", keyword);
      if (searchedMovies.length) {
      setMovies(searchedMovies);
      setMoviesMessage("");
      } else {
        setMovies([]);
        setMoviesMessage("Ничего не найдено");
      }
    }
  }
    
  function handleSearchSavedMovie(keyword) {
    const searchSavedMovies = savedMovies.filter(
      (item) => (item.nameRU.toLowerCase().includes(keyword.toLowerCase())) && (isShortMovies ? item.duration < 40 : ' '));
      localStorage.setItem('savedMovieList', JSON.stringify(searchSavedMovies));
      if (searchSavedMovies.length) {
        setSavedMovies(searchSavedMovies);
        setMoviesMessage("");
        } else {
        setSavedMovies([]);
        setMoviesMessage("Ничего не найдено");
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
    setMessage("Профиль обновлен");
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
    if (err.status === 409) {
      setMessage("Пользователь с таким email уже существует");
    } else {
      setMessage("При изменении данных профиля произошла ошибка");
    }
   });
}

function handleRegister(name, email, password) {
 mainApi.register(name, email, password)
 .then((res) => {
    if (res) {
      handleLogin(email, password);
      setCurrentUser(res);
      setMessage("");
    }
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
  if (err === 409) {
    setMessage("Пользователь с таким email уже существует");
  } else {
    setMessage("Ошибка при регистрации пользователя");
  }
  });
}

function handleLogin(email, password) {
  mainApi.login(email, password)
  .then((data) => {
    if(data.token) {
      localStorage.setItem("jwt", data.token);
      setLoggedIn(true);
      setMessage("");
      history.push("/movies");
    }
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
    setMessage("Ошибка при авторизации пользователя");
        if (err === 401) {
          setMessage("Пользователя с таким email не существует");
        }
        if (err === 400) {
          setMessage("Неверный email или пароль");
        }
    localStorage.removeItem("jwt");
  });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("movies");
    localStorage.removeItem("savedMovies");
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
            message={moviesMessage}
            filmsInputSearch={filmsInputSearch}
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
            message={moviesMessage}
            filmsInputSearch={filmsInputSearch}
            component={SavedMovies}>
        </ProtectedRoute>
         <Route path="/signup">
          <Register 
           handleRegister={handleRegister} 
           message={message}
        />
        </Route>
        <Route path="/signin">
          <Login 
            handleLogin={handleLogin} 
            loggedIn={loggedIn}
            message={message}
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