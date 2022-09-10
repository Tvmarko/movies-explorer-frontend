import React, { useState, useEffect } from 'react';
import "./App.css";
import { Route, Switch, useHistory, useLocation, Redirect } from "react-router-dom";
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
import { ShortMovieDuration } from "../../utils/config";

function App() {
  const history = useHistory();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isSavedShortMovies, setIsSavedShortMovies] = useState(false);
  const [message, setMessage] = useState("");
  const [filmsInputSearch, setFilmsInputSearch] = useState('');
  const [savedFilmsInputSearch, setSavedFilmsInputSearch] = useState('');
  const [serverError, setServerError] = useState({
    failed: false,
    message: "",
  });
                     
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
          setLoggedIn(false);
          history.push("/");
    });
  }
        // eslint-disable-next-line react-hooks/exhaustive-deps
}, [loggedIn, history]);
  
  useEffect(() => {
  if (loggedIn && location.pathname === "/movies") {
    moviesApi.getMovies()
        .then((res) => {
          if (res.length) {
        localStorage.setItem("movieList", JSON.stringify(res));
        }
      })
      .catch((err) => {
        console.log(err);
       });
  }
}, [loggedIn, location, currentUser]);

useEffect(() => {
  if (loggedIn && (location.pathname === "/saved-movies" || location.pathname === "/movies")) {
          mainApi.getMovies()
              .then((res) => {
                 const savedMoviesList = res.filter(item => (item.owner === currentUser._id));
                 localStorage.setItem("savedMovieList", JSON.stringify(savedMoviesList));
                 setSavedMovies(JSON.parse(localStorage.getItem("savedMovieList")));
              })
              .catch((err) => {
                console.log(err);
               });

              const localStorageFilmsInputSearch = localStorage.getItem("keyword");
              if (localStorageFilmsInputSearch && location.pathname === "/movies") {
                setFilmsInputSearch(localStorageFilmsInputSearch);
                setMovies(JSON.parse(localStorage.getItem("foundMovieList")));
              }
              if (localStorageFilmsInputSearch && location.pathname === "/saved-movies") {
                setSavedFilmsInputSearch("");
               }
              const isShortMoviesStateFromStorage =
                localStorage.getItem("!isShortMovies") === "true";
                if (isShortMoviesStateFromStorage && location.pathname === "/movies") {
                  setIsShortMovies(isShortMoviesStateFromStorage);
                }
                if (location.pathname === "/saved-movies") {
                  setIsSavedShortMovies("");
                 }
              }
            // eslint-disable-next-line react-hooks/exhaustive-deps 
}, [loggedIn, currentUser]);

useEffect(() => {
  if (location.pathname === "/saved-movies") {
    handleSearchSavedMovie(savedFilmsInputSearch);
  } else {
    if (filmsInputSearch) {
      handleSearchMovie(filmsInputSearch);
    }
  }
 // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [isShortMovies, isSavedShortMovies, location.pathname]);

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setSavedFilmsInputSearch("");
      setIsSavedShortMovies(false);
      setFoundSavedMovies(savedMovies);
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [location.pathname]);

    useEffect(() => {
      if (location.pathname === "/profile" || location.pathname === "/signin" || location.pathname === "/signup") {
        setServerError({
          failed: false,
          message: "",
        });
      }
     // eslint-disable-next-line react-hooks/exhaustive-deps 
      }, [location.pathname]);

function handleSearchMovie(keyword) {
  const movieList = JSON.parse(localStorage.getItem("movieList"));
  if (movieList) {
    let searchedMovies = movieList.filter(
      (item) => (item.nameRU.toLowerCase().includes(keyword.toLowerCase())));
      if (isShortMovies) {
        searchedMovies = filterShortMovies(searchedMovies)
      }
      localStorage.setItem("foundMovieList", JSON.stringify(searchedMovies));
      localStorage.setItem("keyword", keyword);
      if (searchedMovies.length === 0) {
        setMessage("Ничего не найдено");
       } else {
        setMovies(searchedMovies);
        setMessage("");
      }
    }
  }
    
  function filterShortMovies(moviesArr) {
    return moviesArr.filter((movie) => movie.duration <= ShortMovieDuration);
  }

  function handleSearchSavedMovie(keyword) {
    const savedMovieList = JSON.parse(localStorage.getItem("savedMovieList"));
    if (savedMovieList) {
    let searchSavedMovies = savedMovieList.filter(
    (item) => (item.nameRU.toLowerCase().includes(keyword.toLowerCase())));
     if (isSavedShortMovies) {
        searchSavedMovies = filterShortMovies(searchSavedMovies)
      }
      if (searchSavedMovies.length === 0) {
        setMessage("Нет фильмов");
      } else {
        setFoundSavedMovies(searchSavedMovies)
        setMessage("");
     }
   }
 }
 
 function handleSaveMovie(movie) {
  mainApi
    .addMovie(movie)
    .then((userAddedMovie) => {
        localStorage.setItem("savedMovieList", JSON.stringify([userAddedMovie, ...savedMovies]));
        setSavedMovies([userAddedMovie, ...savedMovies]);
      })
    .catch((err) => {
      console.log(`Ошибка при сохранении фильма: ${err}`);
      setMessage("Ошибка при сохранении фильма");
    });
}

	function handleDeleteMovie(movie) {
		mainApi
      .deleteMovie(movie.movieId)
      .then(() => {
        const res = savedMovies.filter((item) => item.movieId !== movie.movieId);
        const filteredSavedFoundedMovies = foundSavedMovies.filter((item) => item.movieId !== movie.movieId);
        setFoundSavedMovies(filteredSavedFoundedMovies)
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
  localStorage.setItem("!isShortMovies", !isShortMovies);
}

function searchShortSavedMovies() {
  setIsSavedShortMovies(!isSavedShortMovies);
}

function editProfile(user) {
  mainApi.editProfile(user)
  .then((userUpdatedData) => {
    setCurrentUser({
      ...currentUser,
      name: userUpdatedData.name,
      email: userUpdatedData.email,
    });
    setServerError({
      failed: true,
      message: "Данные обновлены",
    });
  })
  .catch((err) => {
    setServerError({
      failed: true,
      message: "Указанный email уже существует",
    });
  })
}

function handleRegister(name, email, password) {
 mainApi.register(name, email, password)
 .then((res) => {
    if (res) {
      handleLogin(email, password);
      setCurrentUser(res);
      setServerError({
        successful: false,
        message: "Вы успешно зарегистрировались!",
      });
     }
    })
.catch((err) => {
  setServerError({
    failed: true,
    message: err.toString(),
  });
  })
}

function handleLogin(email, password) {
  mainApi.login(email, password)
  .then((data) => {
    if(data.token) {
      localStorage.setItem("jwt", data.token);
      setLoggedIn(true);
      history.push("/movies");
    }
  })
  .catch((err) => {
    setServerError({
      failed: true,
      message: err.toString(),
    });
  })
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("movieList");
    localStorage.removeItem("savedMovieList");
    localStorage.removeItem("foundMovieList");
    localStorage.removeItem("keyword");
    setMovies([]);
    setSavedMovies([]);
    setCurrentUser({});
    setFilmsInputSearch("");
    setSavedFilmsInputSearch("");
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
            message={message}
            serverError={serverError}
            filmsInputSearch={filmsInputSearch}
            setFilmsInputSearch={setFilmsInputSearch}
            component={Movies}>
        </ProtectedRoute>
        <ProtectedRoute path="/saved-movies"
            loggedIn={loggedIn}
            movies={movies}
            savedMovies={foundSavedMovies}
            searchMovies={handleSearchSavedMovie}
            isShortMovie={isSavedShortMovies}
            searchShortMovies ={searchShortSavedMovies}
            deleteSavedMovie={handleDeleteMovie}
            message={message}
            serverError={serverError}
            filmsInputSearch={savedFilmsInputSearch}
            setFilmsInputSearch={setSavedFilmsInputSearch}
            component={SavedMovies}>
        </ProtectedRoute>
         <Route path="/signup">
         {loggedIn ? (
                <Redirect to="/movies" />
              ) : (
          <Register 
           handleRegister={handleRegister} 
           serverError={serverError}
           />
           )}
        </Route>
        <Route path="/signin">
        {loggedIn ? (
                <Redirect to="/movies" />
              ) : (
          <Login 
            handleLogin={handleLogin} 
            loggedIn={loggedIn}
            serverError={serverError}
            />
            )}
        </Route>
        <ProtectedRoute path="/profile"
         loggedIn={loggedIn}
         onSignOut={handleSignOut}
         editProfile={editProfile}
         serverError={serverError}
         setServerError={setServerError}
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