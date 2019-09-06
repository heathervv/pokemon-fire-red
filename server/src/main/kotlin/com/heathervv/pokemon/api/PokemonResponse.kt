package com.heathervv.pokemon.api

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.JsonNode

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
        fun converter(response: JsonNode): PokemonResponse {

            val pokemonId = turnJsonNodeToInt(response.get("id"))
            val pokemonName = grabTextValueFromJsonNode(response.get("name"))
            val pokemonBaseXP = turnJsonNodeToInt(response.get("base_experience"))
            val pokemonSprite = grabTextValueFromJsonNode(response.get("sprites").get("front_default"))
            val pokemonTypes = sortedMapOf<Int, String>()
            val pokemonBaseStats = mutableListOf<PokemonBaseStatResponse>()
            val pokemonMoves = mutableListOf<PokemonMoveResponse>()

            response.get("types").forEach{ type ->
                val slot = turnJsonNodeToInt(type.get("slot"))
                val name = grabTextValueFromJsonNode(type.get("type").get("name"))

                pokemonTypes[slot] = name
            }

            response.get("stats").forEach{ stat ->
                val name = grabTextValueFromJsonNode(stat.get("stat").get("name"))
                val value = turnJsonNodeToInt(stat.get("base_stat"))

                pokemonBaseStats.add( PokemonBaseStatResponse(name, value) )
            }

            response.get("moves").forEach { move ->
                move.get("version_group_details").forEach { version ->
                    val gameVersion = "firered-leafgreen"
                    val moveLevelType = "level-up"

                    val versionName = grabTextValueFromJsonNode(version.get("version_group").get("name"))
                    val moveLearnedMethod = grabTextValueFromJsonNode(version.get("move_learn_method").get("name"))
                    val levelLearnedAt = turnJsonNodeToInt(version.get("level_learned_at"))

                    if (versionName == gameVersion && moveLearnedMethod == moveLevelType && levelLearnedAt == 1) {
                        val name = grabTextValueFromJsonNode(move.get("move").get("name"))
                        val url = grabTextValueFromJsonNode(move.get("move").get("url"))

                        pokemonMoves.add( PokemonMoveResponse(levelLearnedAt, name, url) )
                    }
                }
            }

            return PokemonResponse(pokemonId, pokemonName, pokemonBaseXP, pokemonSprite, pokemonTypes, pokemonBaseStats, pokemonMoves)
        }

        private fun grabTextValueFromJsonNode(field: JsonNode): String {
            return field.textValue()
        }

        private fun turnJsonNodeToInt(field: JsonNode): Int {
            val string = field.toString()

            return Integer.parseInt(string)
        }
    }
}