package com.codemaster.problem.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class ProblemResponse {

    private Long id;
    private String title;
    private String slug;
    private String description;
    private String difficulty;
    private String constraints;
    private String acceptanceRate;
    private Set<String> topics;
    private List<Map<String, String>> sampleTestCases;
    private Map<String, String> starterTemplates;
    private LocalDateTime createdAt;

    public ProblemResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getConstraints() { return constraints; }
    public void setConstraints(String constraints) { this.constraints = constraints; }

    public String getAcceptanceRate() { return acceptanceRate; }
    public void setAcceptanceRate(String acceptanceRate) { this.acceptanceRate = acceptanceRate; }

    public Set<String> getTopics() { return topics; }
    public void setTopics(Set<String> topics) { this.topics = topics; }

    public List<Map<String, String>> getSampleTestCases() { return sampleTestCases; }
    public void setSampleTestCases(List<Map<String, String>> sampleTestCases) { this.sampleTestCases = sampleTestCases; }

    public Map<String, String> getStarterTemplates() { return starterTemplates; }
    public void setStarterTemplates(Map<String, String> starterTemplates) { this.starterTemplates = starterTemplates; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
