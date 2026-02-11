package giuliomarra.vinylvault.controller;

import giuliomarra.vinylvault.dto.NewVinylRequiredDto;
import giuliomarra.vinylvault.dto.VinylResponseDto;
import giuliomarra.vinylvault.service.VinylService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vinyl")
@PreAuthorize("hasAuthority('ADMIN')")
public class VinylController {

    private final VinylService vinylService;

    public VinylController(VinylService vinylService) {
        this.vinylService = vinylService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VinylResponseDto createVinyl(@RequestBody NewVinylRequiredDto body) {
        return vinylService.saveNewVinyl(body);
    }

    @PutMapping("/{id}")
    public VinylResponseDto updateVinyl(
            @PathVariable Long id,
            @RequestBody NewVinylRequiredDto body
    ) {
        return vinylService.updateVinyl(id, body);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteVinyl(@PathVariable Long id) {
        vinylService.deleteVinyl(id);
    }

    @PutMapping("/{id}/stock")
    public VinylResponseDto updateStock(
            @PathVariable Long id,
            @RequestParam int stock
    ) {
        return vinylService.updateStock(id, stock);
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
}