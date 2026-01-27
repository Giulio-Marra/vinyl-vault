package giuliomarra.vinylvault.service;

import giuliomarra.vinylvault.dto.NewArtistRequiredDto;
import giuliomarra.vinylvault.exceptions.AlreadyExistException;
import giuliomarra.vinylvault.exceptions.NotFoundException;
import giuliomarra.vinylvault.model.Artist;
import giuliomarra.vinylvault.repository.ArtistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtistService {
    private final ArtistRepository artistRepository;

    public ArtistService(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    public Artist saveNewArtist(NewArtistRequiredDto body) {
        if (artistRepository.existsByName(body.name())) {
            throw new AlreadyExistException("Artista con questo nome: " + body.name() + " gia esistente nel db");
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
                .orElseThrow(() -> new NotFoundException("Artista con id: " + aristId + " non trovato!"));
    }

    public List<Artist> findAllArtists() {
        return artistRepository.findAll();
    }

    public Artist updateArtist(Long artistId, NewArtistRequiredDto body) {

        Artist artist = findArtistById(artistId);

        artist.setName(body.name());
        artist.setAbout(body.about());
        artist.setUrlImage(body.urlImage());

        return artistRepository.save(artist);
    }

    public void deleteArtist(Long artistId) {
        Artist artist = findArtistById(artistId);
        artistRepository.delete(artist);
    }


}
