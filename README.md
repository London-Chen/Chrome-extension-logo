# 🎨 浏览器插件Logo生成器

一个简单易用的在线工具，帮助浏览器插件开发者快速生成符合规范的多尺寸图标。

## ✨ 功能特点

- 🚀 **AI智能生成** - 基于插件名称和功能描述，自动生成合适的图标
- 📐 **多尺寸支持** - 自动生成16x16、48x48、128x128三种标准尺寸
- 📦 **一键打包下载** - ZIP格式打包所有尺寸的图标文件
- 🎯 **规范命名** - 自动按照浏览器插件标准命名文件
- 💻 **纯前端实现** - 无需后端服务器，部署简单

## 📦 文件说明

```
extension-icon-generator/
├── index.html      # 主页面
├── style.css       # 样式文件
├── app.js          # 核心逻辑
├── package.json    # 项目配置
├── README.md       # 项目文档
└── 需求文档.md     # 需求文档
```

## 🚀 快速开始

### 方式1：本地直接打开

1. 克隆或下载项目
2. 直接用浏览器打开 `index.html` 文件
3. 开始使用！

### 方式2：本地开发服务器

```bash
# 安装依赖（可选，仅用于部署工具）
npm install

# 启动本地服务器
npm run dev

# 访问 http://localhost:3000
```

## 📝 使用方法

1. **输入插件信息**
   - 插件名称：例如 "AdBlock", "Dark Reader"
   - 功能描述：例如 "Block advertisements on all websites"

2. **生成图标**
   - 点击"生成图标"按钮
   - 等待AI生成（通常10-30秒）

3. **预览效果**
   - 查看原始图标
   - 预览不同尺寸的效果

4. **下载使用**
   - 点击"下载ZIP文件"
   - 解压后获得三个文件：
     - `icon-16.png` - 浏览器标签页图标
     - `icon-48.png` - 扩展管理页面图标
     - `icon-128.png` - 应用商店图标

5. **集成到插件**
   ```json
   // manifest.json
   {
     "icons": {
       "16": "icon-16.png",
       "48": "icon-48.png",
       "128": "icon-128.png"
     }
   }
   ```

## 🛠️ 技术栈

- **前端框架**: 原生 HTML + CSS + JavaScript
- **样式**: 自定义CSS（渐变背景 + 现代卡片设计）
- **图片处理**: Canvas API
- **打包下载**: JSZip库
- **AI生图API**: SiliconFlow (Qwen模型)

## 🌐 部署方案

### Vercel部署（推荐）

1. 将项目上传到GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

### Netlify部署

1. 在 [Netlify](https://netlify.com) 拖拽项目文件夹
2. 自动部署完成

### GitHub Pages部署

1. 将项目上传到GitHub
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为源

## 🔧 配置说明

### 修改API配置

在 `app.js` 中修改以下配置：

```javascript
const API_CONFIG = {
    url: 'https://api.siliconflow.cn/v1/images/generations',
    key: 'your-api-key-here',  // 替换为你的API密钥
    model: 'Qwen/Qwen-Image-Edit-2509'
};
```

### 自定义Prompt模板

在 `app.js` 的 `buildPrompt()` 函数中修改：

```javascript
function buildPrompt(name, desc) {
    return `Your custom prompt template here...`;
}
```

### 添加更多尺寸

在 `app.js` 中修改尺寸数组：

```javascript
resizedImages = await resizeImage(imageUrl, [16, 48, 128, 256]);
```

## 📸 界面预览

- 渐变紫色背景
- 现代化卡片设计
- 响应式布局
- 流畅的动画效果

## ⚠️ 注意事项

1. **API密钥安全**: 生产环境建议将API密钥存储在环境变量中
2. **跨域问题**: 如果遇到CORS问题，建议使用后端代理
3. **API限制**: 注意API调用频率限制，避免超额
4. **图片质量**: 小尺寸图标可能丢失细节，建议使用简洁设计

## 🔄 后续优化方向

- [ ] 支持自定义颜色方案
- [ ] 支持多种设计风格选择
- [ ] 添加历史记录功能
- [ ] 支持SVG格式导出
- [ ] 添加批量生成功能
- [ ] 支持更多尺寸规格

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 💡 常见问题

**Q: 生成的图标不满意怎么办？**
A: 点击"重新生成"按钮，系统会使用相同的输入再次生成。

**Q: 可以在离线环境使用吗？**
A: 不可以，需要调用在线AI生图API。

**Q: 支持哪些浏览器？**
A: 支持所有现代浏览器（Chrome, Firefox, Safari, Edge）。

**Q: API调用失败怎么办？**
A: 检查网络连接和API密钥是否正确，查看控制台错误信息。

---

Made with ❤️ for developers
