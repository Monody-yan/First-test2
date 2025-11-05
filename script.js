// 游戏配置
const CONFIG = {
    gridSize: 20,
    tileSize: 20,
    initialSpeed: 150,
    speedIncrease: 5,
    minSpeed: 50
};

// 游戏状态
let canvas, ctx;
let gameState = {
    snake: [],
    food: null,
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    score: 0,
    highScore: 0,
    isPlaying: false,
    isPaused: false,
    gameSpeed: CONFIG.initialSpeed
};

// DOM元素
let scoreElement, highScoreElement, finalScoreElement;
let startBtn, pauseBtn, restartBtn, gameOverScreen;

// 初始化游戏
function initGame() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    
    // 设置画布大小
    canvas.width = CONFIG.gridSize * CONFIG.tileSize;
    canvas.height = CONFIG.gridSize * CONFIG.tileSize;
    
    // 获取DOM元素
    scoreElement = document.getElementById('score');
    highScoreElement = document.getElementById('high-score');
    finalScoreElement = document.getElementById('final-score');
    startBtn = document.getElementById('start-btn');
    pauseBtn = document.getElementById('pause-btn');
    restartBtn = document.getElementById('restart-btn');
    gameOverScreen = document.getElementById('game-over');
    
    // 加载最高分
    gameState.highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
    highScoreElement.textContent = gameState.highScore;
    
    // 事件监听
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', togglePause);
    restartBtn.addEventListener('click', restartGame);
    document.addEventListener('keydown', handleKeyPress);
    
    // 绘制初始状态
    drawGame();
}

// 开始游戏
function startGame() {
    resetGame();
    gameState.isPlaying = true;
    gameState.isPaused = false;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    gameOverScreen.classList.add('hidden');
    gameLoop();
}

// 重置游戏
function resetGame() {
    // 初始化蛇的位置（在画布中央）
    const startX = Math.floor(CONFIG.gridSize / 2);
    const startY = Math.floor(CONFIG.gridSize / 2);
    gameState.snake = [
        { x: startX, y: startY },
        { x: startX - 1, y: startY },
        { x: startX - 2, y: startY }
    ];
    
    gameState.direction = { x: 1, y: 0 };
    gameState.nextDirection = { x: 1, y: 0 };
    gameState.score = 0;
    gameState.gameSpeed = CONFIG.initialSpeed;
    scoreElement.textContent = '0';
    
    generateFood();
}

// 生成食物
function generateFood() {
    let newFood;
    let isValidPosition = false;
    
    while (!isValidPosition) {
        newFood = {
            x: Math.floor(Math.random() * CONFIG.gridSize),
            y: Math.floor(Math.random() * CONFIG.gridSize)
        };
        
        // 确保食物不在蛇身上
        isValidPosition = !gameState.snake.some(segment => 
            segment.x === newFood.x && segment.y === newFood.y
        );
    }
    
    gameState.food = newFood;
}

// 游戏主循环
function gameLoop() {
    if (!gameState.isPlaying) return;
    
    if (!gameState.isPaused) {
        updateGame();
        drawGame();
    }
    
    setTimeout(() => gameLoop(), gameState.gameSpeed);
}

// 更新游戏状态
function updateGame() {
    // 更新方向
    gameState.direction = { ...gameState.nextDirection };
    
    // 计算新的头部位置
    const head = { ...gameState.snake[0] };
    head.x += gameState.direction.x;
    head.y += gameState.direction.y;
    
    // 检查碰撞
    if (checkCollision(head)) {
        gameOver();
        return;
    }
    
    // 添加新头部
    gameState.snake.unshift(head);
    
    // 检查是否吃到食物
    if (head.x === gameState.food.x && head.y === gameState.food.y) {
        gameState.score += 10;
        scoreElement.textContent = gameState.score;
        
        // 更新最高分
        if (gameState.score > gameState.highScore) {
            gameState.highScore = gameState.score;
            highScoreElement.textContent = gameState.highScore;
            localStorage.setItem('snakeHighScore', gameState.highScore);
        }
        
        // 增加游戏速度
        if (gameState.gameSpeed > CONFIG.minSpeed) {
            gameState.gameSpeed = Math.max(
                CONFIG.minSpeed,
                gameState.gameSpeed - CONFIG.speedIncrease
            );
        }
        
        generateFood();
    } else {
        // 移除尾部
        gameState.snake.pop();
    }
}

// 检查碰撞
function checkCollision(head) {
    // 检查墙壁碰撞
    if (head.x < 0 || head.x >= CONFIG.gridSize || 
        head.y < 0 || head.y >= CONFIG.gridSize) {
        return true;
    }
    
    // 检查自身碰撞
    return gameState.snake.some(segment => 
        segment.x === head.x && segment.y === head.y
    );
}

// 绘制游戏
function drawGame() {
    // 清空画布
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制网格（可选）
    drawGrid();
    
    // 绘制食物
    ctx.fillStyle = '#ff6b6b';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(
        gameState.food.x * CONFIG.tileSize + CONFIG.tileSize / 2,
        gameState.food.y * CONFIG.tileSize + CONFIG.tileSize / 2,
        CONFIG.tileSize / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // 绘制蛇
    gameState.snake.forEach((segment, index) => {
        if (index === 0) {
            // 蛇头
            ctx.fillStyle = '#4ecdc4';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#4ecdc4';
        } else {
            // 蛇身
            ctx.fillStyle = `rgba(78, 205, 196, ${1 - index * 0.02})`;
            ctx.shadowBlur = 0;
        }
        
        ctx.fillRect(
            segment.x * CONFIG.tileSize + 1,
            segment.y * CONFIG.tileSize + 1,
            CONFIG.tileSize - 2,
            CONFIG.tileSize - 2
        );
        
        ctx.shadowBlur = 0;
    });
}

// 绘制网格
function drawGrid() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= CONFIG.gridSize; i++) {
        // 垂直线
        ctx.beginPath();
        ctx.moveTo(i * CONFIG.tileSize, 0);
        ctx.lineTo(i * CONFIG.tileSize, canvas.height);
        ctx.stroke();
        
        // 水平线
        ctx.beginPath();
        ctx.moveTo(0, i * CONFIG.tileSize);
        ctx.lineTo(canvas.width, i * CONFIG.tileSize);
        ctx.stroke();
    }
}

// 键盘控制
function handleKeyPress(e) {
    if (!gameState.isPlaying) return;
    
    // 空格键暂停
    if (e.code === 'Space') {
        e.preventDefault();
        togglePause();
        return;
    }
    
    if (gameState.isPaused) return;
    
    const key = e.key;
    
    // 防止反向移动
    if (key === 'ArrowUp' && gameState.direction.y === 0) {
        gameState.nextDirection = { x: 0, y: -1 };
    } else if (key === 'ArrowDown' && gameState.direction.y === 0) {
        gameState.nextDirection = { x: 0, y: 1 };
    } else if (key === 'ArrowLeft' && gameState.direction.x === 0) {
        gameState.nextDirection = { x: -1, y: 0 };
    } else if (key === 'ArrowRight' && gameState.direction.x === 0) {
        gameState.nextDirection = { x: 1, y: 0 };
    }
}

// 暂停/继续游戏
function togglePause() {
    if (!gameState.isPlaying) return;
    
    gameState.isPaused = !gameState.isPaused;
    pauseBtn.textContent = gameState.isPaused ? '继续' : '暂停';
}

// 游戏结束
function gameOver() {
    gameState.isPlaying = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    finalScoreElement.textContent = gameState.score;
    gameOverScreen.classList.remove('hidden');
}

// 重新开始游戏
function restartGame() {
    startGame();
}

// 页面加载完成后初始化
window.addEventListener('load', initGame);
