package giuliomarra.vinylvault.dto;

import giuliomarra.vinylvault.model.Artist;
import giuliomarra.vinylvault.model.Genre;

import java.util.List;

public class VinylResponseDto {
    private Long id;
    private String title;
    private String urlImage;
    private String description;
    private Double price;
    private Integer stock;
    private Artist artist;
    private List<Genre> genreList;
    private List<TrackResponseDto> tracks;

    public VinylResponseDto(Long id, String title, String urlImage, String description, Double price, Integer stock, Artist artist, List<Genre> genreList, List<TrackResponseDto> tracks) {
        this.id = id;
        this.title = title;
        this.urlImage = urlImage;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.artist = artist;
        this.genreList = genreList;
        this.tracks = tracks;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public List<Genre> getGenreList() {
        return genreList;
    }

    public void setGenreList(List<Genre> genreList) {
        this.genreList = genreList;
    }

    public List<TrackResponseDto> getTracks() {
        return tracks;
    }

    public void setTracks(List<TrackResponseDto> tracks) {
        this.tracks = tracks;
    }
}
