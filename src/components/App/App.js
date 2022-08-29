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
  const [message, setMessage] = useState("");
     
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      mainApi.checkToken()
        .then(({ name, email, _id }) => {
          setLoggedIn(true);
          setCurrentUser({ name, email, _id });
          history.push(location.pathname);
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          setLoggedIn(false);
          history.push("/");
          console.log(err);
    });
  }
        // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  useEffect(() => {
    if (loggedIn && location.pathname === "/movies") {
        moviesApi.getMovies()
        .then((allMovies) => {
          setMovies(allMovies);
          localStorage.setItem("movieList", JSON.stringify(allMovies));
        })
        .catch((err) => {
          console.log(err);
      })
    }
  }, [loggedIn, location]);


useEffect(() => {
  if (loggedIn && (location.pathname === "/saved-movies"|| location.pathname === "/movies")) {
          mainApi.getMovies()
              .then((res) => {
                 const savedMoviesList =res.filter(item => (item.owner === currentUser._id));
                 localStorage.setItem("savedMovieList", JSON.stringify(savedMoviesList));
                 setSavedMovies(JSON.parse(localStorage.getItem("savedMovieList")));
              })
              .catch((err) => {
                console.log(err);
              })
          }
}, [loggedIn, location, currentUser]);

function handleSearchMovie(movie) {
  const movieList = JSON.parse(localStorage.getItem('movieList'));
  if (movieList) {
    const searchedMovies = movieList.filter(
      (item) => (item.nameRU.toLowerCase().includes(movie.toLowerCase())) && (isShortMovies ? item.duration < 50 : ' '));
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
      (item) => (item.nameRU.toLowerCase().includes(movie.toLowerCase())) && (isShortMovies ? item.duration < 50 : ' '));
      if (searchSavedMovies.length) {
        setSavedMovies(searchSavedMovies);
        } else {
        setSavedMovies([]);
        }
      }
    }
  
  function handleLikeChange(movie) {
    const isSavedMovie = savedMovies.some((item) => +item.movieId === movie.id);
    if (isSavedMovie) {
      const savedMovie = savedMovies.find((item) => +item.movieId === movie.id);
      handleDislikeClick(savedMovie);
    }
    if (!isSavedMovie) {
      handleLikeClick(movie);
    }
  }

    function handleLikeClick(movie) {
    mainApi
      .addMovie(movie)
      .then((newMovie) => {
        if (!newMovie) {
          throw new Error("При добавлении фильма произошла ошибка");
        } else {
        localStorage.setItem("savedMovieList", JSON.stringify(newMovie = [newMovie.movie, ...savedMovies]));
        setSavedMovies(newMovie);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

	function handleDislikeClick(movie) {
		mainApi
      .deleteMovie(movie.movieId)
      .then(() => {
        const savedMovieList = JSON.parse(localStorage.getItem("savedMovieList"));
        const res = savedMovieList.filter((item) => item.movieId !== movie.movieId);
        localStorage.setItem("savedMovieList", JSON.stringify(res));
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(err);
      });
}

function handleDeleteMovie(movie) {
  handleDislikeClick(movie);
}

function searchShortMovies() {
  setIsShortMovies(!isShortMovies);
}

function isLikedMovie(movie) {
  const isSavedMovie = savedMovies.some((item) => +item.movieId === movie.id);
  return isSavedMovie;
}

function editProfile(name, email) {
  mainApi.editProfile(name, email)
  .then((userUpdatedData) => {
    setCurrentUser(userUpdatedData);
    setMessage("Данные профиля успешно обновлены");
  })
  .catch((err) => {
    console.log(err);
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
    }
})
  .catch((err) => {
    if (err === 409) {
      setMessage("Пользователь с таким email уже существует");
    } else {
      setMessage("При регистрации пользователя произошла ошибка");
    }
  });
}

function handleLogin(email, password) {
  mainApi.login(email, password)
  .then((data) => {
      setLoggedIn(true);
      localStorage.setItem("jwt", data.token);
      history.push("/movies");
    })
  .catch((err) => {
    setMessage("При авторизации произошла ошибка");
    if (err === 401) {
      setMessage("Пользователь с таким email не найден");
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
            isLikedMovie={isLikedMovie}
            isShortMovie={isShortMovies}
            searchShortMovies ={searchShortMovies}
            handleMovie={handleLikeChange}
            searchMovies={handleSearchMovie}
            deleteMovie={handleDeleteMovie}
            component={Movies}>
        </ProtectedRoute>
        <ProtectedRoute path="/saved-movies"
            loggedIn={loggedIn}
            movies={movies}
            savedMovies={savedMovies}
            searchMovies={handleSearchSavedMovie}
            isShortMovie={isShortMovies}
            searchShortMovies ={searchShortMovies}
            deleteMovie={handleDeleteMovie}
            isSavedMovies={true}
            component={SavedMovies}>
        </ProtectedRoute>
         <Route path="/signup">
          <Register 
           handleRegister={handleRegister} message={message}
        />
        </Route>
        <Route path="/signin">
          <Login 
            handleLogin={handleLogin} message={message}
        />
        </Route>
        <ProtectedRoute path="/profile"
         loggedIn={loggedIn}
         onSignOut={handleSignOut}
         editProfile={editProfile}
         message={message}
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