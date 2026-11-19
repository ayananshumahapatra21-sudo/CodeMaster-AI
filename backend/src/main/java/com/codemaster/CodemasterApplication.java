package com.codemaster;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CodemasterApplication {

    private static final Logger logger = LoggerFactory.getLogger(CodemasterApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(CodemasterApplication.class, args);
        logger.info("==================================================================");
        logger.info("  CodeMaster AI - Spring Boot API Server Started Successfully!    ");
        logger.info("  Health Telemetry: http://localhost:8080/api/health              ");
        logger.info("  Swagger OpenAPI:  http://localhost:8080/swagger-ui.html         ");
        logger.info("==================================================================");
    }
}
