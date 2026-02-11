package giuliomarra.vinylvault.repository;

import giuliomarra.vinylvault.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrackRepository extends JpaRepository<Track, Long> {
    List<Track> findByVinylId(Long vinylId);

    void deleteByVinylId(Long vinylId);
}
