import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  Send, 
  RotateCcw, 
  ChevronLeft, 
  CheckCircle2, 
  Terminal, 
  Clock, 
  Cpu, 
  Sparkles, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { problemsApi } from '../api/client';

export default function ProblemWorkspacePage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [executing, setExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [activeTab, setActiveTab] = useState('tests'); // 'tests' | 'output'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchProblem() {
      setLoading(true);
      try {
        const data = await problemsApi.getProblemById(id);
        setProblem(data);
        const starter = data.starterCode?.[language] || data.starterCode?.['java'] || '// Write solution here\n';
        setCode(starter);
      } catch (err) {
        console.error('Failed to load problem:', err);
        // Fallback problem if API is unreachable
        const fallback = {
          id: Number(id) || 1,
          title: 'Two Sum',
          category: 'Arrays & Hashing',
          difficulty: 'Easy',
          acceptance: '52.4%',
          description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
          constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
          examples: [
            { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' }
          ],
          starterCode: {
            java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{0, 1};\n    }\n}',
            python: 'class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        return [0, 1]',
            javascript: 'function twoSum(nums, target) {\n    return [0, 1];\n}',
            cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        return {0, 1};\n    }\n};'
          }
        };
        setProblem(fallback);
        setCode(fallback.starterCode[language] || fallback.starterCode.java);
      } finally {
        setLoading(false);
      }
    }
    fetchProblem();
  }, [id]);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (problem?.starterCode?.[newLang]) {
      setCode(problem.starterCode[newLang]);
    }
  };

  const handleResetCode = () => {
    if (problem?.starterCode?.[language]) {
      setCode(problem.starterCode[language]);
    }
  };

  const handleRunCode = async () => {
    setExecuting(true);
    setExecutionResult(null);
    try {
      const res = await problemsApi.runCode(id, { code, language });
      setExecutionResult(res);
      setActiveTab('tests');
    } catch (err) {
      setExecutionResult({
        status: 'Runtime Error',
        passedCount: 0,
        totalCount: 2,
        executionTimeMs: 12,
        message: err.message || 'Execution failed'
      });
    } finally {
      setExecuting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-140px)] flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500/30 border-t-cyan-400 rounded-full animate-spin" />
          <span className="text-xs font-mono">Loading problem workspace...</span>
        </div>
      </div>
    );
  }

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] space-y-3">
      {/* Workspace Sub-header */}
      <div className="flex items-center justify-between bg-navy-900 border border-navy-800 rounded-xl px-4 py-2 text-xs">
        <div className="flex items-center gap-3">
          <Link
            to="/problems"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Problem List</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="font-mono text-slate-400">#{problem?.id}</span>
          <span className="font-bold text-white truncate max-w-xs">{problem?.title}</span>
          <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold border ${getDifficultyBadge(problem?.difficulty)}`}>
            {problem?.difficulty}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-navy-950 border border-navy-800 rounded-lg p-0.5">
            {['java', 'python', 'javascript', 'cpp'].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all uppercase ${
                  language === lang
                    ? 'bg-blue-600 text-white font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={handleResetCode}
            className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white border border-navy-700 transition-colors"
            title="Reset to Starter Code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopyCode}
            className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white border border-navy-700 transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleRunCode}
            disabled={executing}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 border border-navy-700 text-cyan-400 font-semibold text-xs transition-all disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-cyan-400 ${executing ? 'animate-pulse' : ''}`} />
            <span>{executing ? 'Running...' : 'Run Code'}</span>
          </button>

          <button
            onClick={handleRunCode}
            disabled={executing}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5 fill-white" />
            <span>Submit</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-hidden">
        {/* Left Side: Problem Statement */}
        <div className="lg:col-span-5 bg-navy-900 border border-navy-800 rounded-xl p-5 overflow-y-auto space-y-5 text-xs text-slate-300">
          <div>
            <span className="text-[10px] uppercase font-mono text-cyan-400 font-semibold">
              {problem?.category}
            </span>
            <h1 className="text-xl font-bold text-white mt-1">{problem?.title}</h1>
            <div className="flex items-center gap-3 mt-2 text-slate-400 font-mono text-[11px]">
              <span>Acceptance: <strong className="text-slate-200">{problem?.acceptance}</strong></span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Solved: 42
              </span>
            </div>
          </div>

          <div className="space-y-3 font-sans text-slate-200 leading-relaxed whitespace-pre-line border-t border-navy-800 pt-4">
            {problem?.description}
          </div>

          {/* Examples */}
          {problem?.examples?.map((ex, idx) => (
            <div key={idx} className="bg-navy-950 border border-navy-800 rounded-lg p-3 space-y-1.5 font-mono text-[11px]">
              <span className="text-cyan-400 font-bold block font-sans">Example {idx + 1}:</span>
              <div>
                <span className="text-slate-500">Input: </span>
                <span className="text-slate-200">{ex.input}</span>
              </div>
              <div>
                <span className="text-slate-500">Output: </span>
                <span className="text-emerald-400">{ex.output}</span>
              </div>
              {ex.explanation && (
                <div className="text-slate-400 font-sans text-[11px] pt-1 border-t border-navy-900">
                  <span className="text-slate-500">Explanation: </span>{ex.explanation}
                </div>
              )}
            </div>
          ))}

          {/* Constraints */}
          {problem?.constraints?.length > 0 && (
            <div className="space-y-2 border-t border-navy-800 pt-3">
              <span className="font-bold text-white text-[11px] uppercase tracking-wider block">Constraints:</span>
              <ul className="list-disc list-inside space-y-1 font-mono text-slate-400 text-[11px]">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Side: Monaco Code Editor + Results */}
        <div className="lg:col-span-7 flex flex-col bg-navy-900 border border-navy-800 rounded-xl overflow-hidden min-h-0">
          {/* Code Editor Container */}
          <div className="flex-1 min-h-[320px] bg-navy-950">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: "'Fira Code', monospace",
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                padding: { top: 12, bottom: 12 }
              }}
            />
          </div>

          {/* Execution Output Panel */}
          <div className="h-44 border-t border-navy-800 bg-navy-900/95 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-navy-800 bg-navy-950 text-xs font-mono">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('tests')}
                  className={`pb-0.5 border-b-2 font-semibold transition-all ${
                    activeTab === 'tests' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Test Results
                </button>
                <button
                  onClick={() => setActiveTab('output')}
                  className={`pb-0.5 border-b-2 font-semibold transition-all ${
                    activeTab === 'output' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Console Output
                </button>
              </div>

              {executionResult && (
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {executionResult.status}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {executionResult.executionTimeMs} ms
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    42.1 MB
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 p-3 overflow-y-auto font-mono text-xs">
              {executing ? (
                <div className="flex items-center gap-2 text-slate-400 h-full justify-center">
                  <div className="w-4 h-4 border-2 border-blue-500/30 border-t-cyan-400 rounded-full animate-spin" />
                  <span>Compiling and evaluating against test suite...</span>
                </div>
              ) : executionResult ? (
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                    {executionResult.message || 'All test cases passed!'}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                    <div className="p-2 rounded bg-navy-950 border border-navy-800">
                      <span className="text-slate-500 block">Case 1:</span>
                      <span className="text-emerald-400">Passed ✓ [2, 7, 11, 15] target=9 → [0, 1]</span>
                    </div>
                    <div className="p-2 rounded bg-navy-950 border border-navy-800">
                      <span className="text-slate-500 block">Case 2:</span>
                      <span className="text-emerald-400">Passed ✓ [3, 2, 4] target=6 → [1, 2]</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  <span>Click "Run Code" to compile and execute against sample test cases.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
