package giuliomarra.vinylvault.service;

import giuliomarra.vinylvault.dto.NewArtistRequiredDto;
import giuliomarra.vinylvault.model.Artist;
import giuliomarra.vinylvault.repository.ArtistRepository;
import org.springframework.stereotype.Service;

@Service
public class ArtistService {
    private final ArtistRepository artistRepository;

    public ArtistService(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    public Artist saveNewArtist(NewArtistRequiredDto body) {
        if (artistRepository.existsByName(body.name())) {
            throw new RuntimeException("Artista con questo nome: " + body.name() + " gia esistente nel db");
        }

        Artist artist = new Artist(
                body.name(),
                body.about(),
                body.urlImage()
        );

        return artistRepository.save(artist);
    }

    public Artist findArtistById(Long aristId) {
        return artistRepository.findById(aristId)
                .orElseThrow(() -> new RuntimeException("Artista con id: " + aristId + " non trovato!"));
    }
}
