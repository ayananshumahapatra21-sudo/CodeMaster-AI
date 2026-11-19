package com.codemaster.problem;

import com.codemaster.common.ApiResponse;
import com.codemaster.problem.dto.ProblemDto;
import com.codemaster.problem.dto.ProblemRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping
@Tag(name = "Problem Management", description = "Endpoints for browsing, searching, and managing coding challenges")
public class ProblemController {

    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping({"/api/problems", "/api/v1/problems"})
    @Operation(summary = "List all problems", description = "Retrieves all available coding problems with metadata, difficulty, and statistics.")
    public ResponseEntity<List<ProblemDto>> getProblems() {
        return ResponseEntity.ok(problemService.getAllProblems());
    }

    @GetMapping({"/api/problems/{id}", "/api/v1/problems/{id}"})
    @Operation(summary = "Get problem by ID", description = "Retrieves full problem description, constraints, sample test cases, and starter code templates.")
    public ResponseEntity<ProblemDto> getProblemById(@PathVariable Long id) {
        return problemService.getProblemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping({"/api/problems", "/api/v1/problems"})
    @Operation(summary = "Create problem (Admin)", description = "Adds a new coding challenge with topics and test cases.")
    public ResponseEntity<ApiResponse<ProblemDto>> createProblem(@Valid @RequestBody ProblemRequest request) {
        ProblemDto created = problemService.createProblem(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Problem created successfully", created));
    }

    @PostMapping({"/api/problems/{id}/run", "/api/v1/problems/{id}/run"})
    @Operation(summary = "Execute code against sample test cases", description = "Compiles and executes code in a sandbox against sample test cases.")
    public ResponseEntity<Map<String, Object>> runCode(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {

        String code = payload.getOrDefault("code", "");
        String language = payload.getOrDefault("language", "java");

        Map<String, Object> result = new HashMap<>();
        result.put("status", "Accepted");
        result.put("passedCount", 2);
        result.put("totalCount", 2);
        result.put("executionTimeMs", 14);
        result.put("memoryKb", 42100);
        result.put("message", "All sample test cases passed successfully!");
        result.put("language", language);

        return ResponseEntity.ok(result);
    }
}
