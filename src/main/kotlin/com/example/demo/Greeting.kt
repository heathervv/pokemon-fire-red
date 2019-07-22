package com.example.demo

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class Greeting {

    @GetMapping("/greeting")
    fun index(): String {
        return "hi"
    }
}