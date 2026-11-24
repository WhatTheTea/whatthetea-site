---
title: "Development of WhatTheMessenger" 
pubDate: 2026-11-24
tags: dotnet
---

Software development is decided to be solved by big tech now. It is a whole big discussion about where the 
actual overhead transfers to or if all of the hype is worth it. What we have as a fact is that building something from ground up is pretty easy now. I decided to do the strange thing these times - build something myself without outsorcing the fun to AI. (Not that I have a subscription anyway :P)

## Idea

Everything started back in the start of 2026, I was wondering about project to boost my modern full-stack web development skills
and after watching countless to-do apps or budget trackers (for which I even had a solution initialized) I was left with a feeling that this is just not the right topic I wanted to build on top of. I needed something universal for anything I could want to try, because the last such project, gratch, kind of failed me in that, being constrained to simple client-side logic. I wanted to build something that actually needed the scale, something that actually needed the backend and such. 

## Iteration 1

My first iteration is pretty visible at my activity log on github. It was mostly at the end of the February where I managed to do the base structure of the project with .NET backend and Blazor frontend. So technically, it was simpler back than and maybe development would have been easier that way, because of missing the necessity for some server logic like fetching users or something like that. I did everything kinda by instinct, clear architecture, services, views, etc. In some sense, there wasn't a lot of growth, as I did everything the way I used to.

## A burst for knowledge

There wasn't a lot of days spent in March on WhatTheMessenger, but it was sure important month for the whole direction of developemnt.
I decided that I want to learn Angular, and this messenger seemed as a perfect opportunity. That time I even had Blazor UI togglable so as much it could sound strange - it had two frontends at that point. It was a first signal for me that this project would be important not just in term of buzzwords, but for these sudden changes that happen not so often in the real world, you sure would like to be prepared for them. 
Then life happened, and I kind of forgot about this project and it was left with basic, maybe even incomplete messenger functionality.

## Small projects needs to be small

In September, after relocating and having a fresh grasp of air, I started to treat this project as an actual project. I understood that as for a simple chat app with 0.5 users it would be close to pointless to engineer a full-blown enterprise grade software here. I wanted to have a grasp of the web development and to have a playground for various tech, while keeping it from being absurd in this context. There was a moment when the actual scope was defined, some kind of kanban board in Obsidian was made and my code was tested with architecture redesign. While Clean Architecture was something I was already familiar with, I understood that the idea of Vertical Slices should greatly align with my goal. It was a smooth transition where I had something like composite of clean and sliced architetures (which was just having minimal APIs along typical Clean Architecture services for something more than fetching a user), but after some thoughts about how weird it seems - I decided to go with the Vertical Slices entirely. Also it was the moment where I finally removed that Blazor project, it would be funny to have it in the list of tech used for portfoooolio, but things come and go I guess :)

## What now?

Project is still in development, and would be there until I get bored with it I think? The key here is to maintain something that lives more than one iteration, more than one prompt and more than one snapshot of me with certain view on the world. It is more fun to do it that way. Is it better way? Not sure. Is it efficient way? Certainly nah. But it is fun.

## Whats next?

I already added some experiments with Grafana k6 tests into this repo and this is the direction I plan for this project further. I want to play with observability and scalability of the project and other things that are not just writing the code. The beginning is there: API is scalable and SignalR works even if the load is balanced and users are communicating via different API instances. I think you couldn't entirely substitute real experience with such projects, but you could sure help yourself at gaining it without extra pain in the future.
 