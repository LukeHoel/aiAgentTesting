
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

let worldState = {
    mouse: { x: 0, y: 0 },
    agent: { x: 25, y: 25 }
};

const enemies = [];
for (let i = 0; i < 50; i++) {
    for (let o = 0; o < 50; o++) {
        if (i % 4 === 0 && Math.random() > .5) {
            enemies.push({ x: i, y: o });
        }
    }
}

const setMousePosition = (event) => {
    worldState.mouse = { x: event.clientX / 10, y: event.clientY / 10 };
}

// Agent can go in any direction
const options = [
    (worldState) => ({ ...worldState, agent: { ...worldState.agent, x: worldState.agent.x + 1 } }),
    (worldState) => ({ ...worldState, agent: { ...worldState.agent, x: worldState.agent.x - 1 } }),
    (worldState) => ({ ...worldState, agent: { ...worldState.agent, y: worldState.agent.y + 1 } }),
    (worldState) => ({ ...worldState, agent: { ...worldState.agent, y: worldState.agent.y - 1 } }),
]

const utilityFunction = (worldState) => {
    if (worldState.agent.x < 0 || worldState.agent.y < 0 || worldState.agent.x > 50 || worldState.agent.y > 50
        || (enemies.find(enemy => enemy.x === worldState.agent.x && enemy.y === worldState.agent.y))
    ) {
        return -1;
    }
    return Math.max(Math.abs(worldState.agent.x - worldState.mouse.x), Math.abs(worldState.agent.y - worldState.mouse.y));
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
    // Draw enemies
    context.fillStyle = "blue";
    for (let i = 0; i < enemies.length; i++) {
        context.fillRect(enemies[i].x, enemies[i].y, 1, 1);
    }
    // Draw agent
    context.fillStyle = "red";
    context.fillRect(worldState.agent.x, worldState.agent.y, 1, 1);
    // Draw mouse
    context.fillStyle = "orange";
    context.fillRect(worldState.mouse.x, worldState.mouse.y, 1, 1);
}, 100);