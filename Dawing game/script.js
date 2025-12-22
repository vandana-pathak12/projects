const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let drawing = false;


canvas.addEventListener("mousedown", () => {
    drawing = true;
});


canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath(); 
});

canvas.addEventListener("mousemove", draw);

function draw(event) {
    if (!drawing) return;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
