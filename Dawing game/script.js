const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let drawing = false;
    let mode = "brush"; // brush or eraser

    canvas.addEventListener("mousedown", () => drawing = true);
    canvas.addEventListener("mouseup", () => {
        drawing = false;
        ctx.beginPath();
    });
    canvas.addEventListener("mousemove", draw);

    function draw(e) {
        if (!drawing) return;

        ctx.lineWidth = document.getElementById("size").value;
        ctx.lineCap = "round";

        if (mode === "eraser") {
            ctx.strokeStyle = "white";
        } else {
            ctx.strokeStyle = document.getElementById("color").value;
        }

        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }

    function setBrush() {
        mode = "brush";
    }

    function setEraser() {
        mode = "eraser";
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveImage() {
        const link = document.createElement("a");
        link.download = "drawing.png";
        link.href = canvas.toDataURL();
        link.click();
    }