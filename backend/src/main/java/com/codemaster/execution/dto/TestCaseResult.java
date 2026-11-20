package com.codemaster.execution.dto;

public class TestCaseResult {

    private int caseNumber;
    private String input;
    private String expected;
    private String actual;
    private boolean passed;
    private String error;

    public TestCaseResult() {}

    public TestCaseResult(int caseNumber, String input, String expected, String actual, boolean passed, String error) {
        this.caseNumber = caseNumber;
        this.input = input;
        this.expected = expected;
        this.actual = actual;
        this.passed = passed;
        this.error = error;
    }

    public int getCaseNumber() { return caseNumber; }
    public void setCaseNumber(int caseNumber) { this.caseNumber = caseNumber; }

    public String getInput() { return input; }
    public void setInput(String input) { this.input = input; }

    public String getExpected() { return expected; }
    public void setExpected(String expected) { this.expected = expected; }

    public String getActual() { return actual; }
    public void setActual(String actual) { this.actual = actual; }

    public boolean isPassed() { return passed; }
    public void setPassed(boolean passed) { this.passed = passed; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
}
