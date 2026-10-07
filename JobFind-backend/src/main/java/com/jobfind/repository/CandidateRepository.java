package com.jobfind.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobfind.entity.Candidate;

public interface CandidateRepository
        extends JpaRepository<Candidate, Long> {

    Optional<Candidate> findByUserId(Long userId);

    Optional<Candidate> findByUserEmail(String email);
}