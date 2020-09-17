import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  searchMovies(@Query() searchCondition) {
    return {
      searchCondition,
      msg: 'We are searching for a movie with a title',
    };
  }

  @Get(':id')
  getMovieById(@Param('id') movieId: number): Movie {
    return this.moviesService.getById(movieId);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  removeMovie(@Param('id') movieId: number) {
    return this.moviesService.deleteById(movieId);
  }

  @Patch(':id')
  updateMovie(
    @Param('id') movieId: number,
    @Body() updateData: UpdateMovieDTO,
  ) {
    return this.moviesService.update(movieId, updateData);
  }
}
