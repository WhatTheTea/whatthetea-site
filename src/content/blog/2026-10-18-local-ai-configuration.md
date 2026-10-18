---
title: "Local AI Configuration" 
pubDate: 2026-10-18
tags: ai
---

In my [previous post](./2026-09-22-local-ai-autocomplete.md) I successfully configured simple autocomplete for my VS Code
setup. The base configuration I got and functionality of the Continue VS Code extension gave the inspiration to
continue efforts on hosting my own development helpers. Meanwhile, I am also developing a simple chat web app - 
[WhatTheMessenger](https://github.com/WhatTheTea/WhatTheMessenger). It gives me the opportunity to test the actual 
usability of my setup by telling the model to do refactorings or to write a test suite.

## Autocomplete

While I was content with the fact autocomplete worked, I started to feel that it is frequently gives me suboptimal 
latency from finishing the writing to actual result. To verify my fellings, I decided to configure a higher time out
value in Continue and started to get more outputs from the model than before, with a tradeoff of speed of course. 

The UX of autocomplete which drops most of its outputs due to timeouts was not very pleasant, so I started to experiment
with various configuration options of llama-cpp. Let's breakdown the result of my findings parameter by parameter:
```pwsh
llama-server -m D:\ai-models\qwen2.5-coder-1.5b-q5_k_m.gguf --port 8001 -c 4096 -fa on -ctk q8_0 -ctv q8_0 -np 2 -ngl 99
```

| param | value | description |
|-|-|-|
| -c | 4096 | 4K of context is a sweet spot between my hardware constraints and useful amount of context for autocomplete |
| -fa | on | Enables Flash Attention reduce KV cache memory usage |
| -ctk and -ctv | q8_0 | Quantization of keys and values to reduce memory usage and increase throughput |
| -np | 1 | Limits parallel processing slots to 1 so I could get more frequent cache hits and less memory wasted |
| -ngl | 99 | Forces to offload all of the layers to GPU (In reality its 28 + 1 output layer, but 99 here is rude way to say "all of them" :P) |

This way I got much better throughput and better UX from my self hosted autocomplete model.

| config | evaluation speed | inference speed |  
| - | - | - |
| old | 35.9 - 134.1 t/s | 53.9 - 69.8 t/s |  
| new | 126.4 - 157.3 t/s | 67.0 - 73.8 t/s |

## Chat mode

After getting better throughput I decided to try a model capable of chat mode. For this I had to install a new model. 
I found out via [ApXml VRAM Calculator](https://apxml.com/tools/vram-calculator) that theoretically my hardware could run 
Qwen3.5 with 4B parameters and Q4_K_M quantization. But I lost track of one important limitations this hardware had:
My Intel Core i7 has HF suffix, F means that it lacks integrated graphics, 
and the system must utilize my discrete GPU. Which constraints me not to whole 4GB of VRAM but to effectively 3GB. 
Thus, while I got it to run on this hardware, 
I had to offload some layers of Qwen3.5 to the CPU. This way I was able to get maximum of 16 t/s instead of 5t/s.
While this speed was somewhat acceptable, it was far from comfortable speeds I used to get from web chatbots.

But I was still curious with the idea of completely self hosting the chatbot. So I borrowed a laptop from my 
wife with much better hardware, let's review the specs:

| CPU | RAM | GPU | VRAM
|-|-|-|-|
AMD Ryzen 5 240 | 16 GB | NVIDIA GeForce RTX 4050 | 6 GB

These specs allow me to enter the ~10B parameters zone, so lets see how it goes.
I started with setup from my laptop: **Qwen 3.5 4B Q4_K_M** with Q8 KV quantization and results were out of this 
world comparing to my laptop. I was able to get 380 t/s of evaluation speed and 48 t/s of inference speed. Plus, because there was no so strict memory constraints, I was able to give the freedom for llama-server to decide how much context to use, which appeared to be 26k tokens per one of the two context slots.
I think inference speed may drop a bit with more context, but I am pleased with the ability of this setup to be 
able to substitute the web based chat models without such dramatic performance loss as on my hardware.

After this "benchmark" I was curious to try more than 4B models, so I tried to run **Qwen 3.5 4B Q4_K_M**.
I was able to get 470 t/s of eval speed and ~31 t/s of inference speed. While it is not as fast as 4B,  it was still impressive for me how fast it is, but not without tradeoffs of course. While the speed was plausible, the 4k of context usually end up filled after several follow ups or more complex tasks than writing a C# calculator or a test case.

## Conclusions

So with this data I gathered running models both on my and my wife's laptops I will stick with using Qwen 4B model for chat running on my wife's laptop and Qwen 1.5B running for autocomplete locally. After some research I even found
a collection of distilled models, so this way I am using so-called Qwopus model right now. I think its a whole different topic to compare it with the base one, but for now I will believe the benchmarks and comparisons other have made.