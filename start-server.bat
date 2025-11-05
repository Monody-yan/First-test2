@echo off
REM 音乐播放器启动脚本 (Windows)
REM Music Player Start Script

echo ================================================
echo 🎵 启动音乐播放器 Music Player Server
echo ================================================
echo.

cd /d %~dp0

echo 📂 工作目录: %CD%
echo 🌐 启动服务器在端口: 8000
echo.
echo ================================================
echo ✅ 服务器已启动！请在浏览器中访问：
echo.
echo    🔗 http://localhost:8000/music-player-standalone.html
echo    或
echo    🔗 http://localhost:8000/index.html
echo.
echo ================================================
echo.
echo 💡 提示：
echo    - 按 Ctrl+C 可以停止服务器
echo    - 浏览器将自动尝试打开
echo.
echo ================================================
echo.

REM 尝试在默认浏览器中打开
start http://localhost:8000/music-player-standalone.html

REM 启动Python HTTP服务器
python -m http.server 8000
