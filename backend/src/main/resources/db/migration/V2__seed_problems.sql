-- =======================================================
-- CodeMaster AI - Flyway Database Migration: V2 Seed Data
-- =======================================================

-- Seed Topics
INSERT INTO topics (id, name) VALUES
(1, 'Arrays & Hashing'),
(2, 'Two Pointers'),
(3, 'Sliding Window'),
(4, 'Stack'),
(5, 'Binary Search'),
(6, 'Linked List'),
(7, 'Trees'),
(8, 'Dynamic Programming');

-- Seed Problems
INSERT INTO problems (id, title, slug, description, difficulty, constraints, acceptance_rate) VALUES
(1, 'Two Sum', 'two-sum', 
'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.', 
'Easy', 
'2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
Only one valid answer exists.',
'52.4%'),

(2, 'Valid Anagram', 'valid-anagram', 
'Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.', 
'Easy', 
'1 <= s.length, t.length <= 5 * 10^4
s and t consist of lowercase English letters.',
'64.1%'),

(3, 'Longest Substring Without Repeating Characters', 'longest-substring-without-repeating-characters', 
'Given a string s, find the length of the longest substring without repeating characters.', 
'Medium', 
'0 <= s.length <= 5 * 10^4
s consists of English letters, digits, symbols and spaces.',
'34.8%'),

(4, 'Valid Parentheses', 'valid-parentheses',
'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.',
'Easy',
'1 <= s.length <= 10^4
s consists of parentheses only ''()[]{}''.',
'40.5%'),

(5, 'Trapping Rain Water', 'trapping-rain-water',
'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
'Hard',
'n == height.length
1 <= n <= 2 * 10^4
0 <= height[i] <= 10^5',
'60.2%');

-- Map Problems to Topics
INSERT INTO problem_topics (problem_id, topic_id) VALUES
(1, 1), -- Two Sum -> Arrays & Hashing
(2, 1), -- Valid Anagram -> Arrays & Hashing
(3, 3), -- Longest Substring -> Sliding Window
(4, 4), -- Valid Parentheses -> Stack
(5, 2), -- Trapping Rain Water -> Two Pointers
(5, 8); -- Trapping Rain Water -> Dynamic Programming

-- Seed Sample and Hidden Test Cases
INSERT INTO test_cases (id, problem_id, input, expected_output, is_hidden) VALUES
-- Problem 1: Two Sum
(1, 1, 'nums = [2,7,11,15], target = 9', '[0,1]', FALSE),
(2, 1, 'nums = [3,2,4], target = 6', '[1,2]', FALSE),
(3, 1, 'nums = [3,3], target = 6', '[0,1]', TRUE),
(4, 1, 'nums = [1,5,8,10,14], target = 15', '[1,3]', TRUE),

-- Problem 2: Valid Anagram
(5, 2, 's = "anagram", t = "nagaram"', 'true', FALSE),
(6, 2, 's = "rat", t = "car"', 'false', FALSE),
(7, 2, 's = "a", t = "a"', 'true', TRUE),

-- Problem 3: Longest Substring
(8, 3, 's = "abcabcbb"', '3', FALSE),
(9, 3, 's = "bbbbb"', '1', FALSE),
(10, 3, 's = "pwwkew"', '3', TRUE),

-- Problem 4: Valid Parentheses
(11, 4, 's = "()"', 'true', FALSE),
(12, 4, 's = "()[]{}"', 'true', FALSE),
(13, 4, 's = "(]"', 'false', TRUE),

-- Problem 5: Trapping Rain Water
(14, 5, 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', '6', FALSE),
(15, 5, 'height = [4,2,0,3,2,5]', '9', TRUE);
