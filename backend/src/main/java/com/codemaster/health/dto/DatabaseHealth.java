package com.codemaster.health.dto;

public class DatabaseHealth {

    private String status;
    private String type;
    private String databaseName;
    private String url;
    private String productVersion;
    private Long latencyMs;
    private String error;

    public DatabaseHealth() {}

    public static DatabaseHealth connected(String databaseName, String url, String productVersion, Long latencyMs) {
        DatabaseHealth health = new DatabaseHealth();
        health.setStatus("CONNECTED");
        health.setType("PostgreSQL");
        health.setDatabaseName(databaseName);
        health.setUrl(maskUrl(url));
        health.setProductVersion(productVersion);
        health.setLatencyMs(latencyMs);
        return health;
    }

    public static DatabaseHealth disconnected(String databaseName, String url, String error) {
        DatabaseHealth health = new DatabaseHealth();
        health.setStatus("DISCONNECTED");
        health.setType("PostgreSQL");
        health.setDatabaseName(databaseName);
        health.setUrl(maskUrl(url));
        health.setError(error);
        return health;
    }

    private static String maskUrl(String url) {
        if (url == null) return "jdbc:postgresql://localhost:5432/codemaster_db";
        return url.replaceAll("(?<=://)[^:]+:[^@]+@", "***:***@");
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDatabaseName() { return databaseName; }
    public void setDatabaseName(String databaseName) { this.databaseName = databaseName; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getProductVersion() { return productVersion; }
    public void setProductVersion(String productVersion) { this.productVersion = productVersion; }

    public Long getLatencyMs() { return latencyMs; }
    public void setLatencyMs(Long latencyMs) { this.latencyMs = latencyMs; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
}
