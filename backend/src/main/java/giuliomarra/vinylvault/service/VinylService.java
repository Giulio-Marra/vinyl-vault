package giuliomarra.vinylvault.service;

import giuliomarra.vinylvault.dto.NewVinylRequiredDto;
import giuliomarra.vinylvault.dto.TrackResponseDto;
import giuliomarra.vinylvault.dto.VinylResponseDto;
import giuliomarra.vinylvault.exceptions.NotFoundException;
import giuliomarra.vinylvault.model.Artist;
import giuliomarra.vinylvault.model.Genre;
import giuliomarra.vinylvault.model.Track;
import giuliomarra.vinylvault.model.Vinyl;
import giuliomarra.vinylvault.repository.TrackRepository;
import giuliomarra.vinylvault.repository.VinylRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VinylService {

    private final VinylRepository vinylRepository;
    private final ArtistService artistService;
    private final GenreService genreService;
    private final TrackRepository trackRepository;

    public VinylService(
            VinylRepository vinylRepository,
            ArtistService artistService,
            GenreService genreService,
            TrackRepository trackRepository
    ) {
        this.vinylRepository = vinylRepository;
        this.artistService = artistService;
        this.genreService = genreService;
        this.trackRepository = trackRepository;
    }
    
    private Vinyl findVinylOrThrow(Long id) {
        return vinylRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException("Vinile non trovato con id: " + id)
                );
    }

    private VinylResponseDto convertToDto(Vinyl vinyl, List<Track> trackList) {
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

    @Transactional
    public VinylResponseDto saveNewVinyl(NewVinylRequiredDto body) {

        Artist artist = artistService.findArtistById(body.artistId());

        List<Genre> genres = body.genreListId().stream()
                .map(genreService::getGenreById)
                .toList();

        Vinyl vinyl = new Vinyl(
                body.title(),
                body.urlImage(),
                body.description(),
                body.price(),
                body.stock(),
                artist,
                genres
        );

        Vinyl savedVinyl = vinylRepository.save(vinyl);

        List<Track> tracks = body.tracks().stream()
                .map(t -> new Track(
                        t.title(),
                        t.trackNumber(),
                        t.side(),
                        t.duration(),
                        savedVinyl
                ))
                .toList();

        trackRepository.saveAll(tracks);

        return convertToDto(savedVinyl, tracks);
    }

    public VinylResponseDto getVinylById(Long id) {
        Vinyl vinyl = findVinylOrThrow(id);
        List<Track> tracks = trackRepository.findByVinylId(id);
        return convertToDto(vinyl, tracks);
    }

    public Page<VinylResponseDto> getAllVinyls(Pageable pageable) {
        return vinylRepository.findAll(pageable)
                .map(vinyl -> {
                    List<Track> tracks = trackRepository.findByVinylId(vinyl.getId());
                    return convertToDto(vinyl, tracks);
                });
    }

    @Transactional
    public VinylResponseDto updateVinyl(Long id, NewVinylRequiredDto body) {

        Vinyl vinyl = findVinylOrThrow(id);

        Artist artist = artistService.findArtistById(body.artistId());
        List<Genre> genres = body.genreListId().stream()
                .map(genreService::getGenreById)
                .toList();

        vinyl.setTitle(body.title());
        vinyl.setUrlImage(body.urlImage());
        vinyl.setDescription(body.description());
        vinyl.setPrice(body.price());
        vinyl.setStock(body.stock());
        vinyl.setArtist(artist);
        vinyl.setGenreList(genres);

        vinylRepository.save(vinyl);

        trackRepository.deleteByVinylId(id);

        List<Track> tracks = body.tracks().stream()
                .map(t -> new Track(
                        t.title(),
                        t.trackNumber(),
                        t.side(),
                        t.duration(),
                        vinyl
                ))
                .toList();

        trackRepository.saveAll(tracks);

        return convertToDto(vinyl, tracks);
    }

    @Transactional
    public void deleteVinyl(Long id) {
        Vinyl vinyl = findVinylOrThrow(id);
        trackRepository.deleteByVinylId(id);
        vinylRepository.delete(vinyl);
    }

    public Page<VinylResponseDto> searchVinyls(
            String query,
            Double minPrice,
            Double maxPrice,
            Boolean inStock,
            String genre,
            Pageable pageable
    ) {
        return vinylRepository.searchVinyls(
                        query, minPrice, maxPrice, inStock, genre, pageable
                )
                .map(vinyl -> {
                    List<Track> tracks = trackRepository.findByVinylId(vinyl.getId());
                    return convertToDto(vinyl, tracks);
                });
    }

    @Transactional
    public VinylResponseDto updateStock(Long id, int newStock) {
        Vinyl vinyl = findVinylOrThrow(id);
        vinyl.setStock(newStock);
        vinylRepository.save(vinyl);

        List<Track> tracks = trackRepository.findByVinylId(id);
        return convertToDto(vinyl, tracks);
    }

    public List<VinylResponseDto> getLatestVinyls() {
        return vinylRepository.findTop4ByOrderByIdDesc()
                .stream()
                .map(vinyl -> {
                    List<Track> tracks = trackRepository.findByVinylId(vinyl.getId());
                    return convertToDto(vinyl, tracks);
                })
                .toList();
    }
}
