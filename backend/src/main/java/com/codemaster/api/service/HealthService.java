package com.codemaster.api.service;

import com.codemaster.api.dto.DatabaseHealth;
import com.codemaster.api.dto.HealthResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringBootVersion;
import org.springframework.core.SpringVersion;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.lang.management.ManagementFactory;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class HealthService {

    private static final Logger logger = LoggerFactory.getLogger(HealthService.class);

    private final DataSource dataSource;

    @Value("${spring.application.name:codemaster-api}")
    private String applicationName;

    @Value("${spring.datasource.url:jdbc:postgresql://localhost:5432/codemaster_db}")
    private String configuredDatasourceUrl;

    public HealthService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public HealthResponse checkHealth() {
        DatabaseHealth databaseHealth = checkDatabaseConnection();
        String overallStatus = "CONNECTED".equalsIgnoreCase(databaseHealth.getStatus()) ? "UP" : "DEGRADED";

        Map<String, String> environment = new LinkedHashMap<>();
        environment.put("javaVersion", System.getProperty("java.version", "21"));
        environment.put("javaVendor", System.getProperty("java.vendor", "Unknown"));
        environment.put("springBootVersion", SpringBootVersion.getVersion());
        environment.put("springVersion", SpringVersion.getVersion());
        environment.put("osName", System.getProperty("os.name", "Windows"));
        environment.put("osArch", System.getProperty("os.arch", "amd64"));

        return new HealthResponse(
                overallStatus,
                applicationName,
                "1.0.0-SNAPSHOT",
                LocalDateTime.now(),
                getFormattedUptime(),
                environment,
                databaseHealth
        );
    }

    public DatabaseHealth checkDatabaseConnection() {
        long startTime = System.currentTimeMillis();
        String databaseName = extractDatabaseName(configuredDatasourceUrl);

        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            String productVersion = metaData.getDatabaseProductVersion();
            String dbUrl = metaData.getURL();

            // Run a verification query
            try (Statement statement = connection.createStatement();
                 ResultSet rs = statement.executeQuery("SELECT 1")) {
                if (rs.next()) {
                    long latency = System.currentTimeMillis() - startTime;
                    logger.debug("PostgreSQL connection verified in {} ms", latency);
                    return DatabaseHealth.connected(databaseName, dbUrl, productVersion, latency);
                }
            }
            long latency = System.currentTimeMillis() - startTime;
            return DatabaseHealth.connected(databaseName, dbUrl, productVersion, latency);

        } catch (Exception ex) {
            logger.warn("PostgreSQL health check failed for URL '{}': {}", configuredDatasourceUrl, ex.getMessage());
            return DatabaseHealth.disconnected(databaseName, configuredDatasourceUrl, ex.getMessage());
        }
    }

    private String getFormattedUptime() {
        long uptimeMs = ManagementFactory.getRuntimeMXBean().getUptime();
        Duration duration = Duration.ofMillis(uptimeMs);
        long hours = duration.toHours();
        long minutes = duration.toMinutesPart();
        long seconds = duration.toSecondsPart();

        if (hours > 0) {
            return String.format("%dh %dm %ds", hours, minutes, seconds);
        } else if (minutes > 0) {
            return String.format("%dm %ds", minutes, seconds);
        } else {
            return String.format("%ds", seconds);
        }
    }

    private String extractDatabaseName(String jdbcUrl) {
        if (jdbcUrl == null) {
            return "codemaster_db";
        }
        int slashIndex = jdbcUrl.lastIndexOf('/');
        if (slashIndex != -1 && slashIndex + 1 < jdbcUrl.length()) {
            String dbPart = jdbcUrl.substring(slashIndex + 1);
            int qIndex = dbPart.indexOf('?');
            return qIndex != -1 ? dbPart.substring(0, qIndex) : dbPart;
        }
        return "codemaster_db";
    }
}
