import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const testInput = {
    title: 'Test Movie',
    year: 2000,
    genres: ['action', 'horror'],
  };

  describe('getAll', () => {
    it('should return an array containing movies', () => {
      const movies = service.getAll();
      expect(movies).toBeInstanceOf(Array);
      movies.forEach(movie => expect(movie).toBeInstanceOf(Movie));
    });
  });

  describe('getById', () => {
    it('should return a movie', () => {
      const testInstance = service.create(testInput);

      const movie = service.getById(testInstance.id);
      expect(movie).toBeDefined();
    });

    it('should throw 404 error', () => {
      try {
        service.getById(-1);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('deletes a movie', () => {
      const testInstance = service.create(testInput);
      const movie = service.getById(testInstance.id);
      expect(movie).toBeDefined();

      const lenthBeforeDelete = service.getAll().length;
      service.delete(testInstance.id);
      const lenthAfterDelete = service.getAll().length;
      expect(lenthAfterDelete).toEqual(lenthBeforeDelete - 1);

      try {
        service.getById(testInstance.id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

    it('should return a 404', () => {
      try {
        service.delete(-1);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const lengthBeforeCreate = service.getAll().length;
      const movie = service.create(testInput);
      const lengthAfterCreate = service.getAll().length;
      expect(lengthAfterCreate).toEqual(lengthBeforeCreate + 1);

      expect(movie).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      const movie = service.create(testInput);
      const updatedMovie = service.update(movie.id, { title: 'Updated title' });
      expect(updatedMovie.title).toEqual('Updated title');
    });

    it('should return 404 error', () => {
      try {
        service.update(-1, {});
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
