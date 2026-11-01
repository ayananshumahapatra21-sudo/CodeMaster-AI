package com.codemaster.api.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class HealthResponse {

    private String status;
    private String application;
    private String version;
    private LocalDateTime timestamp;
    private String uptime;
    private Map<String, String> environment;
    private DatabaseHealth database;

    public HealthResponse() {
    }

    public HealthResponse(String status, String application, String version, LocalDateTime timestamp,
                          String uptime, Map<String, String> environment, DatabaseHealth database) {
        this.status = status;
        this.application = application;
        this.version = version;
        this.timestamp = timestamp;
        this.uptime = uptime;
        this.environment = environment;
        this.database = database;
    }

    // Getters and Setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getUptime() {
        return uptime;
    }

    public void setUptime(String uptime) {
        this.uptime = uptime;
    }

    public Map<String, String> getEnvironment() {
        return environment;
    }

    public void setEnvironment(Map<String, String> environment) {
        this.environment = environment;
    }

    public DatabaseHealth getDatabase() {
        return database;
    }

    public void setDatabase(DatabaseHealth database) {
        this.database = database;
    }
}
