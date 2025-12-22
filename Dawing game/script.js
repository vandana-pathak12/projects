const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
    ctx.globalCompositeOperation = "source-over"; // back to normal
});
canvas.addEventListener("mousemove", draw);

function draw(e) {
    if (!drawing) return;

    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;
    const tool = document.getElementById("tool").value;

    ctx.lineWidth = size;
    ctx.lineCap = "round";

    // 🔹 ERASER MODE
    if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }

    // 🔹 BRUSH MODES
    else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        if (tool === "round") {
            ctx.lineCap = "round";
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }

        else if (tool === "square") {
            ctx.lineCap = "square";
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }

        else if (tool === "dotted") {
            ctx.beginPath();
            ctx.arc(e.offsetX, e.offsetY, size / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        else if (tool === "spray") {
            for (let i = 0; i < 15; i++) {
                let x = e.offsetX + Math.random() * size - size / 2;
                let y = e.offsetY + Math.random() * size - size / 2;
                ctx.fillRect(x, y, 1, 1);
            }
        }

        else if (tool === "calligraphy") {
            ctx.save();
            ctx.translate(e.offsetX, e.offsetY);
            ctx.rotate(Math.PI / 6);
            ctx.fillRect(0, 0, size * 2, size / 2);
            ctx.restore();
        }
    }

    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}