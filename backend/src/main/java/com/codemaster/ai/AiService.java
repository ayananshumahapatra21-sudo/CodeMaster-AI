package com.codemaster.ai;

import com.codemaster.ai.dto.AiRequest;
import com.codemaster.ai.dto.AiResponse;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    public AiResponse generateHint(AiRequest request) {
        String title = request.getProblemTitle() != null ? request.getProblemTitle() : "the problem";
        String hint;

        if (title.toLowerCase().contains("two sum") || title.toLowerCase().contains("pair")) {
            hint = "Consider what data structure enables constant O(1) average lookup time. As you iterate through the list, can you check whether the complement (target - current_value) has already been seen?";
        } else if (title.toLowerCase().contains("anagram")) {
            hint = "An anagram consists of identical character frequencies. Can an array of size 26 or a hash map track the count differences between both strings in a single pass?";
        } else if (title.toLowerCase().contains("substring")) {
            hint = "Think about using a Sliding Window with two pointers (left and right). Move the right pointer to expand, and contract the left pointer as soon as a duplicate character is encountered.";
        } else if (title.toLowerCase().contains("parenthes")) {
            hint = "A Last-In-First-Out (LIFO) Stack structure is ideal. Push opening brackets onto the stack and verify that incoming closing brackets match the topmost element.";
        } else {
            hint = "Start by analyzing the brute-force approach and where repeated computation happens. Try mapping previous values in a hash table or utilizing two pointers to reduce complexity from O(n^2) to O(n).";
        }

        return new AiResponse("HINT", hint, "O(n)", "O(n)");
    }

    public AiResponse explainProblem(AiRequest request) {
        String title = request.getProblemTitle() != null ? request.getProblemTitle() : "this challenge";
        String explanation = String.format(
                "### Conceptual Breakdown: %s\n\n" +
                "1. **Core Problem Goal**: Identify the optimal invariant or relationship in the input data.\n" +
                "2. **Optimal Strategy**: Avoid nested O(n^2) loops by indexing visited elements or using pointer sweeps.\n" +
                "3. **Edge Cases to Guard Against**:\n" +
                "   - Empty or single-element inputs.\n" +
                "   - Extreme negative or large numerical values.\n" +
                "   - Non-contiguous or duplicate items.",
                title
        );

        return new AiResponse("EXPLAIN", explanation, "O(n)", "O(1) or O(n)");
    }

    public AiResponse debugCode(AiRequest request) {
        String code = request.getCode() != null ? request.getCode() : "";
        String analysis;

        if (code.isBlank() || code.length() < 30) {
            analysis = "Your editor seems mostly empty! Start by creating the function skeleton, declaring your return variable, and writing a loop over the input data.";
        } else if (!code.contains("return")) {
            analysis = "Check your function output: no 'return' statement was detected. Ensure every code path produces a valid result.";
        } else if (code.contains("for") && code.contains("while")) {
            analysis = "Notice the nested loops in your implementation. While functionally viable for small test cases, this can lead to Time Limit Exceeded (TLE) on larger inputs. Try caching intermediate results with a hash table.";
        } else {
            analysis = "Logic structure looks clean! Verify edge cases:\n- What happens if the input has duplicate values?\n- Is your loop index bounded to avoid off-by-one errors?\n- Have you initialized collections before accessing them?";
        }

        return new AiResponse("DEBUG", analysis, "O(n)", "O(n)");
    }
}
