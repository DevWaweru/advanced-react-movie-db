import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from '../services/movieService';

class MovieForm extends Form {
    state={
        data: {title: '', genreId: '', numberInStock: '', dailyRentalRate: ''},
        genres: [],
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().integer().min(0).max(100).required().label('Number in Stock'),
        dailyRentalRate: Joi.number().min(0).max(10).required().label('Rental Rate')
    }
    async populateGenre(){
        const { data: genres } = await getGenres();
        this.setState({ genres })
    }
    async populateMovies(){
        const movieId = this.props.match.params.id;
        if (movieId === 'new') return;
        
        try{ 
            const { data: movie } = await getMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie)});
        }
        catch (except){
            if (except.response && except.response.status === 404) this.props.history.replace('/not-found');
        }
    }
    async componentDidMount() {
        await this.populateGenre();
        await this.populateMovies();
    }
    mapToViewModel(movie){        
        return{
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }
    doSubmit = async() => {
        await saveMovie(this.state.data);
        this.props.history.push('/movies');
    }
    render() { 
        const { match } = this.props;
        return ( 
            <div>
                <h1>Movie Form {match.params.id} </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title','Title')}
                    {this.renderSelect('genreId','Genre', this.state.genres)}
                    {this.renderInput('numberInStock','Number In Stock', 'number')}
                    {this.renderInput('dailyRentalRate','Rental Rate')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default MovieForm;