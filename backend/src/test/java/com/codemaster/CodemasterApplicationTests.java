package com.codemaster;

import com.codemaster.ai.AiService;
import com.codemaster.ai.dto.AiRequest;
import com.codemaster.ai.dto.AiResponse;
import com.codemaster.auth.AuthService;
import com.codemaster.auth.dto.AuthResponse;
import com.codemaster.auth.dto.LoginRequest;
import com.codemaster.auth.dto.RegisterRequest;
import com.codemaster.leaderboard.LeaderboardService;
import com.codemaster.problem.ProblemService;
import com.codemaster.problem.dto.ProblemDto;
import com.codemaster.submission.SubmissionService;
import com.codemaster.submission.dto.SubmissionRequest;
import com.codemaster.submission.dto.SubmissionResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class CodemasterApplicationTests {

    @Autowired
    private ProblemService problemService;

    @Autowired
    private AuthService authService;

    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private AiService aiService;

    @Autowired
    private LeaderboardService leaderboardService;

    @Test
    @DisplayName("Application context loads cleanly")
    void contextLoads() {
        assertNotNull(problemService);
        assertNotNull(authService);
        assertNotNull(submissionService);
        assertNotNull(aiService);
    }

    @Test
    @DisplayName("Problem Service retrieves seeded problem catalog")
    void testProblemCatalog() {
        List<ProblemDto> problems = problemService.getAllProblems();
        assertNotNull(problems);
        assertFalse(problems.isEmpty());
        assertTrue(problems.size() >= 3);
    }

    @Test
    @DisplayName("Auth Service handles user registration, hashing, and JWT issuance")
    void testAuthRegistrationAndLogin() {
        String testEmail = "testuser_" + System.currentTimeMillis() + "@codemaster.ai";
        RegisterRequest registerReq = new RegisterRequest("Test Candidate", testEmail, "P@ssw0rd123");
        AuthResponse registered = authService.register(registerReq);

        assertNotNull(registered);
        assertNotNull(registered.getToken());
        assertEquals(testEmail, registered.getUser().getEmail());

        // Test Login
        LoginRequest loginReq = new LoginRequest(testEmail, "P@ssw0rd123");
        AuthResponse loggedIn = authService.login(loginReq);
        assertNotNull(loggedIn);
        assertNotNull(loggedIn.getToken());
    }

    @Test
    @DisplayName("AI Assistant delivers context-aware algorithmic hints")
    void testAiHintGeneration() {
        AiRequest req = new AiRequest();
        req.setProblemTitle("Two Sum");
        req.setLanguage("java");
        req.setCode("class Solution {}");

        AiResponse response = aiService.generateHint(req);
        assertNotNull(response);
        assertEquals("HINT", response.getType());
        assertNotNull(response.getResponse());
        assertTrue(response.getResponse().contains("lookup"));
    }

    @Test
    @DisplayName("Submission Service processes code and outputs execution verdict")
    void testSubmissionEvaluation() {
        SubmissionRequest req = new SubmissionRequest();
        req.setProblemId(1L);
        req.setLanguage("java");
        req.setSourceCode("class Solution { public int[] solve() { return new int[]{0,1}; } }");

        SubmissionResponse res = submissionService.submit(req, "test@codemaster.ai");
        assertNotNull(res);
        assertNotNull(res.getStatus());
        assertTrue(res.getExecutionTimeMs() >= 0);
    }

    @Test
    @DisplayName("Leaderboard Service delivers global rankings")
    void testLeaderboard() {
        var leaderboard = leaderboardService.getGlobalLeaderboard();
        assertNotNull(leaderboard);
        assertFalse(leaderboard.isEmpty());
        assertEquals(1, leaderboard.get(0).getRank());
    }
}
