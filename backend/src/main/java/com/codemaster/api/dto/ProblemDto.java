package com.codemaster.api.dto;

import java.util.List;
import java.util.Map;

public class ProblemDto {
    private Long id;
    private String title;
    private String category;
    private String difficulty;
    private String acceptance;
    private String description;
    private List<String> constraints;
    private List<Map<String, String>> examples;
    private Map<String, String> starterCode;

    public ProblemDto() {}

    public ProblemDto(Long id, String title, String category, String difficulty, String acceptance, 
                      String description, List<String> constraints, List<Map<String, String>> examples, 
                      Map<String, String> starterCode) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.difficulty = difficulty;
        this.acceptance = acceptance;
        this.description = description;
        this.constraints = constraints;
        this.examples = examples;
        this.starterCode = starterCode;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getAcceptance() { return acceptance; }
    public void setAcceptance(String acceptance) { this.acceptance = acceptance; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getConstraints() { return constraints; }
    public void setConstraints(List<String> constraints) { this.constraints = constraints; }

    public List<Map<String, String>> getExamples() { return examples; }
    public void setExamples(List<Map<String, String>> examples) { this.examples = examples; }

    public Map<String, String> getStarterCode() { return starterCode; }
    public void setStarterCode(Map<String, String> starterCode) { this.starterCode = starterCode; }
}
