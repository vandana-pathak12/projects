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

        ctx.lineWidth = document.getElementById("size").value;
        ctx.strokeStyle = document.getElementById("color").value;
        ctx.lineCap = "round";

        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }