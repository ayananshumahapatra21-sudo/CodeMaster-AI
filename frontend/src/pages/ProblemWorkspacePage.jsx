import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  Send, 
  RotateCcw, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle,
  Terminal, 
  Clock, 
  Cpu, 
  Sparkles, 
  AlertCircle,
  Copy,
  Check,
  Lightbulb,
  BookOpen,
  Bug,
  HelpCircle,
  X
} from 'lucide-react';
import { problemService } from '../services/problemService';
import { submissionService } from '../services/submissionService';
import { aiService } from '../services/aiService';

export default function ProblemWorkspacePage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  
  // Execution & Submission State
  const [executing, setExecuting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [activeTab, setActiveTab] = useState('tests'); // 'tests' | 'submission' | 'ai'
  
  // AI Assistant State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchProblem() {
      setLoading(true);
      try {
        const data = await problemService.getProblemById(id);
        setProblem(data);
        const starter = data.starterTemplates?.[language] || data.starterTemplates?.['java'] || '// Write solution here\n';
        setCode(starter);
      } catch (err) {
        console.error('Failed to load problem:', err);
        const fallback = {
          id: Number(id) || 1,
          title: 'Two Sum',
          topic: 'Arrays & Hashing',
          difficulty: 'Easy',
          acceptance: '52.4%',
          description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
          constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
          examples: [
            { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' }
          ],
          starterTemplates: {
            java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[0];\n    }\n}',
            python: 'class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Write your solution here\n        return []',
            javascript: 'function twoSum(nums, target) {\n    // Write your solution here\n    return [];\n}',
            cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};'
          }
        };
        setProblem(fallback);
        setCode(fallback.starterTemplates[language] || fallback.starterTemplates.java);
      } finally {
        setLoading(false);
      }
    }
    fetchProblem();
  }, [id]);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (problem?.starterTemplates?.[newLang]) {
      setCode(problem.starterTemplates[newLang]);
    }
  };

  const handleResetCode = () => {
    if (problem?.starterTemplates?.[language]) {
      setCode(problem.starterTemplates[language]);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = async () => {
    setExecuting(true);
    setExecutionResult(null);
    setActiveTab('tests');
    try {
      const res = await problemService.runCode(id, code, language);
      setExecutionResult(res);
    } catch (err) {
      setExecutionResult({
        status: 'Runtime Error',
        passedCount: 0,
        totalCount: 2,
        executionTimeMs: 12,
        message: err.response?.data?.message || err.message || 'Execution failed'
      });
    } finally {
      setExecuting(false);
    }
  };

  const handleSubmitCode = async () => {
    setSubmitting(true);
    setSubmissionResult(null);
    setActiveTab('submission');
    try {
      const res = await submissionService.submitCode(Number(id), language, code);
      setSubmissionResult(res);
    } catch (err) {
      setSubmissionResult({
        status: 'Wrong Answer',
        passedCount: 0,
        totalCount: 4,
        executionTimeMs: 25,
        memoryKb: 42100,
        message: err.response?.data?.message || err.message || 'Submission evaluation failed'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAiAction = async (actionType) => {
    setAiLoading(true);
    setActiveTab('ai');
    try {
      let res;
      if (actionType === 'hint') {
        res = await aiService.getHint(problem?.id, problem?.title, code, language);
      } else if (actionType === 'explain') {
        res = await aiService.explainProblem(problem?.id, problem?.title);
      } else if (actionType === 'debug') {
        res = await aiService.debugCode(problem?.id, problem?.title, code, language);
      }
      setAiResponse(res);
    } catch (err) {
      setAiResponse({
        type: 'ERROR',
        response: 'Unable to reach AI Assistant: ' + (err.message || 'Request timed out'),
        timeComplexity: 'N/A',
        spaceComplexity: 'N/A'
      });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] space-y-3">
      {/* Top Workspace Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-navy-900 border border-navy-800 rounded-xl px-4 py-2.5 shadow-md">
        <div className="flex items-center gap-3">
          <Link
            to="/problems"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-navy-800 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Problem Bank</span>
          </Link>
          <div className="h-4 w-[1px] bg-navy-700" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-400">#{problem?.id}</span>
            <span className="text-sm font-bold text-white">{problem?.title}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono border ${
              problem?.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
              problem?.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
              'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}>
              {problem?.difficulty}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-navy-950 border border-navy-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 transition"
          >
            <option value="java">Java 21</option>
            <option value="javascript">JavaScript (Node)</option>
            <option value="python">Python 3</option>
            <option value="cpp">C++ 20</option>
          </select>

          {/* AI Assistance Button */}
          <button
            onClick={() => handleAiAction('hint')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-medium transition shadow-sm"
            title="Ask AI for an algorithmic hint"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Hint</span>
          </button>

          <button
            onClick={handleResetCode}
            title="Reset to Starter Template"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-navy-800 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopyCode}
            title="Copy Solution Code"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-navy-800 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Run Code */}
          <button
            onClick={handleRunCode}
            disabled={executing || submitting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 text-xs font-medium transition shadow-sm disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current text-cyan-400" />
            <span>{executing ? 'Compiling...' : 'Run Sample'}</span>
          </button>

          {/* Submit Code */}
          <button
            onClick={handleSubmitCode}
            disabled={executing || submitting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5 fill-current" />
            <span>{submitting ? 'Evaluating...' : 'Submit Code'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-hidden">
        {/* Left Side: Problem Statement & AI Drawer */}
        <div className="lg:col-span-5 bg-navy-900 border border-navy-800 rounded-xl p-5 overflow-y-auto space-y-5 text-xs text-slate-300">
          <div>
            <span className="text-[10px] uppercase font-mono text-cyan-400 font-semibold tracking-wider">
              {problem?.topic || problem?.category || 'Algorithm Challenge'}
            </span>
            <h1 className="text-xl font-bold text-white mt-1">{problem?.title}</h1>
            <div className="flex items-center gap-3 mt-2 text-slate-400 font-mono text-[11px]">
              <span>Acceptance: <strong className="text-slate-200">{problem?.acceptance || '52.4%'}</strong></span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Solved: 120+
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

          {/* AI Quick Actions Bar */}
          <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 space-y-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Personalized AI Coding Coach</span>
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleAiAction('hint')}
                className="p-2 rounded-lg bg-navy-900 hover:bg-navy-850 text-slate-300 text-[11px] font-medium border border-navy-800 flex items-center justify-center gap-1.5 transition"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Hint</span>
              </button>
              <button
                onClick={() => handleAiAction('explain')}
                className="p-2 rounded-lg bg-navy-900 hover:bg-navy-850 text-slate-300 text-[11px] font-medium border border-navy-800 flex items-center justify-center gap-1.5 transition"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Explain</span>
              </button>
              <button
                onClick={() => handleAiAction('debug')}
                className="p-2 rounded-lg bg-navy-900 hover:bg-navy-850 text-slate-300 text-[11px] font-medium border border-navy-800 flex items-center justify-center gap-1.5 transition"
              >
                <Bug className="w-3.5 h-3.5 text-rose-400" />
                <span>Debug</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Monaco Code Editor + Results Tab Panel */}
        <div className="lg:col-span-7 flex flex-col bg-navy-900 border border-navy-800 rounded-xl overflow-hidden min-h-0">
          {/* Code Editor Container */}
          <div className="flex-1 min-h-[300px] bg-navy-950">
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

          {/* Multi-Tab Results & AI Panel */}
          <div className="h-56 border-t border-navy-800 bg-navy-900/95 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-navy-800 bg-navy-950 text-xs font-mono">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveTab('tests')}
                  className={`pb-0.5 border-b-2 font-semibold transition-all ${
                    activeTab === 'tests' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Sample Tests
                </button>
                <button
                  onClick={() => setActiveTab('submission')}
                  className={`pb-0.5 border-b-2 font-semibold transition-all ${
                    activeTab === 'submission' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Submission Verdict
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`pb-0.5 border-b-2 font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'ai' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Assistant</span>
                </button>
              </div>

              {/* Status Header */}
              {activeTab === 'tests' && executionResult && (
                <div className="flex items-center gap-3 text-[11px]">
                  <span className={`font-bold flex items-center gap-1 ${
                    executionResult.status === 'Accepted' ? 'text-emerald-400' :
                    executionResult.status === 'Wrong Answer' ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {executionResult.status === 'Accepted' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {executionResult.status}
                  </span>
                  {executionResult.executionTimeMs > 0 && (
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {executionResult.executionTimeMs} ms
                    </span>
                  )}
                </div>
              )}

              {activeTab === 'submission' && submissionResult && (
                <div className="flex items-center gap-3 text-[11px]">
                  <span className={`font-bold flex items-center gap-1 ${
                    submissionResult.status === 'ACCEPTED' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {submissionResult.status === 'ACCEPTED' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {submissionResult.status}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {submissionResult.executionTimeMs} ms
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    {(submissionResult.memoryKb / 1024).toFixed(1)} MB
                  </span>
                </div>
              )}
            </div>

            {/* Tab Body */}
            <div className="flex-1 p-3 overflow-y-auto font-mono text-xs">
              {activeTab === 'tests' && (
                executing ? (
                  <div className="flex items-center gap-2 text-slate-400 h-full justify-center">
                    <div className="w-4 h-4 border-2 border-blue-500/30 border-t-cyan-400 rounded-full animate-spin" />
                    <span>Compiling code and evaluating against test cases...</span>
                  </div>
                ) : executionResult ? (
                  <div className="space-y-2.5">
                    {/* Status Message */}
                    <div className={`p-2.5 rounded-lg border text-xs font-sans ${
                      executionResult.status === 'Accepted'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                        : executionResult.status === 'Wrong Answer'
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                        : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                    }`}>
                      <strong>{executionResult.status}:</strong> {executionResult.message}
                    </div>

                    {/* Compiler Error Block */}
                    {executionResult.compilerError && (
                      <div className="p-3 rounded-lg bg-navy-950 border border-rose-500/30 text-rose-400 font-mono text-[11px] whitespace-pre-wrap">
                        {executionResult.compilerError}
                      </div>
                    )}

                    {/* Test Case Cards */}
                    {executionResult.testCases && executionResult.testCases.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {executionResult.testCases.map((tc) => (
                          <div
                            key={tc.caseNumber}
                            className={`p-2.5 rounded-lg border ${
                              tc.passed
                                ? 'bg-navy-950 border-emerald-500/30 text-slate-200'
                                : 'bg-navy-950 border-rose-500/40 text-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-slate-400">Case {tc.caseNumber}:</span>
                              <span className={`font-bold flex items-center gap-1 ${
                                tc.passed ? 'text-emerald-400' : 'text-rose-400'
                              }`}>
                                {tc.passed ? 'Passed ✓' : 'Failed ✗'}
                              </span>
                            </div>
                            <div className="text-[10px] space-y-0.5">
                              <div><span className="text-slate-500">Input:</span> <span className="font-mono text-slate-300">{tc.input}</span></div>
                              <div><span className="text-slate-500">Expected:</span> <span className="font-mono text-emerald-400">{tc.expected}</span></div>
                              <div><span className="text-slate-500">Output:</span> <span className={`font-mono ${tc.passed ? 'text-emerald-400' : 'text-rose-400'}`}>{tc.actual}</span></div>
                              {tc.error && <div className="text-rose-400 pt-0.5">{tc.error}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-500">
                    <span>Click "Run Sample" to compile and execute your solution.</span>
                  </div>
                )
              )}

              {activeTab === 'submission' && (
                submitting ? (
                  <div className="flex items-center gap-2 text-slate-400 h-full justify-center">
                    <div className="w-4 h-4 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
                    <span>Executing full test suite against hidden inputs...</span>
                  </div>
                ) : submissionResult ? (
                  <div className="space-y-2.5">
                    <div className={`p-3 rounded-xl border flex items-center justify-between ${
                      submissionResult.status === 'ACCEPTED'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}>
                      <div className="flex items-center gap-2">
                        {submissionResult.status === 'ACCEPTED' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        <div>
                          <span className="font-bold block text-sm">{submissionResult.status}</span>
                          <span className="text-xs opacity-90">{submissionResult.message}</span>
                        </div>
                      </div>
                      <div className="text-right text-[11px] font-mono">
                        <div>Passed: <strong>{submissionResult.passedCount} / {submissionResult.totalCount}</strong></div>
                        <div>Time: <strong>{submissionResult.executionTimeMs} ms</strong></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-500">
                    <span>Click "Submit Code" to run the complete automated test suite.</span>
                  </div>
                )
              )}

              {activeTab === 'ai' && (
                aiLoading ? (
                  <div className="flex items-center gap-2 text-slate-400 h-full justify-center">
                    <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>AI Assistant is analyzing problem and code context...</span>
                  </div>
                ) : aiResponse ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-1 border-b border-navy-800 text-[11px]">
                      <span className="text-cyan-400 font-bold uppercase tracking-wider">{aiResponse.type} FEEDBACK</span>
                      <div className="text-slate-400 flex items-center gap-3">
                        <span>Time: <strong className="text-slate-200">{aiResponse.timeComplexity}</strong></span>
                        <span>Space: <strong className="text-slate-200">{aiResponse.spaceComplexity}</strong></span>
                      </div>
                    </div>
                    <div className="font-sans text-xs text-slate-200 whitespace-pre-line leading-relaxed p-2.5 rounded-lg bg-navy-950 border border-navy-800">
                      {aiResponse.response}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
                    <HelpCircle className="w-6 h-6 text-cyan-500/40" />
                    <span>Select "Hint", "Explain", or "Debug" to receive guidance.</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
