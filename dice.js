const canvas = document.getElementById('diceCanvas');
    const ctx = canvas.getContext('2d');
    function drawDots(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    function drawDice(number) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 50, 100, 100);
        ctx.fillStyle = 'black';
        switch (number) {
            case 1:
                drawDots(100, 100);
                break;
            case 2:
                drawDots(75, 75);
                drawDots(125, 125);
                break;
            case 3:
                drawDots(75, 75);
                drawDots(100, 100);
                drawDots(125, 125);
                break;
            case 4:
                drawDots(75, 75);
                drawDots(125, 75);
                drawDots(75, 125);
                drawDots(125, 125);
                break;
            case 5:
                drawDots(75, 75);
                drawDots(125, 75);
                drawDots(100, 100);
                drawDots(75, 125);
                drawDots(125, 125);
                break;
            case 6:
                drawDots(75, 75);
                drawDots(125, 75);
                drawDots(75, 100);
                drawDots(125, 100);
                drawDots(75, 125);
                drawDots(125, 125);
                break;
        }
    }

    function handleKeyPress(event) {
        if (event.code === 'Space') {
            const randomNumber = Math.floor(Math.random() * 6) + 1;
            drawDice(randomNumber);
        }
    }

    document.addEventListener('keydown', handleKeyPress);
    drawDice(1);