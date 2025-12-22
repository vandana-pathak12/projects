const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
});
canvas.addEventListener("mousemove", draw);

function draw(e) {
    if (!drawing) return;

    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;
    const brush = document.getElementById("brush").value;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = size;

    if (brush === "round") {
        ctx.lineCap = "round";
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }

    else if (brush === "square") {
        ctx.lineCap = "square";
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }

    else if (brush === "dotted") {
        ctx.beginPath();
        ctx.arc(e.offsetX, e.offsetY, size / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    else if (brush === "spray") {
        for (let i = 0; i < 10; i++) {
            let x = e.offsetX + Math.random() * size - size / 2;
            let y = e.offsetY + Math.random() * size - size / 2;
            ctx.fillRect(x, y, 1, 1);
        }
    }

    else if (brush === "calligraphy") {
        ctx.save();
        ctx.translate(e.offsetX, e.offsetY);
        ctx.rotate(Math.PI / 6);
        ctx.fillRect(0, 0, size * 2, size / 2);
        ctx.restore();
    }

    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}