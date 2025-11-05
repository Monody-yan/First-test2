# 如何查看音乐播放器

## 方法1：直接在浏览器打开（推荐）

1. 在浏览器地址栏输入：
   ```
   file:///workspace/index.html
   ```

2. 或者用文件管理器打开文件夹，双击 `index.html`

## 方法2：启动本地服务器

### 使用Python:
```bash
cd /workspace
python3 -m http.server 8000
```
然后访问：http://localhost:8000

### 使用Node.js:
```bash
cd /workspace
npx http-server -p 8080
```
然后访问：http://localhost:8080

## 方法3：在线部署

### GitHub Pages (推荐)：
1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择main分支作为源
4. 几分钟后即可访问

### Netlify Drop：
1. 访问 https://app.netlify.com/drop
2. 将整个 /workspace 文件夹拖放到页面
3. 立即获得可访问的URL

## 注意事项

当前音乐文件URL是示例链接，无法实际播放。
如需测试完整功能，请：

1. 编辑 script.js 中的 songs 数组
2. 使用真实的音频文件URL
3. 或使用本地音频文件路径

