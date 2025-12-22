package giuliomarra.vinylvault.repository;

import giuliomarra.vinylvault.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackRepository extends JpaRepository<Track, Long> {
}
