// Initialize canvas
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player object
var player = {
    x: 50,
    y: canvas.height - 50,
    width: 30,
    height: 30,
    speed: 5,
    jumpPower: 10,
    gravity: 0.5,
    isJumping: false,
};

// Platforms
var platforms = [];
platforms.push({ x: 0, y: canvas.height - 20, width: canvas.width, height: 20 });

// Game loop
function gameLoop() {
    clearCanvas();

    movePlayer();
    drawPlayer();

    drawPlatforms();

    requestAnimationFrame(gameLoop);
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Move the player
function movePlayer() {
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
    if (keys.ArrowUp && !player.isJumping) {
        player.y -= player.jumpPower;
        player.isJumping = true;
    }

    // Apply gravity
    player.y += player.gravity;

    // Check for collisions with platforms
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];

        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height >= platform.y &&
            player.y < platform.y) {
            player.y = platform.y - player.height;
            player.isJumping = false;
            player.gravity = 0;
        } else {
            player.gravity = 0.5;
        }
    }
}

// Draw the player
function drawPlayer() {
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw platforms
function drawPlatforms() {
    ctx.fillStyle = "green";
    for (var i = 0; i < platforms.length; i++) {
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}

// Keyboard input
var keys = {};
document.addEventListener("keydown", function (e) {
    keys[e.key] = true;
    // Toggle fullscreen mode when pressing 'F'
    if (e.key === "F" || e.key === "f") {
        toggleFullScreen();
    }
});

document.addEventListener("keyup", function (e) {
    keys[e.key] = false;
});

// Toggle fullscreen mode
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch((err) => {
            console.log(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Start the game loop
gameLoop();
