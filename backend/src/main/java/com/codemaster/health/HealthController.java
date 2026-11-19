package com.codemaster.health;

import com.codemaster.health.dto.HealthResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@Tag(name = "Health & Telemetry", description = "Endpoints for monitoring server uptime and database connectivity")
public class HealthController {

    private final HealthService healthService;

    public HealthController(HealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping({"/api/health", "/api/v1/health"})
    @Operation(summary = "System Telemetry & Database Health", description = "Returns live server uptime, environment specifications, and database connection latency.")
    public ResponseEntity<HealthResponse> getHealth() {
        return ResponseEntity.ok(healthService.checkHealth());
    }
}
