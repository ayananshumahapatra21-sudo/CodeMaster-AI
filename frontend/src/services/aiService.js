import apiClient from './apiClient';

const aiFallbacks = {
  hint: {
    1: "Try storing elements you've visited in a Hash Map mapping value -> index. For each element num, compute `complement = target - num` and check if `map.containsKey(complement)` in O(1) time.",
    2: "Since the problem asks for anagrams, two words are anagrams if their character counts are identical. Count characters using an integer array of size 26 or by sorting both strings.",
    3: "Use the sliding window technique with two pointers `left` and `right`. Maintain a HashSet of characters currently in the window. Shrink from the left whenever a duplicate is found.",
    4: "Use a Stack (LIFO data structure). Whenever you encounter an opening bracket '(', '{', '[', push it. When encountering a closing bracket, check if it matches the stack's top.",
    5: "Use the Two-Pointers approach (`left = 0`, `right = n - 1`) tracking `leftMax` and `rightMax`. At each step, water trapped depends on `min(leftMax, rightMax) - height[i]`."
  },
  explain: {
    1: "Problem Analysis:\nGiven an array and target, find two distinct indices whose values sum up to target.\n\nOptimal Approach:\nOne-pass Hash Map. As we iterate through nums, we check if the complement (target - nums[i]) already exists in our table. If yes, we return indices immediately.\n\nComplexity:\n• Time Complexity: O(n)\n• Space Complexity: O(n)",
    2: "Problem Analysis:\nDetermine if string t is an anagram of string s.\n\nOptimal Approach:\nFirst verify equal lengths. Then use a frequency counter of size 26 for English lowercase letters. Increment for s, decrement for t. If all counts return 0, they are valid anagrams.\n\nComplexity:\n• Time Complexity: O(n)\n• Space Complexity: O(1) fixed 26 letters",
    3: "Problem Analysis:\nFind the maximum length of a contiguous substring without duplicate characters.\n\nOptimal Approach:\nSliding window with two pointers. Expand right pointer until a duplicate character is seen. Advance left pointer until the window has unique characters again.\n\nComplexity:\n• Time Complexity: O(n)\n• Space Complexity: O(min(m, n)) where m is charset size",
    4: "Problem Analysis:\nValidate parentheses ordering and matching.\n\nOptimal Approach:\nMaintain a stack of expected matching brackets. For every open bracket, push onto stack. For closing brackets, pop and verify equality.\n\nComplexity:\n• Time Complexity: O(n)\n• Space Complexity: O(n)",
    5: "Problem Analysis:\nCompute trapped rainwater between vertical bars.\n\nOptimal Approach:\nTwo-pointer technique. Maintain leftMax and rightMax boundaries. Process the smaller boundary first because trapped water is constrained by the shorter wall.\n\nComplexity:\n• Time Complexity: O(n)\n• Space Complexity: O(1)"
  },
  debug: {
    1: "Code Diagnostics:\n1. Verify you are returning 0-indexed positions.\n2. Ensure you do not use the same element twice (check `map.get(complement) != i`).\n3. If no pair adds up to target, return an empty array `new int[0]`.\n4. Check for integer overflow if dealing with extreme inputs.",
    2: "Code Diagnostics:\n1. Did you check if `s.length() != t.length()` upfront?\n2. Ensure array indices are shifted by subtracting `'a'` (`c - 'a'`).\n3. Check if counts ever drop below zero.",
    3: "Code Diagnostics:\n1. Check if left pointer increments properly inside the while loop.\n2. Update maxLen after removing duplicates: `maxLen = Math.max(maxLen, right - left + 1)`.\n3. Handle empty string input `s = \"\"` (expected output: 0).",
    4: "Code Diagnostics:\n1. Check if stack is empty before calling `pop()` to avoid EmptyStackException.\n2. Verify final check: `return stack.isEmpty()` to catch leftover unclosed opening brackets.",
    5: "Code Diagnostics:\n1. Check array bounds when `height.length < 3` (water trapped is 0).\n2. Update pointer indices correctly after adding trapped water volume."
  }
};

export const aiService = {
  getHint: async (problemId, problemTitle, code, language) => {
    try {
      const response = await apiClient.post('/ai/hint', {
        problemId,
        problemTitle,
        code,
        language
      });
      return response.data?.data || response.data;
    } catch (err) {
      const numId = Number(problemId) || 1;
      return {
        type: 'HINT',
        response: aiFallbacks.hint[numId] || "Think about using an efficient data structure like a Hash Map or Two Pointers to reduce time complexity from O(n^2) to O(n).",
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)'
      };
    }
  },

  explainProblem: async (problemId, problemTitle) => {
    try {
      const response = await apiClient.post('/ai/explain', {
        problemId,
        problemTitle
      });
      return response.data?.data || response.data;
    } catch (err) {
      const numId = Number(problemId) || 1;
      return {
        type: 'EXPLANATION',
        response: aiFallbacks.explain[numId] || "Break the problem into sub-problems: define the optimal sub-structure, evaluate edge cases, and choose between Hash Map lookup or Two Pointers.",
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)'
      };
    }
  },

  debugCode: async (problemId, problemTitle, code, language) => {
    try {
      const response = await apiClient.post('/ai/debug', {
        problemId,
        problemTitle,
        code,
        language
      });
      return response.data?.data || response.data;
    } catch (err) {
      const numId = Number(problemId) || 1;
      return {
        type: 'DEBUG',
        response: aiFallbacks.debug[numId] || "Review boundary conditions: empty array, single element, and duplicate values.",
        timeComplexity: 'N/A',
        spaceComplexity: 'N/A'
      };
    }
  }
};
