package com.heathervv.demo.pokemon

import com.fasterxml.jackson.databind.JsonNode
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate

@Component
class PokemonApiClient(
    private val restTemplate: RestTemplate
) {

    fun getPokemon(
            userAgent: String,
            id: Int
      ): PokemonResponse {
        val url = "https://pokeapi.co/api/v2/pokemon/$id"
        val headers = HttpHeaders()

        headers.set("User-Agent", userAgent)
        headers.set("Accept", "application/json")

        val request = restTemplate.exchange(url, HttpMethod.GET, HttpEntity<String>(headers), JsonNode::class.java)

        return PokemonResponse.converter(request.body)
    }
}