# 设计说明 - 青色珊瑚色主题

## 🎨 设计主题

**Cyan & Coral Palette - Friendly UI**
- 青色 (#06b6d4, #22d3ee) - 科技、清新
- 珊瑚色 (#f97316, #fb923c) - 温暖、活力
- 圆润UI - 友好、现代
- 活泼分隔符 - 有趣、独特

---

## ✨ 设计特点

### 1. **色彩系统**
- **主色调**: 青色渐变 + 珊瑚色渐变
- **背景**: 青色到珊瑚色的柔和渐变
- **卡片**: 纯白色，带装饰性气泡
- **边框**: 浅青色和浅珊瑚色
- **语义色**: 成功(绿)、警告(黄)、错误(红)

### 2. **圆角系统**
```css
--radius-sm: 12px   /* 小元素 */
--radius-md: 20px   /* 输入框、按钮 */
--radius-lg: 28px   /* 卡片 */
--radius-xl: 40px   /* 主容器 */
```

### 3. **微交互**
- 按钮悬停上浮效果
- 输入框聚焦时提升
- 卡片悬停阴影加深
- 平滑过渡动画

### 4. **装饰元素**
- 装饰性气泡（半透明圆形）
- 波浪形分隔符
- 渐变背景
- 彩色边框

---

## 🎯 无障碍特性

### 语义化HTML
- 使用 `<main>`, `<section>`, `<header>` 等语义标签
- ARIA标签 (`role`, `aria-label`, `aria-live`)
- 表单验证和错误提示
- 屏幕阅读器支持

### 键盘导航
- 焦点可见样式
- Tab键导航支持
- Enter键提交表单

### 动画可访问性
```css
@media (prefers-reduced-motion: reduce) {
    /* 减少动画 */
}
```

---

## 📐 布局结构

```
┌─────────────────────────────┐
│      Header (标题)          │
│   Bubbly Divider (波浪分隔)  │
├─────────────────────────────┤
│                             │
│  Form Section               │
│  ├── Plugin Name Input      │
│  ├── Description Textarea   │
│  └── Generate Button        │
│                             │
│  Tips Box (小贴士)          │
│                             │
├─────────────────────────────┤
│  Preview Section (隐藏)     │
│  ├── Original Icon          │
│  └── Size Previews          │
│                             │
│  Action Buttons             │
│  └── Download ZIP           │
│                             │
└─────────────────────────────┘
```

---

## 🔧 技术实现

### CSS特性
- CSS变量（主题定制）
- Flexbox + Grid（响应式布局）
- 渐变背景
- 阴影层次
- 伪元素装饰

### JavaScript优化
- 表单提交处理
- 实时字符计数
- 错误处理优化
- API敏感词过滤

---

## 📱 响应式设计

### 断点
- **Desktop**: > 768px
- **Tablet**: 481-768px
- **Mobile**: ≤ 480px

### 移动端优化
- 单列布局
- 减小间距
- 调整字体大小
- 全宽按钮

---

## 🎭 动画效果

### 按钮动画
```css
.btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(...);
}
```

### 卡片动画
```css
.preview-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(...);
}
```

### 输入框动画
```css
input:focus {
    transform: translateY(-2px);
    box-shadow: 0 0 0 4px rgba(...);
}
```

---

## 🚀 性能优化

1. **纯CSS动画** - GPU加速
2. **最小化重排** - 使用transform
3. **渐进式增强** - 基础功能无需JS
4. **图片优化** - Canvas本地处理

---

## 📦 浏览器兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

**版本**: v2.0
**更新日期**: 2026-01-21
**设计师**: Claude + User Collaboration
