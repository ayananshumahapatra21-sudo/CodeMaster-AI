package com.codemaster.auth;

import com.codemaster.auth.dto.AuthResponse;
import com.codemaster.auth.dto.LoginRequest;
import com.codemaster.auth.dto.RegisterRequest;
import com.codemaster.auth.dto.UserSummaryDto;
import com.codemaster.common.ResourceNotFoundException;
import com.codemaster.security.JwtTokenProvider;
import com.codemaster.user.Profile;
import com.codemaster.user.Role;
import com.codemaster.user.User;
import com.codemaster.user.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered: " + request.getEmail());
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                Role.USER
        );

        Profile profile = new Profile(user, "Competitive programmer & algorithm enthusiast.", "https://api.dicebear.com/7.x/bottts/svg?seed=" + request.getName());
        user.setProfile(profile);

        User savedUser = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(savedUser.getId(), savedUser.getEmail(), savedUser.getRole().name());

        return new AuthResponse(token, toSummaryDto(savedUser));
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole().name());
        return new AuthResponse(token, toSummaryDto(user));
    }

    public UserSummaryDto getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return toSummaryDto(user);
    }

    private UserSummaryDto toSummaryDto(User user) {
        String bio = user.getProfile() != null ? user.getProfile().getBio() : "";
        String avatar = user.getProfile() != null ? user.getProfile().getAvatarUrl() : "";
        return new UserSummaryDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                bio,
                avatar
        );
    }
}
