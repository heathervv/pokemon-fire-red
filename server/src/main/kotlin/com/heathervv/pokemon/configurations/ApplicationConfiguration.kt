package com.heathervv.pokemon.configurations

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate

@Configuration
class ApplicationConfiguration {

    @Bean
    fun restTemplate(): RestTemplate {
        return RestTemplate()
    }
}