package com.costSimu.Api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.costSimu.Api.service.UserDetailsServiceImpl;


import jakarta.servlet.Filter;


@Configuration
@EnableMethodSecurity
public class SecurityConfig { 
	

  @Autowired
  private AuthEntryPointException unauthorizedHandler;
  
  //private JwtAuthEntryPoint authEntryPoint;
  private UserDetailsServiceImpl userDetailsService;
  
  @Autowired
  public SecurityConfig(UserDetailsServiceImpl userDetailsService) {
      this.userDetailsService = userDetailsService;      
  }

  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }
  
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }
  
  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
      DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
       
      authProvider.setUserDetailsService(this.userDetailsService);
      authProvider.setPasswordEncoder(passwordEncoder());
   
      return authProvider;
  }
 

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
  
  @SuppressWarnings("removal")
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	  System.out.println(http.toString());
      http.csrf(csrf -> csrf.disable())
          .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
          .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
          .authorizeHttpRequests(auth -> 
            auth.requestMatchers("/auth/register", "/auth/all", "/auth/login").permitAll()                          	
                .anyRequest().permitAll()
          );       
       http.authenticationProvider(authenticationProvider());
       http.addFilterBefore(authenticationJwtTokenFilter(), (Class<? extends Filter>) UsernamePasswordAuthenticationFilter.class);      	
    return http.build();
  }
}