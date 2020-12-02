import React from 'react';
import {MovieItem} from './movieItem';

export class Movies extends React.Component{

    render(){
        //passing to MovieItem.js
        return this.props.movies.map( (movie)=>{
            return <MovieItem movie={movie} ReloadData={this.props.ReloadData}></MovieItem>
        })
    }
}