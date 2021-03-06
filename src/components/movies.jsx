import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MovieTable from "./movieTable";
import _ from 'lodash';
import SearchBox from "./searchBox";

class FetchMovies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: '',
    selectedGenre: null,
    sortColumn:{path:'title', order:'asc'}
  };
  async componentDidMount() {
    const { data }= await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ name: 'All Genres' , _id:'' }, ...data]
    this.setState({ movies, genres });
    
  }
  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });
    try{
      await deleteMovie(movie._id);
    }
    catch (exception){
      if (exception.response && exception.response.status === 404) toast.error('Movie has already been deleted')
      this.setState({ movies: originalMovies })
    }
  };
  handleLike = movie => {
    // console.log('like clicked', movie)
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = page => {
    // console.log(page);
    this.setState({ currentPage: page });
  };
  handleGenreSelect = genre => {
    // console.log(genre);
    this.setState({ selectedGenre: genre, searchQuery:'', currentPage: 1 });
  };
  handleSort = (sortColumn) =>{
    // console.log(path);
    this.setState({sortColumn});
  }
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
  }
  getPagedData = () => {
    const { currentPage, selectedGenre, pageSize, movies: allMovies, sortColumn, searchQuery } = this.state
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies }
  }
  render() {
    // const { length: count } = this.state.movies;
    const { currentPage, pageSize, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    const { totalCount, data: movies } = this.getPagedData();
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <ListGroup items={this.state.genres} onItemSelect={this.handleGenreSelect} selectedItem={this.state.selectedGenre}
                // textProperty='name'
                // valueProperty='_id'
              />
            </div>
            <div className="col">
              {user && <Link to='/movies/new' className='btn btn-primary mb-2'>New Movie</Link>}
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <p className="mt-4">Showing {totalCount} movies in the database </p>
              <MovieTable movies={movies} onDelete={this.handleDelete} onLike={this.handleLike} onSort={this.handleSort} sortColumn={sortColumn} />
              <Pagination itemsCount={totalCount} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FetchMovies;
