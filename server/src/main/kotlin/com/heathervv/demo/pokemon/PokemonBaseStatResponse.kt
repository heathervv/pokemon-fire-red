package com.heathervv.demo.pokemon

import com.fasterxml.jackson.annotation.JsonProperty

data class PokemonBaseStatResponse(
        @JsonProperty("name")
        val name: String,

        @JsonProperty("value")
        val value: Int
)