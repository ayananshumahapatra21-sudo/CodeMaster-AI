package com.codemaster.problem;

import com.codemaster.common.ResourceNotFoundException;
import com.codemaster.problem.dto.ProblemDto;
import com.codemaster.problem.dto.ProblemRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProblemService {

    private static final Logger logger = LoggerFactory.getLogger(ProblemService.class);

    private final ProblemRepository problemRepository;
    private final TopicRepository topicRepository;
    private final TestCaseRepository testCaseRepository;

    // In-memory fallback list to ensure zero-downtime developer experience
    private final List<ProblemDto> fallbackProblems = new ArrayList<>();

    public ProblemService(ProblemRepository problemRepository,
                          TopicRepository topicRepository,
                          TestCaseRepository testCaseRepository) {
        this.problemRepository = problemRepository;
        this.topicRepository = topicRepository;
        this.testCaseRepository = testCaseRepository;
        initFallbackProblems();
    }

    public List<ProblemDto> getAllProblems() {
        return getProblems(null, null, null);
    }

    public List<ProblemDto> getProblems(String difficulty, String topic, String search) {
        List<ProblemDto> all = new ArrayList<>();
        try {
            List<Problem> dbProblems = problemRepository.findAll();
            if (!dbProblems.isEmpty()) {
                for (Problem p : dbProblems) {
                    all.add(mapToDto(p));
                }
            }
        } catch (Exception ex) {
            logger.warn("Database query failed in getProblems, serving fallback cache: {}", ex.getMessage());
        }

        if (all.isEmpty()) {
            all = new ArrayList<>(fallbackProblems);
        }

        return all.stream()
                .filter(p -> difficulty == null || difficulty.isBlank() || p.getDifficulty().equalsIgnoreCase(difficulty))
                .filter(p -> topic == null || topic.isBlank() || p.getTopic().equalsIgnoreCase(topic))
                .filter(p -> search == null || search.isBlank() ||
                        p.getTitle().toLowerCase().contains(search.toLowerCase()) ||
                        p.getDescription().toLowerCase().contains(search.toLowerCase()))
                .collect(Collectors.toList());
    }

    public Optional<ProblemDto> getProblemById(Long id) {
        try {
            Optional<Problem> dbProblem = problemRepository.findById(id);
            if (dbProblem.isPresent()) {
                return Optional.of(mapToDto(dbProblem.get()));
            }
        } catch (Exception ex) {
            logger.warn("Database query failed in getProblemById for id {}, serving fallback: {}", id, ex.getMessage());
        }
        return fallbackProblems.stream().filter(p -> p.getId().equals(id)).findFirst();
    }

    @Transactional
    public ProblemDto createProblem(ProblemRequest request) {
        String slug = request.getSlug();
        if (slug == null || slug.isBlank()) {
            slug = request.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
        }

        Problem problem = new Problem(
                request.getTitle(),
                slug,
                request.getDescription(),
                request.getDifficulty(),
                request.getConstraints(),
                request.getAcceptanceRate() != null ? request.getAcceptanceRate() : "50.0%"
        );

        if (request.getTopic() != null && !request.getTopic().isBlank()) {
            Topic topic = topicRepository.findByNameIgnoreCase(request.getTopic())
                    .orElseGet(() -> topicRepository.save(new Topic(request.getTopic())));
            problem.getTopics().add(topic);
        }

        Problem saved = problemRepository.save(problem);
        return mapToDto(saved);
    }

    private ProblemDto mapToDto(Problem entity) {
        String topicName = entity.getTopics().isEmpty() ? "General" : entity.getTopics().iterator().next().getName();

        List<String> constraintsList = new ArrayList<>();
        if (entity.getConstraints() != null) {
            constraintsList = Arrays.asList(entity.getConstraints().split("\n"));
        }

        List<Map<String, String>> examples = new ArrayList<>();
        try {
            List<TestCase> sampleCases = testCaseRepository.findByProblemIdAndIsHiddenFalse(entity.getId());
            for (TestCase tc : sampleCases) {
                examples.add(Map.of(
                        "input", tc.getInput(),
                        "output", tc.getExpectedOutput(),
                        "explanation", "Expected output for sample case."
                ));
            }
        } catch (Exception ignored) {}

        if (examples.isEmpty()) {
            examples = getFallbackExamplesForId(entity.getId());
        }

        Map<String, String> templates = getFallbackTemplatesForId(entity.getId(), entity.getTitle());

        return new ProblemDto(
                entity.getId(),
                entity.getTitle(),
                topicName,
                entity.getDifficulty(),
                entity.getAcceptanceRate(),
                entity.getDescription(),
                constraintsList,
                examples,
                templates
        );
    }

    private List<Map<String, String>> getFallbackExamplesForId(Long id) {
        return fallbackProblems.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .map(ProblemDto::getExamples)
                .orElse(List.of(
                        Map.of("input", "Sample input", "output", "Sample output", "explanation", "Sample explanation")
                ));
    }

    private Map<String, String> getFallbackTemplatesForId(Long id, String title) {
        return fallbackProblems.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .map(ProblemDto::getStarterTemplates)
                .orElse(Map.of(
                        "java", "class Solution {\n    // Solution for " + title + "\n}",
                        "python", "# Solution for " + title + "\nclass Solution:\n    pass",
                        "javascript", "// Solution for " + title + "\nfunction solve() {\n}",
                        "cpp", "// Solution for " + title + "\nclass Solution {\npublic:\n};"
                ));
    }

    private void initFallbackProblems() {
        // 1. Two Sum
        fallbackProblems.add(new ProblemDto(
                1L,
                "Two Sum",
                "Arrays & Hashing",
                "Easy",
                "52.4%",
                "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
                List.of(
                        "2 <= nums.length <= 10^4",
                        "-10^9 <= nums[i] <= 10^9",
                        "-10^9 <= target <= 10^9",
                        "Only one valid answer exists."
                ),
                List.of(
                        Map.of("input", "nums = [2,7,11,15], target = 9", "output", "[0,1]", "explanation", "Because nums[0] + nums[1] == 9, we return [0, 1]."),
                        Map.of("input", "nums = [3,2,4], target = 6", "output", "[1,2]", "explanation", "Because nums[1] + nums[2] == 6, we return [1, 2].")
                ),
                Map.of(
                        "java", "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[0];\n    }\n}",
                        "python", "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Write your code here\n        return []",
                        "javascript", "function twoSum(nums, target) {\n    // Write your code here\n    return [];\n}",
                        "cpp", "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        return {};\n    }\n};"
                )
        ));

        // 2. Valid Anagram
        fallbackProblems.add(new ProblemDto(
                2L,
                "Valid Anagram",
                "Strings",
                "Easy",
                "64.1%",
                "Given two strings s and t, return true if t is an anagram of s, and false otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
                List.of(
                        "1 <= s.length, t.length <= 5 * 10^4",
                        "s and t consist of lowercase English letters."
                ),
                List.of(
                        Map.of("input", "s = \"anagram\", t = \"nagaram\"", "output", "true", "explanation", "Both contain identical letter counts."),
                        Map.of("input", "s = \"rat\", t = \"car\"", "output", "false", "explanation", "Letters mismatch.")
                ),
                Map.of(
                        "java", "class Solution {\n    public boolean isAnagram(String s, String t) {\n        // Write your code here\n        return false;\n    }\n}",
                        "python", "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        # Write your code here\n        return False",
                        "javascript", "function isAnagram(s, t) {\n    // Write your code here\n    return false;\n}",
                        "cpp", "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        // Write your code here\n        return false;\n    }\n};"
                )
        ));

        // 3. Longest Substring Without Repeating Characters
        fallbackProblems.add(new ProblemDto(
                3L,
                "Longest Substring Without Repeating Characters",
                "Sliding Window",
                "Medium",
                "34.8%",
                "Given a string s, find the length of the longest substring without repeating characters.",
                List.of(
                        "0 <= s.length <= 5 * 10^4",
                        "s consists of English letters, digits, symbols and spaces."
                ),
                List.of(
                        Map.of("input", "s = \"abcabcbb\"", "output", "3", "explanation", "The answer is \"abc\", with the length of 3."),
                        Map.of("input", "s = \"bbbbb\"", "output", "1", "explanation", "The answer is \"b\", with the length of 1.")
                ),
                Map.of(
                        "java", "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n        return 0;\n    }\n}",
                        "python", "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Write your code here\n        return 0",
                        "javascript", "function lengthOfLongestSubstring(s) {\n    // Write your code here\n    return 0;\n}",
                        "cpp", "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your code here\n        return 0;\n    }\n};"
                )
        ));
    }
}
