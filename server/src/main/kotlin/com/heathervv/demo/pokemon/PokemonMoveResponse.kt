package com.heathervv.demo

import com.fasterxml.jackson.annotation.JsonProperty

data class PokemonMoveResponse(
        @JsonProperty("levelLearnedAt")
        val levelLearnedAt: Int,

        @JsonProperty("name")
        val name: String,

        @JsonProperty("url")
        val url: String
)