package giuliomarra.vinylvault.model;

import jakarta.persistence.*;

@Entity
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Integer trackNumber;
    private String side;
    private String duration;

    @ManyToOne
    @JoinColumn(name = "vinyl_id", nullable = false)
    private Vinyl vinyl;

    public Track() {
    }

    public Track(String title, Integer trackNumber, String side, String duration, Vinyl vinyl) {
        this.title = title;
        this.trackNumber = trackNumber;
        this.side = side;
        this.duration = duration;
        this.vinyl = vinyl;
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

    public Integer getTrackNumber() {
        return trackNumber;
    }

    public void setTrackNumber(Integer trackNumber) {
        this.trackNumber = trackNumber;
    }

    public String getSide() {
        return side;
    }

    public void setSide(String side) {
        this.side = side;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Vinyl getVinyl() {
        return vinyl;
    }

    public void setVinyl(Vinyl vinyl) {
        this.vinyl = vinyl;
    }
}

