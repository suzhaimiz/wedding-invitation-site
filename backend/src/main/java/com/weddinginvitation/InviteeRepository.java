package com.weddinginvitation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InviteeRepository extends JpaRepository<Invitee, Long> {
    boolean existsByName(String name);
}
