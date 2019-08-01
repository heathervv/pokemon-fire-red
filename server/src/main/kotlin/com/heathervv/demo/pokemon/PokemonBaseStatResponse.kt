package com.heathervv.demo

import com.fasterxml.jackson.annotation.JsonProperty

data class PokemonBaseStatResponse(
        @JsonProperty("name")
        val name: String,

        @JsonProperty("value")
        val value: Int
)