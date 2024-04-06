// Get the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set initial pen properties
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let penColor = '#000';
let penSize = 3;

// Function to start drawing
function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

// Function to draw when mouse moves
function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = penColor;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = penSize;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

// Function to stop drawing
function stopDrawing() {
    isDrawing = false;
}

// Event listeners for mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
