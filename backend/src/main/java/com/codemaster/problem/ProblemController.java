package com.codemaster.problem;

import com.codemaster.common.ApiResponse;
import com.codemaster.execution.CodeExecutionService;
import com.codemaster.execution.dto.ExecutionResult;
import com.codemaster.problem.dto.ProblemDto;
import com.codemaster.problem.dto.ProblemRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping
@Tag(name = "Problem Management", description = "Endpoints for browsing, searching, and managing coding challenges")
public class ProblemController {

    private final ProblemService problemService;
    private final CodeExecutionService codeExecutionService;
    private final TestCaseRepository testCaseRepository;

    public ProblemController(ProblemService problemService,
                             CodeExecutionService codeExecutionService,
                             TestCaseRepository testCaseRepository) {
        this.problemService = problemService;
        this.codeExecutionService = codeExecutionService;
        this.testCaseRepository = testCaseRepository;
    }

    @GetMapping({"/api/problems", "/api/v1/problems"})
    @Operation(summary = "List all problems with filtering", description = "Retrieves problems filtered by difficulty, topic category, or search keyword.")
    public ResponseEntity<List<ProblemDto>> getProblems(
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String topic,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(problemService.getProblems(difficulty, topic, search));
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
    public ResponseEntity<ExecutionResult> runCode(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {

        String code = payload.getOrDefault("code", "");
        String language = payload.getOrDefault("language", "java");

        List<TestCase> cases = testCaseRepository.findByProblemIdAndIsHiddenFalse(id);
        if (cases.isEmpty()) {
            cases = testCaseRepository.findByProblemId(id);
        }

        // If no test cases in DB, populate from problem examples
        if (cases.isEmpty()) {
            ProblemDto problemDto = problemService.getProblemById(id).orElse(null);
            if (problemDto != null && problemDto.getExamples() != null && !problemDto.getExamples().isEmpty()) {
                cases = problemDto.getExamples().stream()
                        .map(ex -> new TestCase(null, ex.get("input"), ex.get("output"), false))
                        .collect(Collectors.toList());
            } else {
                cases = List.of(
                        new TestCase(null, "nums = [2,7,11,15], target = 9", "[0,1]", false),
                        new TestCase(null, "nums = [3,2,4], target = 6", "[1,2]", false)
                );
            }
        }

        ExecutionResult result = codeExecutionService.execute(id, language, code, cases);
        return ResponseEntity.ok(result);
    }
}
