package com.heathervv.demo

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RestController

//TODO store national pokedex ids in enum
//TODO cache pokeApi responses

@RestController
class PokemonController(private val client: PokemonApiClient) {

    @GetMapping("/api/pokemon/starter", produces = ["application/json"])
    fun starter(@RequestHeader("User-Agent") userAgent: String):List<PokemonResponse> {
        val bulbasaur = client.getPokemon(userAgent, 1)
        val charmander = client.getPokemon(userAgent, 4)
        val squirtle = client.getPokemon(userAgent, 7)

        return listOf(bulbasaur, charmander, squirtle)
    }
}