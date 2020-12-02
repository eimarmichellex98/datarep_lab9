import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';//import button from react bootstrap
import axios from 'axios';
import {Link} from 'react-router-dom'; //importing link so we can use edit

export class MovieItem extends React.Component {

    constructor() {
        super();
        this.DeleteMovie = this.DeleteMovie.bind(this);
    }
    //delete movie method
    DeleteMovie(e) {
        e.preventDefault();
        axios.delete('http://localhost:4000/api/movies/'+this.props.movie._id)
        .then(()=>{
            this.props.ReloadData();
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    render() {
         //map function was used to split the array into individual movies
        //update- Card from React Bootstrap is now used instead
        return (
            <div>
                <Card>
                    <Card.Header>{this.props.movie.Title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.movie.Poster} width="200" height="200" alt="movie"></img>
                            <footer className="blockquote-footer">
                                {this.props.movie.Year}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Button variant="danger" onClick={this.DeleteMovie}>Delete</Button>
                    <Link to={"/edit/"+this.props.movie._id} className="btn btn-primary">Edit</Link>
                </Card>
            </div>
        );
    }
}