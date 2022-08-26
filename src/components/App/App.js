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
  const [findMovies, setFindMovies] = useState(true);
  const [findSavedMovies, setFindSavedMovies] = useState(true);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
   
  useEffect(() => {
    checkToken();
    history.push("/");
    if (loggedIn) {
      mainApi.getUser()
        .then(({userData}) => {
        setCurrentUser({userData});
  })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn, history]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
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
  
  useEffect(() => {
    if (loggedIn && location.pathname === "/movies") {
        setIsLoading(true);
        moviesApi.getMovies()
            .then((res) => {
               if (res.length) {
                   localStorage.setItem("movies",
                       JSON.stringify(res.filter((item) => (item.image && item.country && item.nameEN && item.director && item.trailerLink.startsWith('http'))))
                   );
                   setMovies(JSON.parse(localStorage.getItem('movies')));
                   setFindMovies(true);
                } else {
                   setFindMovies(false);
               }
            })
            .catch((err) => {
                setFindMovies(false);
                console.log(`Ошибка при загрузке фильмов: ${err}`)
            })
            .finally(() => setTimeout(() => {
                setIsLoading(false);
            },2000));
    }
}, [loggedIn, location]);

useEffect(() => {
  if (loggedIn && (location.pathname === '/saved-movies' || location.pathname === '/movies')) {
          mainApi.getMovies()
              .then((res) => {
                  if (res.length) {
                      const ownerSavedMovies = res.filter(item => (item.owner === currentUser._id));
                      localStorage.setItem('savedMovies', JSON.stringify(ownerSavedMovies));
                      setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
                      setFindSavedMovies(true);
                  } else {
                      setFindSavedMovies(false);
                  }
              })
              .catch((err) => {
                  setFindSavedMovies(false);
                  console.log(`Ошибка при загрузке фильмов: ${err}`)
              })
              .finally(() => setTimeout(() => {
                  setIsLoading(false);
              }, 2000));
  }
}, [loggedIn, location, currentUser]);

function onSearchSubmit(movie) {
  if (movie) {
      let token;
      let setAllMovies;
      let setFind;

      if (location.pathname === '/movies') {
          token = 'movies';
          setAllMovies = setMovies;
          setFind = setFindMovies;
      } else {
          token = 'savedMovies';
          setAllMovies = setSavedMovies;
          setFind = setFindSavedMovies;
      }

      const movies = JSON.parse(localStorage.getItem(token));
      const findMovies = movies.filter((item) => (item.nameRU.toLowerCase().includes(movie.toLowerCase())) && (isShortMovies ? item.duration < 40 : ' '));

      if (findMovies.length) {
          setFind(true);
          setAllMovies(findMovies);
      } else {
          setFind(false);
      }
  }
}

function saveMovie(movie) {
  mainApi.addMovie(movie)
      .then((newSavedMovie) => {
        setSavedMovies([JSON.parse(localStorage.getItem('savedMovies')), ...savedMovies]); 
          localStorage.setItem('savedMovies', JSON.stringify(newSavedMovie));
       })
      .catch((err) => {
          console.log(`Не удалось сохранить фильм: ${err}`);
      });
}

function deleteMovie(movie) {
  mainApi.deleteMovie(movie.movieId)
      .then(() => {
          const res = savedMovies.filter((item) => item.movieId !== movie.movieId);
          setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
          localStorage.setItem('savedMovies', JSON.stringify(res));
          if (!JSON.parse(localStorage.getItem('savedMovies')).length)
              setFindSavedMovies(false);
      })
        .catch((err) => {
          console.log(`Не удалось удалить фильм: ${err}`);
      });
}

function editProfile(user) {
  mainApi.editProfile(user)
  .then((userUpdatedData) => {
    setCurrentUser({
      ...currentUser,
      name: userUpdatedData.name,
      email: userUpdatedData.email,
      password: userUpdatedData.password,
    });
  })
    .catch((err) => {
    console.log(err); 
      })
  }

function handleRegister({name, email, password}) {
 mainApi.register(name, email, password)
 .then((res) => {
    if(res){
    history.push("/sign-in");
    } 
  })
    .catch((err) => {
    console.log(err); 
      })
  }

function handleLogin({email, password}) {
  mainApi.login(email, password)
  .then((data) => {
    if(data.token){
      localStorage.setItem('jwt', data.token);
      checkToken();
        history.push('/movies');
    }
  })
    .catch((err) => {
    console.log(err); 
      })
  }

function checkToken() {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    setLoggedIn(true);
  }
}

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setMovies([]);
    setSavedMovies([]);
    setCurrentUser({});
    history.push('/');
  }

function onSearchShortMovies() {
  setIsShortMovies(!isShortMovies);
}

function  likeMovie(movie) {
  return savedMovies.some((item) => +item.movieId === movie.id);
}

    return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
      <div className="page">
      <Switch>
        <Route exact path="/">
          <Header/>
          <Main/>
          <Footer />
        </Route>
        <ProtectedRoute 
            path="/movies"
                      loggedIn={loggedIn}
                      movies={movies}
                      savedMovies={savedMovies}
                      isLoading={isLoading}
                      isLikedMovie={ likeMovie}
                      findMovies={findMovies}
                      searchMovies={{ isShortMovies, onSearchSubmit, onSearchShortMovies }}
                      saveMovie={saveMovie}
                      deleteMovie={deleteMovie}
                      component={Movies}>
              </ProtectedRoute>
                <ProtectedRoute path="/saved-movies"
                      loggedIn={loggedIn}
                      movies={movies}
                      savedMovies={savedMovies}
                      isLoading={isLoading}
                      findSavedMovies={findSavedMovies}
                      searchMovies={{ isShortMovies, onSearchSubmit, onSearchShortMovies }}
                      deleteMovie={deleteMovie}
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