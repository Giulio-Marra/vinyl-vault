package giuliomarra.vinylvault.service;

import giuliomarra.vinylvault.dto.NewVinylRequiredDto;
import giuliomarra.vinylvault.dto.TrackResponseDto;
import giuliomarra.vinylvault.dto.VinylResponseDto;
import giuliomarra.vinylvault.model.Artist;
import giuliomarra.vinylvault.model.Genre;
import giuliomarra.vinylvault.model.Track;
import giuliomarra.vinylvault.model.Vinyl;
import giuliomarra.vinylvault.repository.TrackRepository;
import giuliomarra.vinylvault.repository.VinylRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VinylService {
    private final VinylRepository vinylRepository;
    private final ArtistService artistService;
    private final GenreService genreService;
    private final TrackRepository trackRepository;

    public VinylService(VinylRepository vinylRepository, ArtistService artistService, GenreService genreService, TrackRepository trackRepository) {
        this.vinylRepository = vinylRepository;
        this.artistService = artistService;
        this.genreService = genreService;
        this.trackRepository = trackRepository;
    }

    public VinylResponseDto convertToDto(Vinyl vinyl, List<Track> trackList) {
        var tracks = trackList.stream()
                .map(t -> new TrackResponseDto(
                        t.getId(),
                        t.getTitle(),
                        t.getTrackNumber(),
                        t.getSide(),
                        t.getDuration()
                ))
                .toList();

        return new VinylResponseDto(
                vinyl.getId(),
                vinyl.getTitle(),
                vinyl.getUrlImage(),
                vinyl.getDescription(),
                vinyl.getPrice(),
                vinyl.getStock(),
                vinyl.getArtist(),
                vinyl.getGenreList(),
                tracks
        );
    }

    public VinylResponseDto saveNewVinyl(NewVinylRequiredDto body) {
        Artist artist = artistService.findArtistById(body.artistId());

        List<Genre> genreList = body.genreListId().stream()
                .map(genreService::getGenreById)
                .toList();

        Vinyl vinyl = new Vinyl(
                body.title(),
                body.urlImage(),
                body.description(),
                body.price(),
                body.stock(),
                artist,
                genreList
        );

        Vinyl savedVinyl = vinylRepository.save(vinyl);

        List<Track> trackList = body.tracks().stream()
                .map(t -> new Track(
                        t.title(),
                        t.trackNumber(),
                        t.side(),
                        t.duration(),
                        savedVinyl
                ))
                .toList();


        trackRepository.saveAll(trackList);

        return convertToDto(savedVinyl, trackList);
    }


}
