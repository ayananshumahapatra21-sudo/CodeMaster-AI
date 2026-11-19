package com.codemaster.ai;

import com.codemaster.ai.dto.AiRequest;
import com.codemaster.ai.dto.AiResponse;
import com.codemaster.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@Tag(name = "AI Assistant", description = "Context-aware AI assistance for hints, conceptual explanations, and debugging")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping({"/api/ai/hint", "/api/v1/ai/hint"})
    @Operation(summary = "Generate progressive hint", description = "Provides an algorithmic hint without revealing full solution code.")
    public ResponseEntity<ApiResponse<AiResponse>> getHint(@RequestBody AiRequest request) {
        return ResponseEntity.ok(ApiResponse.success(aiService.generateHint(request)));
    }

    @PostMapping({"/api/ai/explain", "/api/v1/ai/explain"})
    @Operation(summary = "Explain problem concepts", description = "Generates a conceptual problem walkthrough with edge cases and asymptotic complexity.")
    public ResponseEntity<ApiResponse<AiResponse>> explainProblem(@RequestBody AiRequest request) {
        return ResponseEntity.ok(ApiResponse.success(aiService.explainProblem(request)));
    }

    @PostMapping({"/api/ai/debug", "/api/v1/ai/debug"})
    @Operation(summary = "Debug code and syntax", description = "Analyzes source code for infinite loops, edge case omissions, and algorithmic bugs.")
    public ResponseEntity<ApiResponse<AiResponse>> debugCode(@RequestBody AiRequest request) {
        return ResponseEntity.ok(ApiResponse.success(aiService.debugCode(request)));
    }
}
