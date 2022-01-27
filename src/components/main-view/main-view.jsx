import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './main-view.scss';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { NavbarView } from '../navbar-view/navbar-view';

export class MainView extends React.Component {

    constructor() {
        super();
// Initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    /* User registers */
    onRegistration(registration) {
        this.setState({
            registration,
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    getMovies(token) {
        axios.get('https://orishflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { movies, user } = this.state;

        if (!user) {
            return (
                <Row>
                    <Col>
                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                </Row>
            );
        }

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <>
                <NavbarView user={user} />
                <Row className="main-view justify-content-md-center">
                    <Router>
                        <Routes>
                            <Route exact path="/" render={() => {
                                return (
                                    <>
                                        movies.map(movie => (
                                            <Col md={3} key={movie._id}>
                                                <MovieCard movie={this.movie} onMovieClick={() => {}} />
                                            </Col>
                                        ));
                                    </>
                                );
                            }} />
                            <Route path="/register" render={() => {
                                if (user) return <Redirect to="/" />
                                return <Col>
                                    <RegistrationView />
                                </Col>
                            }} />
                            <Route path="/movies/:movieId" render={({ match, history }) => {
                                if (!user) return <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                                if (movies.length === 0) return <div className="main-view" />;
                                return <Col md={8}>
                                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />
                            <Route path="/users/:username" render={({ match, history }) => {
                                if (!user) return <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                                if (movies.length === 0) return <div className="main-view" />;
                                return <Col md={8}>
                                    <ProfileView user={movies.find(m => m.username === match.params.username)} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />
                            <Route path="/genres/:name" render={({ match, history }) => {
                                if (!user) return <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                                if (movies.length === 0) return <div className="main-view" />;
                                return <Col md={8}>
                                    <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />
                            <Route path="/directors/:name" render={({ match, history }) => {
                                if (!user) return <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                                if (movies.length === 0) return <div className="main-view" />;
                                return <Col md={8}>
                                    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />
                        </Routes>
                    </Router>
                </Row>
            </>
        );
    }
}
