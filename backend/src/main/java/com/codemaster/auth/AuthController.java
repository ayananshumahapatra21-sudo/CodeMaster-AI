package com.codemaster.auth;

import com.codemaster.auth.dto.AuthResponse;
import com.codemaster.auth.dto.LoginRequest;
import com.codemaster.auth.dto.RegisterRequest;
import com.codemaster.auth.dto.UserSummaryDto;
import com.codemaster.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@Tag(name = "Authentication & User Management", description = "Endpoints for user registration, authentication, JWT tokens, and profiles")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping({"/api/auth/register", "/api/v1/auth/register"})
    @Operation(summary = "Register a new user", description = "Creates a new user profile, hashes password with BCrypt, and returns a signed JWT token.")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User registered successfully", response));
    }

    @PostMapping({"/api/auth/login", "/api/v1/auth/login"})
    @Operation(summary = "Authenticate user", description = "Validates user credentials and issues a signed JWT token.")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Authentication successful", response));
    }

    @GetMapping({"/api/users/me", "/api/v1/users/me"})
    @Operation(summary = "Get current authenticated user", description = "Retrieves user details and profile using the Bearer JWT token.")
    public ResponseEntity<ApiResponse<UserSummaryDto>> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserSummaryDto user = authService.getCurrentUser(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("User details retrieved", user));
    }
}
