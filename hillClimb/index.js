// Set up the hill (pretty rudamentary -_-)
const hill = [];
for (let i = 0; i < 11; i++) hill.push([]);
const fillSquare = (x, y, width, height, tallNess) => {
    for (let i = x; i < x + width; i++) {
        for (let o = y; o < y + height; o++) {
            hill[i][o] = tallNess;
        }
    }
};
for (let i = 0; i < 6; i++) {
    fillSquare(i, i, hill.length - i * 2, hill.length - i * 2, i);
}
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

let worldState = {
    hill,
    agent: { x: 0, y: 0 }
};

// Agent can go in any direction
const options = [
    (worldState) => ({ ...worldState, agent: { ...worldState.agent, x: worldState.agent.x + 1 } }),
    (worldState) => ({ ...worldState, agent: { ...worldState.agent, x: worldState.agent.x - 1 } }),
    (worldState) => ({ ...worldState, agent: { ...worldState.agent, y: worldState.agent.y + 1 } }),
    (worldState) => ({ ...worldState, agent: { ...worldState.agent, y: worldState.agent.y - 1 } }),
]

const utilityFunction = (worldState) => {
    if (worldState.agent.x < 0 || worldState.agent.y < 0) {
        return -1;
    }
    return worldState.hill[worldState.agent.x][worldState.agent.y];
}

// Calculate best world state given utility function
const bestWorldState = (possibleWorldStates) => {
    let bestWorldState;
    let bestUtility;
    for (let worldState of possibleWorldStates) {
        const utility = utilityFunction(worldState);
        if (bestUtility === undefined || utility > bestUtility) {
            bestUtility = utility;
            bestWorldState = worldState;
        }
    }
    return bestWorldState;
};

setInterval(() => {
    worldState = bestWorldState(options.map(option => option(worldState)));
    context.fillStyle = "black";
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Draw hill
    for (let i = 0; i < hill.length; i++) {
        for (let o = 0; o < hill.length; o++) {
            const grade = hill[i][o];
            context.fillStyle = `rgba(0,0,0,${1 / grade}`;
            context.fillRect(i, o, 1, 1)
        }
    }
    // Draw agent
    context.fillStyle = "red";
    context.fillRect(worldState.agent.x, worldState.agent.y, 1, 1);
}, 500);