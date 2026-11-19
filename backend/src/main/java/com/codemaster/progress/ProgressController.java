package com.codemaster.progress;

import com.codemaster.common.ApiResponse;
import com.codemaster.progress.dto.UserProgressDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@Tag(name = "Progress", description = "User progress analytics, streak monitoring, and difficulty statistics")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping({"/api/users/me/progress", "/api/v1/users/me/progress"})
    @Operation(summary = "Get current user progress", description = "Returns total solved questions, difficulty breakdown, and activity streaks.")
    public ResponseEntity<ApiResponse<UserProgressDto>> getProgress(
            @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails != null ? userDetails.getUsername() : "guest@codemaster.ai";
        return ResponseEntity.ok(ApiResponse.success(progressService.getUserProgress(email)));
    }
}
