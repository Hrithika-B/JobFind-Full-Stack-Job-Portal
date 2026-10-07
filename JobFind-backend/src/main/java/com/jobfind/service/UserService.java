package com.jobfind.service;

import com.jobfind.dto.LoginRequest;
import com.jobfind.dto.LoginResponse;
import com.jobfind.entity.Candidate;
import com.jobfind.entity.Recruiter;
import com.jobfind.entity.User;
import com.jobfind.repository.CandidateRepository;
import com.jobfind.repository.RecruiterRepository;
import com.jobfind.repository.UserRepository;
import com.jobfind.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService
{
    private final UserRepository userRepository;
    private final CandidateRepository candidateRepository;
    private final RecruiterRepository recruiterRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(
            UserRepository userRepository,
            CandidateRepository candidateRepository,
            RecruiterRepository recruiterRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService)
    {
        this.userRepository = userRepository;
        this.candidateRepository = candidateRepository;
        this.recruiterRepository = recruiterRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User register(User user)
    {
        String email = user.getEmail().trim().toLowerCase();
        user.setEmail(email);

        if (user.getRole() == null ||
            (!user.getRole().equals("CANDIDATE")
            && !user.getRole().equals("RECRUITER")))
        {
            throw new RuntimeException("Invalid account type");
        }

        if (userRepository.findByEmail(email).isPresent())
        {
            throw new RuntimeException("Email already registered");
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        // Create the corresponding profile automatically
        if (user.getRole().equals("CANDIDATE"))
        {
            Candidate candidate = new Candidate();
            candidate.setUser(savedUser);
            candidateRepository.save(candidate);
        }
        else if (user.getRole().equals("RECRUITER"))
        {
            Recruiter recruiter = new Recruiter();
            recruiter.setUser(savedUser);
            recruiterRepository.save(recruiter);
        }

        return savedUser;
    }

    public LoginResponse login(LoginRequest request)
    {
        String email = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                    new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()))
        {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user);

        return new LoginResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole());
    }
}