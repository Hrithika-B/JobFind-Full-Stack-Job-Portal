package com.jobfind.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobfind.entity.Recruiter;

public interface RecruiterRepository
        extends JpaRepository<Recruiter, Long> {

    Optional<Recruiter> findByUserId(Long userId);

    Optional<Recruiter> findByUserEmail(String email);
}