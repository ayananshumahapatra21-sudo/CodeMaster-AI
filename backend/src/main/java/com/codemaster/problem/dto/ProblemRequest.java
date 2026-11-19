package com.codemaster.problem.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.Map;

public class ProblemRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title cannot exceed 200 characters")
    private String title;

    private String slug;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Difficulty is required")
    private String difficulty;

    private String topic;
    private String constraints;
    private String acceptanceRate;
    private List<Map<String, String>> examples;
    private Map<String, String> starterTemplates;

    public ProblemRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getConstraints() { return constraints; }
    public void setConstraints(String constraints) { this.constraints = constraints; }

    public String getAcceptanceRate() { return acceptanceRate; }
    public void setAcceptanceRate(String acceptanceRate) { this.acceptanceRate = acceptanceRate; }

    public List<Map<String, String>> getExamples() { return examples; }
    public void setExamples(List<Map<String, String>> examples) { this.examples = examples; }

    public Map<String, String> getStarterTemplates() { return starterTemplates; }
    public void setStarterTemplates(Map<String, String> starterTemplates) { this.starterTemplates = starterTemplates; }
}
