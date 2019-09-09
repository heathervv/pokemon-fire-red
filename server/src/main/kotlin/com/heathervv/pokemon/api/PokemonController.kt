package com.heathervv.pokemon.api

import org.springframework.web.bind.annotation.*

// TODO cache pokeApi responses

@RestController
class PokemonController(private val client: PokemonApiClient) {

    @GetMapping("/api/pokemon/starter", produces = ["application/json"])
    fun starter(@RequestHeader("User-Agent") userAgent: String): List<PokemonResponse> {

        val starters = listOf(Pokedex.BULBASAUR.id, Pokedex.CHARMANDER.id, Pokedex.SQUIRTLE.id)

        return starters.map { id ->
            client.getPokemon(userAgent, id)
        }
    }

    @PostMapping("/api/pokemon/starter", produces = ["application/json"])
    fun chooseStarter(@RequestBody starter: String): String {

        // TODO store chosen starter in DB or something
        return starter
    }
}