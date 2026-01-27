package giuliomarra.vinylvault.service;

import giuliomarra.vinylvault.dto.NewGenreRequiredDto;
import giuliomarra.vinylvault.exceptions.AlreadyExistException;
import giuliomarra.vinylvault.exceptions.NotFoundException;
import giuliomarra.vinylvault.model.Genre;
import giuliomarra.vinylvault.repository.GenreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreService {

    private final GenreRepository genreRepository;

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public Genre saveNewGenre(NewGenreRequiredDto body) {
        if (genreRepository.existsByName(body.name())) {
            throw new AlreadyExistException("Genere già esistente");
        }

        Genre genre = new Genre(body.name());
        return genreRepository.save(genre);
    }

    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    public Genre getGenreById(Long id) {
        return genreRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Genere non trovato con id: " + id));
    }

    public Genre updateGenre(Long id, NewGenreRequiredDto body) {
        Genre genre = getGenreById(id);

        if (!genre.getName().equalsIgnoreCase(body.name())
                && genreRepository.existsByName(body.name())) {
            throw new AlreadyExistException("Genere già esistente");
        }

        genre.setName(body.name());
        return genreRepository.save(genre);
    }

    public void deleteGenre(Long id) {
        Genre genre = getGenreById(id);
        genreRepository.delete(genre);
    }
}
