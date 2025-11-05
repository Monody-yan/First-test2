#!/bin/bash

# 音乐播放器启动脚本
# Music Player Start Script

echo "================================================"
echo "🎵 启动音乐播放器 Music Player Server"
echo "================================================"
echo ""

# 切换到工作目录
cd /workspace

# 检查端口是否被占用
PORT=8000
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  端口 $PORT 已被占用，尝试使用端口 8001..."
    PORT=8001
fi

if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  端口 $PORT 也被占用，尝试使用端口 8002..."
    PORT=8002
fi

echo "📂 工作目录: /workspace"
echo "🌐 启动服务器在端口: $PORT"
echo ""
echo "================================================"
echo "✅ 服务器已启动！请在浏览器中访问："
echo ""
echo "   🔗 http://localhost:$PORT/music-player-standalone.html"
echo "   或"
echo "   🔗 http://localhost:$PORT/index.html"
echo ""
echo "================================================"
echo ""
echo "💡 提示："
echo "   - 按 Ctrl+C 可以停止服务器"
echo "   - 独立版本(standalone)包含所有代码，推荐使用"
echo "   - 标准版本需要三个文件配合(index.html, script.js, style.css)"
echo ""
echo "================================================"
echo ""

# 启动Python HTTP服务器
python3 -m http.server $PORT
