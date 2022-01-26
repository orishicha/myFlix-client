import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './genre-view.scss';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

export class GenreView extends React.Component {

    render() {
        const { Genre, onBackClick } = this.props;

        return (
            <Container fluid>
                <Card>
                    <Card.Title>Genre</Card.Title>
                    <div>
                        <span className="label">Name: </span>
                        <span className="value">{Genre.Name}</span>
                    </div>
                    <div>
                        <span className="label">Description: </span>
                        <span className="value">{Genre.Description}</span>
                    </div>

                    <div className="backButton">
                        <Button variant="outline-light" onClick={() => { onBackClick(null); }}>Back</Button>
                    </div>
                </Card>
            </Container>
        );
    }
}

GenreView.proptypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
};
