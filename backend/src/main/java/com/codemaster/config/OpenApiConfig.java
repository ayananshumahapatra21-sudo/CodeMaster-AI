package com.codemaster.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI codeMasterOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("CodeMaster AI REST API")
                        .description("Core RESTful API documentation for CodeMaster AI competitive programming platform.")
                        .version("1.0.0-SNAPSHOT")
                        .contact(new Contact()
                                .name("Ayananshu Mahapatra")
                                .email("ayananshu@example.com")
                                .url("https://github.com/ayananshumahapatra21-sudo/CodeMaster-AI"))
                        .license(new License().name("MIT License").url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Development Server")
                ));
    }
}
