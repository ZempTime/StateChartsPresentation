# Thinking in StateCharts

## Preparation
1) Determine your states.
2) Determine your events.
3) Consider the side effects which happen as a result of each event.

## Specification
1) Consider your transitions.
2) What does your starting state look like?
3) What happens when things break? When errors occur?

## Creation
1) Store everything you can inside state nodes
2) When you can't fit it in a state node, put it inside context
3) Finish building out your executable state machine before moving onto coding your UI component.