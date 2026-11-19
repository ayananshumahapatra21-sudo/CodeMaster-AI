package com.codemaster.ai.dto;

public class AiResponse {

    private String type; // HINT, EXPLAIN, DEBUG
    private String response;
    private String timeComplexity;
    private String spaceComplexity;

    public AiResponse() {}

    public AiResponse(String type, String response, String timeComplexity, String spaceComplexity) {
        this.type = type;
        this.response = response;
        this.timeComplexity = timeComplexity;
        this.spaceComplexity = spaceComplexity;
    }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }

    public String getTimeComplexity() { return timeComplexity; }
    public void setTimeComplexity(String timeComplexity) { this.timeComplexity = timeComplexity; }

    public String getSpaceComplexity() { return spaceComplexity; }
    public void setSpaceComplexity(String spaceComplexity) { this.spaceComplexity = spaceComplexity; }
}
