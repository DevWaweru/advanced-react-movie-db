import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Like from "./common/like";
import Table from "./common/table";

class MovieTable extends Component {
    columns = [
        {path:'title', label:'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
        {path:'genre.name', label:'Genre'},
        {path:'numberInStock', label:'Stock'},
        {path:'dailyRentalRate', label:'Rate'},
        {key: 'like', path:'', label:'', content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />},
        {key: 'delete', path:'', label:'', content: movie => <button onClick={() => this.props.onDelete(movie)} className="btn btn-outline-danger" >Delete</button>},
    ]
    render() { 
        const {movies, onSort, sortColumn }= this.props
        return (
          <Table data={movies} onSort={onSort} sortColumn={sortColumn} columns={this.columns} ></Table>
        );
    }
}


export default MovieTable;
