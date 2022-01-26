import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './director-view.scss';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

export class DirectorView extends React.Component {

    render() {
        const { Director, onBackClick } = this.props;

        return (
            <Container fluid>
                <Card>
                    <Card.Title>Director</Card.Title>
                    <div>
                        <span className="label">Name: </span>
                        <span className="value">{Director.Name}</span>
                    </div>
                    <div>
                        <span className="label">Bio: </span>
                        <span className="value">{Director.Bio}</span>
                    </div>
                    <div>
                        <span className="label">Birth: </span>
                        <span className="value">{Director.Birth}</span>
                    </div>
                    <div>
                        <span className="label">Death: </span>
                        <span className="value">{Director.Death}</span>
                    </div>

                    <div className="backButton">
                        <Button variant="outline-light" onClick={() => { onBackClick(null); }}>Back</Button>
                    </div>
                </Card>
            </Container>
        );
    }
}

DirectorView.proptypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
        Birth: PropTypes.string,
        Death: PropTypes.string,
    }).isRequired,
};
