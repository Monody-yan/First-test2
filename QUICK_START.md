# 🎵 音乐播放器快速启动指南

## 方法1：使用启动脚本（推荐）⭐

### Linux/Mac 用户：
```bash
cd /workspace
./start-server.sh
```

### Windows 用户：
```bash
cd /workspace
start-server.bat
```

或者直接双击 `start-server.bat` 文件

---

## 方法2：手动启动服务器

### 使用 Python（推荐）：
```bash
cd /workspace
python3 -m http.server 8000
```

### 使用 Node.js：
```bash
cd /workspace
npx http-server -p 8000
```

---

## 启动后访问地址

服务器启动后，在浏览器中访问：

### 独立版本（推荐）：
```
http://localhost:8000/music-player-standalone.html
```
✅ 包含所有代码的单文件版本，无需其他文件

### 标准版本：
```
http://localhost:8000/index.html
```
需要 index.html, script.js, style.css 三个文件配合

---

## 文件说明

| 文件 | 说明 |
|------|------|
| `music-player-standalone.html` | ⭐ 独立版本，包含所有代码 |
| `index.html` | 标准版 - HTML 结构 |
| `script.js` | 标准版 - JavaScript 代码 |
| `style.css` | 标准版 - CSS 样式 |
| `README.md` | 项目说明文档 |
| `API_DOCUMENTATION.md` | 完整 API 文档 |
| `start-server.sh` | Linux/Mac 启动脚本 |
| `start-server.bat` | Windows 启动脚本 |

---

## 注意事项

1. **音频文件**：当前使用的是免费测试音频（SoundHelix），可以正常播放
2. **停止服务器**：按 `Ctrl+C` 停止服务器
3. **端口占用**：如果 8000 端口被占用，可以使用其他端口（如 8001, 8080 等）

---

## 故障排除

### 问题1：找不到 Python
**解决方案**：
- 确保已安装 Python 3
- 或使用 Node.js：`npx http-server`

### 问题2：端口被占用
**解决方案**：
```bash
# 使用其他端口
python3 -m http.server 8001
```
然后访问 `http://localhost:8001`

### 问题3：浏览器无法访问
**解决方案**：
- 检查服务器是否正在运行
- 确认使用正确的端口号
- 尝试使用 `127.0.0.1` 代替 `localhost`

---

## 🎉 开始使用

1. 运行启动脚本或手动启动服务器
2. 在浏览器打开对应的 URL
3. 点击"播放"按钮开始享受音乐！

有问题请查看 `README.md` 或 `API_DOCUMENTATION.md`
