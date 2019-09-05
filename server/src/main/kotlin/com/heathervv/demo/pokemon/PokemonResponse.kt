package com.heathervv.demo.pokemon

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.JsonNode

//TODO clean up all the vals to be less gross
data class PokemonResponse(
    @JsonProperty("id")
    val id: Int,

    @JsonProperty("name")
    val name: String,

    @JsonProperty("baseXP")
    val baseXP: Int,

    @JsonProperty("sprite")
    val sprite: String,

    @JsonProperty("types")
    val types: Map<Int, String>,

    @JsonProperty("baseStats")
    val baseStats: List<PokemonBaseStatResponse>,

    @JsonProperty("moves")
    val moves: List<PokemonMoveResponse>
) {
    companion object {
        private val gameVersion = "firered-leafgreen"
        private val moveLevelType = "level-up"

        fun converter(response: JsonNode): PokemonResponse {
            val id = Integer.parseInt(response.get("id").toString())
            val name = response.get("name").textValue()
            val baseXP = Integer.parseInt(response.get("base_experience").toString())
            val sprite = response.get("sprites").get("front_default").textValue()

            val types = sortedMapOf<Int, String>()
            response.get("types").forEach{ type ->
                val slot = Integer.parseInt(type.get("slot").toString())
                val typeName = type.get("type").get("name").textValue()

                types[slot] = typeName
            }

            val baseStats = mutableListOf<PokemonBaseStatResponse>()
            response.get("stats").forEach{ stat ->
                val statName = stat.get("stat").get("name").textValue()
                val value = Integer.parseInt(stat.get("base_stat").toString())

                baseStats.add(
                        PokemonBaseStatResponse(statName, value)
                )
            }

            val moves = mutableListOf<PokemonMoveResponse>()
            response.get("moves").forEach { move ->
                move.get("version_group_details").forEach { version ->
                    val versionName = version.get("version_group").get("name").textValue()
                    val moveLearnedMethod = version.get("move_learn_method").get("name").textValue()
                    val levelLearnedAt = Integer.parseInt(version.get("level_learned_at").toString())

                    if (
                        versionName == gameVersion
                        && moveLearnedMethod == moveLevelType
                        && levelLearnedAt == 1
                    ) {
                        val moveName = move.get("move").get("name").textValue()
                        val url = move.get("move").get("url").textValue()

                        moves.add(
                                PokemonMoveResponse(levelLearnedAt, moveName, url)
                        )
                    }
                }
            }

            return PokemonResponse(id, name, baseXP, sprite, types, baseStats, moves)
        }
    }
}