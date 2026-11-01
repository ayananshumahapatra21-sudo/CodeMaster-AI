package com.codemaster.api.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class DatabaseHealth {

    private String status;
    private String type;
    private String databaseName;
    private String url;
    private String version;
    private Long responseTimeMs;
    private String error;

    public DatabaseHealth() {
    }

    public DatabaseHealth(String status, String type, String databaseName, String url, String version, Long responseTimeMs, String error) {
        this.status = status;
        this.type = type;
        this.databaseName = databaseName;
        this.url = url;
        this.version = version;
        this.responseTimeMs = responseTimeMs;
        this.error = error;
    }

    public static DatabaseHealth connected(String databaseName, String url, String version, long responseTimeMs) {
        return new DatabaseHealth("CONNECTED", "PostgreSQL", databaseName, url, version, responseTimeMs, null);
    }

    public static DatabaseHealth disconnected(String databaseName, String url, String error) {
        return new DatabaseHealth("DISCONNECTED", "PostgreSQL", databaseName, url, null, null, error);
    }

    // Getters and Setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Long getResponseTimeMs() {
        return responseTimeMs;
    }

    public void setResponseTimeMs(Long responseTimeMs) {
        this.responseTimeMs = responseTimeMs;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
