package com.codemaster.problem.dto;

import java.util.List;
import java.util.Map;

public class ProblemDto {

    private Long id;
    private String title;
    private String topic;
    private String difficulty;
    private String acceptance;
    private String description;
    private List<String> constraints;
    private List<Map<String, String>> examples;
    private Map<String, String> starterTemplates;

    public ProblemDto() {}

    public ProblemDto(Long id, String title, String topic, String difficulty, String acceptance,
                      String description, List<String> constraints,
                      List<Map<String, String>> examples, Map<String, String> starterTemplates) {
        this.id = id;
        this.title = title;
        this.topic = topic;
        this.difficulty = difficulty;
        this.acceptance = acceptance;
        this.description = description;
        this.constraints = constraints;
        this.examples = examples;
        this.starterTemplates = starterTemplates;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

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

    public Map<String, String> getStarterTemplates() { return starterTemplates; }
    public void setStarterTemplates(Map<String, String> starterTemplates) { this.starterTemplates = starterTemplates; }
}
