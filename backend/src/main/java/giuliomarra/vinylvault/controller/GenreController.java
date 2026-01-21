package giuliomarra.vinylvault.controller;

import giuliomarra.vinylvault.dto.NewGenreRequiredDto;
import giuliomarra.vinylvault.model.Genre;
import giuliomarra.vinylvault.service.GenreService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/genre")
@PreAuthorize("hasAuthority('ADMIN')")
public class GenreController {

    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @PostMapping
    public Genre createGenre(@RequestBody NewGenreRequiredDto body) {
        return genreService.saveNewGenre(body);
    }


    @GetMapping("/{id}")
    public Genre getGenreById(@PathVariable Long id) {
        return genreService.getGenreById(id);
    }

    @PutMapping("/{id}")
    public Genre updateGenre(@PathVariable Long id, @RequestBody NewGenreRequiredDto body) {
        return genreService.updateGenre(id, body);
    }

    @DeleteMapping("/{id}")
    public void deleteGenre(@PathVariable Long id) {
        genreService.deleteGenre(id);
    }
}
