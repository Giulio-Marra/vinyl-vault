package giuliomarra.vinylvault.controller;

import giuliomarra.vinylvault.dto.VinylResponseDto;
import giuliomarra.vinylvault.service.VinylService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vinyl")
public class PublicVinylController {

    private final VinylService vinylService;

    public PublicVinylController(VinylService vinylService) {
        this.vinylService = vinylService;
    }

    @GetMapping
    public Page<VinylResponseDto> getAllVinyls(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return vinylService.getAllVinyls(pageable);
    }

    @GetMapping("/{id}")
    public VinylResponseDto getVinylById(@PathVariable Long id) {
        return vinylService.getVinylById(id);
    }

    @GetMapping("/search")
    public Page<VinylResponseDto> searchVinyls(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Boolean inStock,
            @RequestParam(required = false, defaultValue = "All") String genre,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "asc") String sortByPrice
    ) {
        Sort sort = sortByPrice.equalsIgnoreCase("desc")
                ? Sort.by("price").descending()
                : Sort.by("price").ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return vinylService.searchVinyls(query, minPrice, maxPrice, inStock, genre, pageable);
    }

    @GetMapping("/latest")
    public List<VinylResponseDto> getLatestVinyls() {
        return vinylService.getLatestVinyls();
    }


}