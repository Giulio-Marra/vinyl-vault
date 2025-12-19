package giuliomarra.vinylvault.controller;

import giuliomarra.vinylvault.dto.NewArtistRequiredDto;
import giuliomarra.vinylvault.model.Artist;
import giuliomarra.vinylvault.service.ArtistService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/artist")
@PreAuthorize("hasAuthority('ADMIN')")
public class ArtistController {

    private final ArtistService artistService;

    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @PostMapping
    public Artist createArtist(@RequestBody NewArtistRequiredDto body) {
        return artistService.saveNewArtist(body);
    }

    @PutMapping("/{id}")
    public Artist updateArtist(
            @PathVariable Long id,
            @RequestBody NewArtistRequiredDto body
    ) {
        return artistService.updateArtist(id, body);
    }

    @DeleteMapping("/{id}")
    public void deleteArtist(@PathVariable Long id) {
        artistService.deleteArtist(id);
    }

    @GetMapping
    public List<Artist> getAllArtists() {
        return artistService.findAllArtists();
    }

    @GetMapping("/{id}")
    public Artist getArtistById(@PathVariable Long id) {
        return artistService.findArtistById(id);
    }
}

