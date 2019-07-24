package com.heathervv.demo

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HealthCheckController {
    data class Response(val message: String)

    @GetMapping("/api/health-check", produces = ["application/json"])
    fun index(): Response {
        return Response("Up and running")
    }
}