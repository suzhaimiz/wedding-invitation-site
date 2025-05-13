package com.weddinginvitation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invitee")
@CrossOrigin(origins = "http://localhost:3000")
public class InviteeController {

  @Autowired
  private InviteeRepository repo;

  @PostMapping
  public String addInvitee(@RequestBody Invitee invitee) {
    if (repo.existsByName(invitee.getName())) {
      return "Invitee already exists!";
    }
    repo.save(invitee);
    return "http://localhost:3000/?to=" + invitee.getName().replace(" ", "%20");
  }

@GetMapping
public List<Invitee> getAllInvitees() {
    return repo.findAll();
}

 
}
