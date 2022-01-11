import React from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                {_id: 1, Title: 'Silence of the Lambs', Description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.', ImagePath: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2F%25D0%259C%25D0%25BE%25D0%25BB%25D1%2587%25D0%25B0%25D0%25BD%25D0%25B8%25D0%25B5_%25D1%258F%25D0%25B3%25D0%25BD%25D1%258F%25D1%2582_(%25D1%2584%25D0%25B8%25D0%25BB%25D1%258C%25D0%25BC)&psig=AOvVaw3v4zs5ANvjUmuJn7Olat8-&ust=1642028069071000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiUnLDlqvUCFQAAAAAdAAAAABAD', Genre: 'Thriller', Director: 'Jonathan Demme'},
                {_id: 2, Title: 'Hannibal', Description: 'A decade after tracking down serial killer FBI Special Agent Clarice Starling is blamed for a botched drug raid which results in the deaths of five people. Starling is contacted by Mason Verger, the only surviving victim of the cannibalistic serial killer Hannibal Lecter, who has been missing since escaping custody during the Gumb investigation.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Hannibal_movie_poster.jpg', Genre: 'Thriller', Director: 'Ridley Scott'},
                {_id: 3, Title: 'The 40-Year-Old Virgin', Description: 'Andy Stitzer is a shy 40-year-old introvert who works as a stock supervisor at electronics store Smart Tech. He gave up trying to have sex after various failed attempts and lives alone in an apartment with a collection of action figures and video games. When a conversation at a poker game with his co-workers David, Jay, and Cal turns to past sexual exploits, they learn that he secretly is still a virgin.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/4/43/40-Year-OldVirginMoviePoster.jpg', Genre: 'Comedy', Director: 'Judd Apatow'}
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;


        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
                    ))
                }
            </div>
        );
    }

}
