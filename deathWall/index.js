//
let worldState = {
    agent: { x: 1 },
    deathWall: { x: 0 }
};

const options = [
    (worldState) => ({ ...worldState, agent: { x: worldState.agent.x + 1 } }),
    (worldState) => ({ ...worldState, agent: { x: worldState.agent.x + 5 } }),
    (worldState) => ({ ...worldState, agent: { x: worldState.agent.x - 1 } }),
]
const utilityFunction = (worldState) => worldState.agent.x - worldState.deathWall.x;

// Calculate best world state
const bestWorldState = (possibleWorldStates) => {
    let bestWorldState;
    let bestUtility = 0;
    for (let worldState of possibleWorldStates) {
        const utility = utilityFunction(worldState);
        if (utility > bestUtility) {
            bestUtility = utility;
            bestWorldState = worldState;
        }
    }
    return bestWorldState;
};
setInterval(() => {
    worldState.deathWall.x++;
    worldState = bestWorldState(options.map(option => option(worldState)));
    document.getElementById("result").innerText = `Agent: ${worldState.agent.x}, Deathwall: ${worldState.deathWall.x}`;
}, 500);