package com.weddinginvitation;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")           // Adjust this path to your actual API paths
                .allowedOrigins("http://localhost:3000")  // Allow frontend to communicate with backend
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed HTTP methods
                .allowedHeaders("*")               // Allow all headers
                .allowCredentials(true);           // Allow credentials (cookies, sessions)
    }
}
