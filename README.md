# aiAgentTesting
Some examples of reward function based agents evaluating their actions on the world state
## What is this?
This is a small collection of AI agents acting on their world state
## Ok... What does that mean?
The world state is all the information in a simulated environment. An agent is an entity that acts in that world state, and predict what effect those actions will have, so as to choose the best action to take
## Ok....... How does it do that
With a reward/utility function. This is a function that takes in a world state and evaluates it in some way, returning a number

Whichever action that the agent can take that scores the best according to this function is the one that the agent will take

These examples are shown in this collection

- Simple deathwall avoidance (A utility function that prefers world states where the death wall is behind the agent)
- Hill climbing (A utility function that prefers world states where the agent is higher on a hill), as well as a variant with obstacles in the way
- Running away from the mouse while avoiding obstacles in it's way
