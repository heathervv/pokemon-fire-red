package com.heathervv.pokemon.api

import com.fasterxml.jackson.annotation.JsonProperty

data class PokemonBaseStatResponse(
        @JsonProperty("name")
        val name: String,

        @JsonProperty("value")
        val value: Int
)