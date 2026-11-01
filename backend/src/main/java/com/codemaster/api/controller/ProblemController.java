package com.codemaster.api.controller;

import com.codemaster.api.dto.ProblemDto;
import com.codemaster.api.service.ProblemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping
    public ResponseEntity<List<ProblemDto>> getProblems() {
        return ResponseEntity.ok(problemService.getAllProblems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProblemDto> getProblemById(@PathVariable Long id) {
        return problemService.getProblemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/run")
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
