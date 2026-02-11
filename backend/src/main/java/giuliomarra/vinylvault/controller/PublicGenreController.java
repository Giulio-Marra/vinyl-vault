package giuliomarra.vinylvault.controller;

import giuliomarra.vinylvault.model.Genre;
import giuliomarra.vinylvault.service.GenreService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/genre")
public class PublicGenreController {

    private final GenreService genreService;

    public PublicGenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping
    public List<Genre> getAllGenres() {
        return genreService.getAllGenres();
    }
}
