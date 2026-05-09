---
title: My Favorite Thing I've Vibe Coded
date: 2026-04-04
description: A workout-tracker PWA I built with Claude Code, why it worked when other vibe-coding projects haven't, and what it taught me about scope and the cost of personal software.
draft: false
---

# My Favorite Thing I've Vibe Coded
For over a month I've been using a workout tracker Progressive Web App on my
phone to track my strength training routine, one that I made with Claude Code.
It's something I was considering making for awhile, but when I finally prompted
with the AI with a brief design description, I was amazed at how well the
prototype came out. I immediately was able to log my sets and reps for each
exercise and view progress over time.

Not all my vibe coding projects have been quick successes like this, so what
made this one different? A few things:
- It is intended only for me. No one else has to use it.
- I have been working out for years and understand what I want in terms of
  tracking well.
- The app itself is simple. It is essentially a custom calculator.

The key to designing the app was to start my tracking my workouts on a paper
notepad. I went into it being open to the possibility that that would be good
enough and that I wouldn't need to design an app. However, pretty soon I noticed
friction in having to jot the same exercise names down each time, how it was
annoying to have to flip pages back and forth to reference how many reps I had
done a previous workout, and most importantly there was no easy way to analyze
or visualize my progress.

[image of notebook]

Based on these observations, I created the first version of the app. The
problems of having to write exercises each time and look back and forth between
different workout sessions was solved. I also did have a way to visualize
progress, even if there were some problems with that. More on that in a bit.

I ran into the first and really only major bug within the first couple weeks of
using it. I had decided to make some cosmetic changes to the app and had pushed
them to the Github repo where the app was being generated from via GitHub Pages.
When I went to refresh the app on my phone, I noticed my previous saved workout
sessions were gone.

What happened was related to how the data was being cached. Claude code designed
the app to be local first, meaning that the assets were stored on my phone. That
makes it fast and available offline, but in this case it also meant it wasn't
serving the latest version of the app. When I did install the latest version, it
didn't have my previous entries on the previous app. 

The solution involved essentially adding some code so that made the app check
for the latest updates but also told it that an update doesn't mean a fresh
    install, so don't get rid of the existing data. 

Ater that, I haven't encountered any more real issues, just gaps that I've
slowly added features to address. Something that I learned to appreciate about a
paper notebook after starting on the app was the flexibility. Things like
changing the order of the exercises, adding a new exercise mid workout, changing
weight mid-set: all very easy with pen and paper, but things that require real
feature updates with the app.

Claude Code does make it easier to iterate and make these improvements, but it
does still take work. The rhythm I've gotten into is making notes of things I
want to improve during workouts and then at the end of the month talk with
Claude about them and see which ones make sense and are feasible. 

A good example is tracking progress. For exercises like pull-ups and push-ups
which are just rep based, it's easy to create a linear graph showing progress.
But when you add weighted exercises it gets more complicated. Adding more weight
can seem like a setback if you're just looking at reps because you'll go from 12
reps to 6 even if you're lifting 20 more pounds. My solution was to calculate volume (reps x weight) and track that as a single
metric. 

In conclusion, for me vibe coding has done well with this workout tracker
because the use case is limited in scope and not too demanding, it's something
very personal to me and I understand my preferences well, and the data is all
local with no real dependencies. 

However, even if Claude Code makes it easier to adjust, it does still take work
to maintain. Even if I have other simple problems that have similar scope that I
could solve with vibe coding, at what point does the collective maintenance cost
become overbearing? That's where I feel like ideas like malleable software come
into play. If there was an existing workout app that I could customize more to
my preferences, I wouldn't have had to design one from scratch on my own.

But for now anyway, I've enjoyed the process of working on this app and learning
about Javascript more, and importantly it has made working out easier and better
for me.
