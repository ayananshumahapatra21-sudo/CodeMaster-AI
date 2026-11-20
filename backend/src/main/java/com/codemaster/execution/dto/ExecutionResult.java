package com.codemaster.execution.dto;

import java.util.ArrayList;
import java.util.List;

public class ExecutionResult {

    private String status; // Accepted, Wrong Answer, Compilation Error, Runtime Error, Time Limit Exceeded
    private String message;
    private int passedCount;
    private int totalCount;
    private long executionTimeMs;
    private long memoryKb;
    private String compilerError;
    private List<TestCaseResult> testCases = new ArrayList<>();

    public ExecutionResult() {}

    public static ExecutionResult compilationError(String error, String message) {
        ExecutionResult r = new ExecutionResult();
        r.setStatus("Compilation Error");
        r.setMessage(message != null ? message : "Compilation failed. Check syntax and declarations.");
        r.setCompilerError(error);
        r.setPassedCount(0);
        r.setTotalCount(0);
        return r;
    }

    public static ExecutionResult runtimeError(String error, long timeMs) {
        ExecutionResult r = new ExecutionResult();
        r.setStatus("Runtime Error");
        r.setMessage(error);
        r.setExecutionTimeMs(timeMs);
        r.setPassedCount(0);
        return r;
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public int getPassedCount() { return passedCount; }
    public void setPassedCount(int passedCount) { this.passedCount = passedCount; }

    public int getTotalCount() { return totalCount; }
    public void setTotalCount(int totalCount) { this.totalCount = totalCount; }

    public long getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(long executionTimeMs) { this.executionTimeMs = executionTimeMs; }

    public long getMemoryKb() { return memoryKb; }
    public void setMemoryKb(long memoryKb) { this.memoryKb = memoryKb; }

    public String getCompilerError() { return compilerError; }
    public void setCompilerError(String compilerError) { this.compilerError = compilerError; }

    public List<TestCaseResult> getTestCases() { return testCases; }
    public void setTestCases(List<TestCaseResult> testCases) { this.testCases = testCases; }
}
