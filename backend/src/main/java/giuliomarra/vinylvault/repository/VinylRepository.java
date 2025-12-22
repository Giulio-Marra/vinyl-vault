package giuliomarra.vinylvault.repository;

import giuliomarra.vinylvault.model.Artist;
import giuliomarra.vinylvault.model.Vinyl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VinylRepository extends JpaRepository<Vinyl, Long> {
    boolean existsByTitleIgnoreCaseAndArtist(String title, Artist artist);
}
