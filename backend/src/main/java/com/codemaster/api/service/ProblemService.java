package com.codemaster.api.service;

import com.codemaster.api.dto.ProblemDto;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProblemService {

    private final List<ProblemDto> problems = new ArrayList<>();

    public ProblemService() {
        initProblems();
    }

    private void initProblems() {
        // 1. Two Sum
        problems.add(new ProblemDto(
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
                        "java", "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}",
                        "python", "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Your code here\n        seen = {}\n        for i, num in enumerate(nums):\n            diff = target - num\n            if diff in seen:\n                return [seen[diff], i]\n            seen[num] = i\n        return []",
                        "javascript", "function twoSum(nums, target) {\n    // Your code here\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}",
                        "cpp", "#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> map;\n        for (int i = 0; i < nums.size(); i++) {\n            int diff = target - nums[i];\n            if (map.count(diff)) return {map[diff], i};\n            map[nums[i]] = i;\n        }\n        return {};\n    }\n};"
                )
        ));

        // 2. Valid Anagram
        problems.add(new ProblemDto(
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
                        "java", "class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] counts = new int[26];\n        for (char c : s.toCharArray()) counts[c - 'a']++;\n        for (char c : t.toCharArray()) {\n            if (--counts[c - 'a'] < 0) return false;\n        }\n        return true;\n    }\n}",
                        "python", "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        if len(s) != len(t):\n            return False\n        from collections import Counter\n        return Counter(s) == Counter(t)",
                        "javascript", "function isAnagram(s, t) {\n    if (s.length !== t.length) return false;\n    return s.split('').sort().join('') === t.split('').sort().join('');\n}",
                        "cpp", "#include <string>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        if (s.size() != t.size()) return false;\n        vector<int> count(26, 0);\n        for (char c : s) count[c - 'a']++;\n        for (char c : t) if (--count[c - 'a'] < 0) return false;\n        return true;\n    }\n};"
                )
        ));

        // 3. Longest Substring Without Repeating Characters
        problems.add(new ProblemDto(
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
                        "java", "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        int maxLen = 0, left = 0;\n        Set<Character> set = new HashSet<>();\n        for (int right = 0; right < s.length(); right++) {\n            while (set.contains(s.charAt(right))) {\n                set.remove(s.charAt(left++));\n            }\n            set.add(s.charAt(right));\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}",
                        "python", "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        char_set = set()\n        left = 0\n        max_len = 0\n        for right in range(len(s)):\n            while s[right] in char_set:\n                char_set.remove(s[left])\n                left += 1\n            char_set.add(s[right])\n            max_len = max(max_len, right - left + 1)\n        return max_len",
                        "javascript", "function lengthOfLongestSubstring(s) {\n    let left = 0, maxLen = 0;\n    const set = new Set();\n    for (let right = 0; right < s.length; right++) {\n        while (set.has(s[right])) {\n            set.delete(s[left++]);\n        }\n        set.add(s[right]);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}",
                        "cpp", "#include <string>\n#include <unordered_set>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_set<char> set;\n        int left = 0, maxLen = 0;\n        for (int right = 0; right < s.size(); right++) {\n            while (set.count(s[right])) set.erase(s[left++]);\n            set.insert(s[right]);\n            maxLen = max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n};"
                )
        ));
    }

    public List<ProblemDto> getAllProblems() {
        return problems;
    }

    public Optional<ProblemDto> getProblemById(Long id) {
        return problems.stream().filter(p -> p.getId().equals(id)).findFirst();
    }
}
