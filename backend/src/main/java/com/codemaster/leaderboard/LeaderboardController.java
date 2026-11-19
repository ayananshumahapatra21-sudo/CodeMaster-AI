package com.codemaster.leaderboard;

import com.codemaster.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
@Tag(name = "Leaderboard", description = "Global competitive rankings and points")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping({"/api/leaderboard", "/api/v1/leaderboard"})
    @Operation(summary = "Get global leaderboard", description = "Returns rankings, solved counts, scores, and division badges.")
    public ResponseEntity<ApiResponse<List<LeaderboardEntryDto>>> getLeaderboard() {
        return ResponseEntity.ok(ApiResponse.success(leaderboardService.getGlobalLeaderboard()));
    }
}
