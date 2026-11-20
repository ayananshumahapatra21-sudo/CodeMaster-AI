import apiClient from './apiClient';
import { executeClientSide } from './clientExecutionEngine';

const fallbackProblems = [
  {
    id: 1,
    title: 'Two Sum',
    topic: 'Arrays & Hashing',
    difficulty: 'Easy',
    acceptance: '52.4%',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' }
    ],
    starterTemplates: {
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[0];\n    }\n}',
      python: 'class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Write your solution here\n        return []',
      javascript: 'function twoSum(nums, target) {\n    // Write your solution here\n    return [];\n}',
      cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};'
    }
  },
  {
    id: 2,
    title: 'Valid Anagram',
    topic: 'Strings',
    difficulty: 'Easy',
    acceptance: '64.1%',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: 'Both contain identical letter counts.' },
      { input: 's = "rat", t = "car"', output: 'false', explanation: 'Letters mismatch.' }
    ],
    starterTemplates: {
      java: 'class Solution {\n    public boolean isAnagram(String s, String t) {\n        // Write your solution here\n        return false;\n    }\n}',
      python: 'class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        # Write your solution here\n        return False',
      javascript: 'function isAnagram(s, t) {\n    // Write your solution here\n    return false;\n}',
      cpp: 'class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        // Write your solution here\n        return false;\n    }\n};'
    }
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    topic: 'Sliding Window',
    difficulty: 'Medium',
    acceptance: '34.8%',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' }
    ],
    starterTemplates: {
      java: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your solution here\n        return 0;\n    }\n}',
      python: 'class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Write your solution here\n        return 0',
      javascript: 'function lengthOfLongestSubstring(s) {\n    // Write your solution here\n    return 0;\n}',
      cpp: 'class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your solution here\n        return 0;\n    }\n};'
    }
  },
  {
    id: 4,
    title: 'Valid Parentheses',
    topic: 'Stack',
    difficulty: 'Easy',
    acceptance: '40.5%',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only \'()[]{}\'.'],
    examples: [
      { input: 's = "()"', output: 'true', explanation: 'Matching parentheses.' },
      { input: 's = "()[]{}"', output: 'true', explanation: 'All matching brackets.' }
    ],
    starterTemplates: {
      java: 'class Solution {\n    public boolean isValid(String s) {\n        // Write your solution here\n        return false;\n    }\n}',
      python: 'class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write your solution here\n        return False',
      javascript: 'function isValid(s) {\n    // Write your solution here\n    return false;\n}',
      cpp: 'class Solution {\npublic:\n    bool isValid(string s) {\n        // Write your solution here\n        return false;\n    }\n};'
    }
  },
  {
    id: 5,
    title: 'Trapping Rain Water',
    topic: 'Two Pointers',
    difficulty: 'Hard',
    acceptance: '60.2%',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: 'Traps 6 units of rain water.' },
      { input: 'height = [4,2,0,3,2,5]', output: '9', explanation: 'Traps 9 units of rain water.' }
    ],
    starterTemplates: {
      java: 'class Solution {\n    public int trap(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n}',
      python: 'class Solution:\n    def trap(self, height: list[int]) -> int:\n        # Write your solution here\n        return 0',
      javascript: 'function trap(height) {\n    // Write your solution here\n    return 0;\n}',
      cpp: 'class Solution {\npublic:\n    int trap(vector<int>& height) {\n        // Write your solution here\n        return 0;\n    }\n};'
    }
  }
];

export const problemService = {
  getAllProblems: async (difficulty, topic, search) => {
    try {
      const response = await apiClient.get('/problems', {
        params: { difficulty, topic, search }
      });
      return response.data;
    } catch (err) {
      console.warn('Backend unavailable, using catalog fallback');
      return fallbackProblems.filter(p => {
        if (difficulty && difficulty !== 'All' && p.difficulty.toLowerCase() !== difficulty.toLowerCase()) return false;
        if (topic && topic !== 'All' && p.topic.toLowerCase() !== topic.toLowerCase()) return false;
        if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      });
    }
  },

  getProblemById: async (id) => {
    try {
      const response = await apiClient.get(`/problems/${id}`);
      return response.data;
    } catch (err) {
      console.warn(`Backend unavailable for problem ${id}, using catalog fallback`);
      const found = fallbackProblems.find(p => p.id === Number(id));
      return found || fallbackProblems[0];
    }
  },

  runCode: async (id, code, language) => {
    try {
      const response = await apiClient.post(`/problems/${id}/run`, {
        code,
        language
      });
      return response.data;
    } catch (err) {
      console.warn('Cloud API unreachable (' + (err.message || 'Mixed Content') + '). Running client-side execution engine.');
      return executeClientSide(id, language, code);
    }
  }
};
