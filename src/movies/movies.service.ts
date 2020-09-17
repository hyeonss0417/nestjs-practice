import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  private cnt = 0;

  getAll(): Movie[] {
    return this.movies;
  }

  getById(id: number): Movie {
    return this.movies.find(movie => movie.id === +id);
  }

  create(movieData: CreateMovieDTO) {
    this.movies.push({ id: this.cnt++, ...movieData });
    return this.movies;
  }

  update(id: number, updateDate: UpdateMovieDTO) {
    this.movies = this.movies.map(movie =>
      movie.id === id ? (movie = { ...movie, ...updateDate }) : movie,
    );
    return this.movies.filter(movie => movie.id === id);
  }

  deleteById(id: number): boolean {
    this.movies = this.movies.filter(movie => movie.id !== id);
    return true;
  }
}
