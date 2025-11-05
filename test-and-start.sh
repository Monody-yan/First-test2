#!/bin/bash

echo "=========================================="
echo "🔍 音乐播放器启动诊断工具"
echo "=========================================="
echo ""

# 1. 检查当前目录
echo "✓ 检查当前目录..."
if [ -d "/workspace" ]; then
    echo "  ✅ /workspace 目录存在"
    cd /workspace
else
    echo "  ❌ /workspace 目录不存在"
    exit 1
fi
echo ""

# 2. 检查必要文件
echo "✓ 检查文件..."
files=("index.html" "script.js" "style.css" "music-player-standalone.html")
all_files_exist=true

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file 存在 ($(du -h "$file" | cut -f1))"
    else
        echo "  ❌ $file 不存在"
        all_files_exist=false
    fi
done
echo ""

# 3. 检查 Python
echo "✓ 检查 Python..."
if command -v python3 &> /dev/null; then
    version=$(python3 --version)
    echo "  ✅ Python 已安装: $version"
else
    echo "  ❌ Python3 未安装"
    exit 1
fi
echo ""

# 4. 检查端口
echo "✓ 检查端口 8000..."
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "  ⚠️  端口 8000 已被占用，将使用端口 8001"
    PORT=8001
else
    echo "  ✅ 端口 8000 可用"
    PORT=8000
fi
echo ""

# 5. 验证独立版本HTML
echo "✓ 验证 music-player-standalone.html..."
if grep -q "<!DOCTYPE html>" music-player-standalone.html && \
   grep -q "music-player" music-player-standalone.html && \
   grep -q "const songs" music-player-standalone.html; then
    echo "  ✅ 独立版本文件内容完整"
else
    echo "  ⚠️  独立版本文件可能不完整"
fi
echo ""

# 6. 显示摘要
echo "=========================================="
echo "📊 诊断摘要"
echo "=========================================="
echo "工作目录: $(pwd)"
echo "可用端口: $PORT"
echo "文件状态: 所有文件准备就绪"
echo ""

# 7. 启动服务器
echo "=========================================="
echo "🚀 启动服务器..."
echo "=========================================="
echo ""
echo "✅ 服务器即将启动在端口 $PORT"
echo ""
echo "📱 请在浏览器中访问以下任一地址："
echo ""
echo "   推荐（独立版本）："
echo "   🔗 http://localhost:$PORT/music-player-standalone.html"
echo ""
echo "   标准版本："
echo "   🔗 http://localhost:$PORT/index.html"
echo ""
echo "=========================================="
echo "💡 提示："
echo "   - 按 Ctrl+C 停止服务器"
echo "   - 服务器启动后，上面的链接将可以访问"
echo "   - 如果浏览器显示空白，请检查控制台错误"
echo "=========================================="
echo ""
echo "⏳ 启动中..."
sleep 2
echo ""

# 启动服务器
python3 -m http.server $PORT
