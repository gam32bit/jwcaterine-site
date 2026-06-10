---
title: First Thoughts on Art of Unix Programming
date: 2026-03-28
description: How coding with Claude made me want to learn the Unix Philosophy
draft: false
---

Source: [The Art of Unix Programming](http://www.catb.org/esr/writings/taoup/html/index.html)

I've spent the past few months of playing around with Claude Code to build CLI tools for my own personal use. Inevitably, these tools have gotten messy. I'll think of small features I want to add over time, and at some point it becomes unclear what the tool is even for.

The first tool I wrote was something to help me maintain a journal. It started
off as just a shell script to create a markdown file with a basic template and
save it to a journal entries folder. But it didn't take long for me to write
scripts to produce a weekly review of my entries, then a monthly review, and
eventually I also added planning templates, etc.

The resulting disorientation from programming without a plan is what drew me to
the Art of Unix Programming. I was vaguely familiar with the Unix philosophy
that a program should do one simple thing well, but I didn't know much beyond
that.

I'm not that far into the book and already I'm getting a better understanding of
why this philosophy appeals to me. 

## What Unix Gets Wrong

This section of the book is where things started to resonate with me,
specifically this quote from Doug McIlroy:

> This tenet was firmly established at Bell Labs by Dick Hamming[5] who insisted in the 1950s when computers were rare and expensive, that open-shop computing, where customers wrote their own programs, was imperative, because “it is better to solve the right problem the wrong way than the wrong problem the right way”.

This quote helps explain why I started using the command line last summer. I had
an intuition that I could solve my own problems better than third-party apps
could. 

However, I've certainly learned to appreciate the limits of my own knowledge,
and I don't interpret this quote as meaning that people should write their own
programs alone. People collaborating to solve problems where they all share
domain knowledge is maybe the truest expression of this idea.

## Mechanism Not Policy

The book mentions how the Unix philosophy's approach of focusing on the
underlying capabilitis of a system instead of the "policy" layer on top (how
it's presented, what's allowed, etc.) partly explains its continuing relevance. The tradeoff is that learning the mechanics does require time and effort, and
this has proven a barrier to universal adoption. 

I don't think that AI tools have made it easier to understand the Art of Unix
Programming (I mean the concept more than the book here), as in I'm actually
reading the book and not asking AI to summarize it for me. But I do think that
without AI, I may have been too intimidated to jump into the command line and
Linux world, or I may not have had enough time to clear those first hurdles.

The reason I'm interested in learning this art now is because of the roadblocks
I've run into using AI to write my own scripts. This lands me somewhere in
between the two polarized views nowadays: on the one hand that AI is going to
make everyone a programmer and on the other hand that AI only produces sloppy
code that cannot come close to replacing real programming.

In my opinion, it's hard to argue that AI does not lower the barrier for people
to get into programming, Linux, etc. At the same time, AI cannot replace the
work of learning the culture tied to these things, which as the authors of the
book state can be even more important than technical knowledge when it comes to
solving problems.
