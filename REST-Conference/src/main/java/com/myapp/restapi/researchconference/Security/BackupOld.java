//
//package com.myapp.restapi.researchconference.Security;
//
//import com.myapp.restapi.researchconference.Restservice.UserRestService;
//import org.apache.catalina.filters.CorsFilter;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.ProviderManager;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.Arrays;
//import java.util.List;
//
//public class BackupOld {
//
//    UserRestService userRestService;
//    BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    @Autowired
//    public BackupOld(UserRestService userRestService, BCryptPasswordEncoder bCryptPasswordEncoder) {
//        this.userRestService = userRestService;
//        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
//    }
//
//    @Bean
//    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//        httpSecurity.authorizeHttpRequests((request) ->
//                        request.requestMatchers("/**").permitAll()
//                                .anyRequest().authenticated())
//                .cors().configurationSource(corsConfigurationSource())
//                .and()
//                .csrf().disable()
//                .formLogin()
//                .loginProcessingUrl("/processLogin")
//        ;
//        return httpSecurity.build();
//    }
//
//    @Bean
//    AuthenticationManager authenticationManager(){
//        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
//        authenticationProvider.setUserDetailsService(userRestService);
//        authenticationProvider.setPasswordEncoder(bCryptPasswordEncoder);
//
//        return new ProviderManager(authenticationProvider);
//    }
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH"));
//        configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
//        configuration.addAllowedOrigin("*");
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//}