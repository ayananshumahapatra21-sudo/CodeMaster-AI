package com.codemaster.submission;

import com.codemaster.common.ApiResponse;
import com.codemaster.submission.dto.SubmissionRequest;
import com.codemaster.submission.dto.SubmissionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@Tag(name = "Submissions", description = "Endpoints for code submission evaluation and historical verdicts")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping({"/api/submissions", "/api/v1/submissions"})
    @Operation(summary = "Submit solution", description = "Evaluates submitted code against full test cases and returns execution verdict.")
    public ResponseEntity<ApiResponse<SubmissionResponse>> submitCode(
            @Valid @RequestBody SubmissionRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        String email = userDetails != null ? userDetails.getUsername() : "guest@codemaster.ai";
        SubmissionResponse response = submissionService.submit(request, email);
        return ResponseEntity.ok(ApiResponse.success("Code evaluated successfully", response));
    }

    @GetMapping({"/api/submissions/history", "/api/v1/submissions/history"})
    @Operation(summary = "Get submission history", description = "Retrieves all previous code submissions and verdicts for the authenticated user.")
    public ResponseEntity<ApiResponse<List<SubmissionResponse>>> getHistory(
            @AuthenticationPrincipal UserDetails userDetails) {

        String email = userDetails != null ? userDetails.getUsername() : "guest@codemaster.ai";
        List<SubmissionResponse> history = submissionService.getHistory(email);
        return ResponseEntity.ok(ApiResponse.success("Submission history retrieved", history));
    }
}
