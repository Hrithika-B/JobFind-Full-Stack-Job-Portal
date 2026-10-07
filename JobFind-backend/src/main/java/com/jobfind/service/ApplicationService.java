package com.jobfind.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jobfind.dto.ApplicationRequest;
import com.jobfind.entity.Application;
import com.jobfind.entity.Candidate;
import com.jobfind.entity.Job;
import com.jobfind.entity.Recruiter;
import com.jobfind.repository.ApplicationRepository;
import com.jobfind.repository.CandidateRepository;
import com.jobfind.repository.JobRepository;
import com.jobfind.repository.RecruiterRepository;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final CandidateRepository candidateRepository;
    private final JobRepository jobRepository;
    private final RecruiterRepository recruiterRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            CandidateRepository candidateRepository,
            JobRepository jobRepository,
            RecruiterRepository recruiterRepository) {

        this.applicationRepository = applicationRepository;
        this.candidateRepository = candidateRepository;
        this.jobRepository = jobRepository;
        this.recruiterRepository = recruiterRepository;
    }

    public Application apply(ApplicationRequest request, String email) {

        Candidate candidate = candidateRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Candidate profile not found"));

        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        if (applicationRepository.existsByCandidateIdAndJobId(
                candidate.getId(), job.getId())) {

            throw new RuntimeException("Already applied for this job");
        }

        Application application = new Application();

        application.setCandidate(candidate);
        application.setJob(job);
        application.setStatus("APPLIED");
        application.setAppliedAt(LocalDateTime.now());

        return applicationRepository.save(application);
    }

    public List<Application> getCandidateApplications(String email) {

        Candidate candidate = candidateRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Candidate profile not found"));

        return applicationRepository.findByCandidateId(candidate.getId());
    }

    public List<Application> getJobApplications(
            Long jobId,
            String email) {

        Recruiter recruiter = recruiterRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter profile not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException(
                    "You are not allowed to view applicants for this job");
        }

        return applicationRepository.findByJobId(jobId);
    }

    public Application updateStatus(
            Long id,
            String status,
            String email) {

        Recruiter recruiter = recruiterRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter profile not found"));

        Application application = applicationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Application not found"));

        Job job = application.getJob();

        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException(
                    "You are not allowed to update this application");
        }

        if (!status.equals("APPLIED")
                && !status.equals("SHORTLISTED")
                && !status.equals("REJECTED")
                && !status.equals("HIRED")) {

            throw new RuntimeException("Invalid application status");
        }

        application.setStatus(status);

        return applicationRepository.save(application);
    }
    public Application getApplicationForRecruiter(
            Long applicationId,
            String email) {

        Recruiter recruiter = recruiterRepository.findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter profile not found"));

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() ->
                        new RuntimeException("Application not found"));

        Job job = application.getJob();

        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException(
                    "You are not allowed to access this application");
        }

        return application;
    }
}