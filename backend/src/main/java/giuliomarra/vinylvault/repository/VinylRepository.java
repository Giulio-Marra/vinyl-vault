package giuliomarra.vinylvault.repository;

import giuliomarra.vinylvault.model.Artist;
import giuliomarra.vinylvault.model.Vinyl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VinylRepository extends JpaRepository<Vinyl, Long> {
    boolean existsByTitleIgnoreCaseAndArtist(String title, Artist artist);

    List<Vinyl> findTop4ByOrderByIdDesc();


    @Query("SELECT DISTINCT v FROM Vinyl v " +
            "LEFT JOIN v.artist a " +
            "LEFT JOIN v.genreList g " +  // join con i generi
            "WHERE (:query IS NULL OR " +
            "       LOWER(v.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "       LOWER(a.name) LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "AND (:minPrice IS NULL OR v.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR v.price <= :maxPrice) " +
            "AND (:inStock IS NULL OR (:inStock = true AND v.stock > 0) OR (:inStock = false)) " +
            "AND (:genre IS NULL OR :genre = 'All' OR LOWER(g.name) = LOWER(:genre))")
        // filtro per genere
    Page<Vinyl> searchVinyls(
            @Param("query") String query,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("inStock") Boolean inStock,
            @Param("genre") String genre,  // nuovo parametro
            Pageable pageable
    );

}
