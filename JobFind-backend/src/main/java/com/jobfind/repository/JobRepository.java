package com.jobfind.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jobfind.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByTitleContainingIgnoreCase(String title);
    List<Job> findByRecruiterId(Long recruiterId);
    @Query("""
        SELECT j FROM Job j
        WHERE LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(j.location) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(j.skills) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    Page<Job> searchJobs(
            @Param("keyword") String keyword,
            Pageable pageable);
       @Query("""
        SELECT j FROM Job j
        WHERE (:location IS NULL OR :location = ''
               OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))
        AND (:areaOfInterest IS NULL OR :areaOfInterest = ''
               OR LOWER(j.areaOfInterest) LIKE LOWER(CONCAT('%', :areaOfInterest, '%')))
        AND (:jobType IS NULL OR :jobType = ''
               OR LOWER(j.jobType) = LOWER(:jobType))
        AND (:skill IS NULL OR :skill = ''
               OR LOWER(j.skills) LIKE LOWER(CONCAT('%', :skill, '%')))
    """)
    Page<Job> filterJobs(
            @Param("location") String location,
            @Param("areaOfInterest") String areaOfInterest,
            @Param("jobType") String jobType,
            @Param("skill") String skill,
            Pageable pageable);     
}