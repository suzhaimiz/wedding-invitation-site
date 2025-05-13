package com.weddinginvitation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RsvpRepository extends JpaRepository<Rsvp, Long> {
    Optional<Rsvp> findByName(String name);
}