import { Injectable, NotFoundException } from '@nestjs/common';
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
    const movie = this.movies.find(movie => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie With ID ${id}`);
    }
    return movie;
  }

  create(movieData: CreateMovieDTO): Movie {
    this.movies.push({ id: this.cnt++, ...movieData });
    return this.movies.find(movie => movie.id === this.cnt - 1);
  }

  update(id: number, updateDate: UpdateMovieDTO) {
    this.getById(id);
    this.movies = this.movies.map(movie =>
      movie.id === id ? (movie = { ...movie, ...updateDate }) : movie,
    );
    return this.movies.find(movie => movie.id === id);
  }

  delete(id: number): boolean {
    this.getById(id);
    this.movies = this.movies.filter(movie => movie.id !== id);
    return true;
  }
}
