package com.projeto_pin2_dsw.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BackendApplication {

    @Autowired
    private SessionInterceptor sessionInterceptor;
    
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer configCORS() {
        return new WebMvcConfigurer() {
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedOrigins("http://localhost:5173/")
                        .allowedHeaders("*" /*"Content-Type", "SessionId", "Sessionid", "Username", "Password", "Teste", "Authorization"*/)
                        ;
            }
            
            public void addInterceptors(InterceptorRegistry registry) {
                registry.addInterceptor(sessionInterceptor).addPathPatterns("/**").excludePathPatterns("/users/login");;
            }
            
        };
    }

}
