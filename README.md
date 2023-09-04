# Airport Connectivity Optimization (Project Zoom)

![Zoom White](https://github.com/mtohernandez/project-zoom/assets/67434849/53d0c7b3-3ed4-4adb-b6df-287397d97dad)

## Abstract
This article addresses the problem of finding the minimum additional flight connections required to ensure connectivity between airports in a network, considering passengers' willingness to take multiple connecting flights. The approach combines Depth-First Search (DFS) and Kosaraju’s algorithm to identify strongly connected components in the directed graph representing airport connections. Unlike conventional DFS, this method effectively handles cases where not all vertices are in the same strongly connected component. This work provides a valuable solution for optimizing airport connectivity problems, which have applications in network analysis, route planning, and system connectivity analysis.

## 1. Introduction
In the context of this problem, we were given a list of airports and a list of one-way flight connections between airports. Each airport is represented by a three-letter code. We are also given a specific starting airport that you want to use as a hub to connect to other airports. The goal is to find the minimum number of additional flight connections needed to ensure that all airports can be reached from the starting airport. Keeping in mind that passengers are willing to take multiple connecting flights to reach their destination, meaning, it’s even possible to take 5 or 6 flight connections to reach their desired destination.

## 2. Summarized Solution
To summarize, it is necessary to implement DFS in connection with Kosaraju’s algorithm to find the strongly connected components in the directed graph by the airport connection, then, compress these components into single node to create a new compressed graph and after that calculate the in-degree of the nodes in the new graph to find the nodes with in-degree zero, making sure the starting point airport is connected to them and finding the minimum number of connections.

## Capture

![Capture](https://github.com/mtohernandez/project-zoom/assets/67434849/ab0be2b0-4d42-4bdc-b99f-1b26edf56b41)

## Libraries used
- react-force-graph
- reatjs-popup

This is saved as a Riddle Interactive Project @ Public Use.
