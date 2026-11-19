package com.codemaster.ai.dto;

public class AiRequest {

    private Long problemId;
    private String problemTitle;
    private String language;
    private String code;
    private String query;

    public AiRequest() {}

    public Long getProblemId() { return problemId; }
    public void setProblemId(Long problemId) { this.problemId = problemId; }

    public String getProblemTitle() { return problemTitle; }
    public void setProblemTitle(String problemTitle) { this.problemTitle = problemTitle; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }
}
