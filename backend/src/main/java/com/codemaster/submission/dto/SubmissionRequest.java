package com.codemaster.submission.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SubmissionRequest {

    @NotNull(message = "Problem ID is required")
    private Long problemId;

    @NotBlank(message = "Language is required")
    private String language;

    @NotBlank(message = "Source code is required")
    private String sourceCode;

    public SubmissionRequest() {}

    public SubmissionRequest(Long problemId, String language, String sourceCode) {
        this.problemId = problemId;
        this.language = language;
        this.sourceCode = sourceCode;
    }

    public Long getProblemId() { return problemId; }
    public void setProblemId(Long problemId) { this.problemId = problemId; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getSourceCode() { return sourceCode; }
    public void setSourceCode(String sourceCode) { this.sourceCode = sourceCode; }
}
