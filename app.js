// API配置
const API_CONFIG = {
    url: 'https://api.siliconflow.cn/v1/images/generations',
    key: 'sk-syxqdvqlysbchyfctgepefiquqjplwhdvbqnhpzwbzfsbdim',
    model: 'Qwen/Qwen-Image',
    imageSize: '1328x1328' // Qwen-Image模型推荐的1:1比例尺寸
};

// 全局状态
let currentGeneratedImage = null;
let resizedImages = [];

// DOM元素
const pluginNameInput = document.getElementById('pluginName');
const pluginDescInput = document.getElementById('pluginDesc');
const charCount = document.getElementById('charCount');
const generateBtn = document.getElementById('generateBtn');
const regenerateBtn = document.getElementById('regenerateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const errorMsg = document.getElementById('errorMsg');
const previewSection = document.getElementById('previewSection');
const originalImage = document.getElementById('originalImage');

// 初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    // 字符计数
    pluginDescInput.addEventListener('input', () => {
        const count = pluginDescInput.value.length;
        charCount.textContent = count;
    });

    // 表单提交（按Enter键也会触发）
    document.getElementById('iconForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleGenerate();
    });

    // 重新生成按钮
    regenerateBtn.addEventListener('click', handleGenerate);

    // 下载按钮
    downloadBtn.addEventListener('click', handleDownload);
});

// 构建提示词
function buildPrompt(name, desc) {
    return `Please help me design a browser extension icon with a green and white color scheme.`;
}

// 生成图标
async function handleGenerate() {
    const name = pluginNameInput.value.trim();
    const desc = pluginDescInput.value.trim();

    // 验证输入
    if (!name || !desc) {
        showError('请输入插件名称和功能描述');
        return;
    }

    // 隐藏错误信息
    hideError();

    // 显示加载状态
    setLoading(true);

    try {
        // 构建提示词
        const prompt = buildPrompt(name, desc);

        // 调用API
        const imageBlob = await callAIImageAPI(prompt);

        // 保存原始图片
        currentGeneratedImage = imageBlob;

        // 显示原始图片预览
        const imageUrl = URL.createObjectURL(imageBlob);
        originalImage.src = imageUrl;

        // 处理图片尺寸
        resizedImages = await resizeImage(imageUrl, [16, 48, 128]);

        // 显示预览区域
        previewSection.style.display = 'block';

        // 平滑滚动到预览区域
        previewSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (error) {
        console.error('生成失败:', error);
        showError('生成失败：' + (error.message || '未知错误，请重试'));
    } finally {
        setLoading(false);
    }
}

// 调用AI生图API
async function callAIImageAPI(prompt) {
    const response = await fetch(API_CONFIG.url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_CONFIG.key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: API_CONFIG.model,
            prompt: prompt,
            image_size: API_CONFIG.imageSize
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const statusCode = response.status;

        // 处理451错误（敏感内容检测）
        if (statusCode === 451) {
            throw new Error('内容检测误判，请重试或尝试修改描述。某些词汇可能触发安全检测。');
        }

        // 处理其他错误
        const errorMsg = errorData.message || errorData.error || '';
        throw new Error(errorMsg || `API请求失败 (${statusCode})，请重试`);
    }

    const data = await response.json();

    // 检查返回的数据结构
    if (!data.data || !data.data[0] || !data.data[0].url) {
        throw new Error('API返回数据格式不正确');
    }

    // 下载图片并转换为Blob
    const imageUrl = data.data[0].url;
    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
        throw new Error('图片下载失败');
    }

    return await imageResponse.blob();
}

// 处理图片尺寸
async function resizeImage(imageUrl, sizes) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;

        img.onload = async () => {
            const results = [];

            for (const size of sizes) {
                const canvas = document.getElementById(`canvas${size}`);
                const ctx = canvas.getContext('2d');

                // 清空画布
                ctx.clearRect(0, 0, size, size);

                // 高质量缩放
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';

                // 绘制图片
                ctx.drawImage(img, 0, 0, size, size);

                // 转换为Blob
                const blob = await new Promise((resolve) => {
                    canvas.toBlob(resolve, 'image/png');
                });

                results.push({
                    size: size,
                    blob: blob,
                    filename: `icon-${size}.png`
                });
            }

            resolve(results);
        };

        img.onerror = () => {
            reject(new Error('图片加载失败'));
        };
    });
}

// 下载ZIP文件
async function handleDownload() {
    if (!resizedImages || resizedImages.length === 0) {
        showError('请先生成图标');
        return;
    }

    try {
        downloadBtn.textContent = '准备中...';
        downloadBtn.disabled = true;

        // 创建ZIP文件
        const zip = new JSZip();

        // 添加所有图片到ZIP
        resizedImages.forEach(img => {
            zip.file(img.filename, img.blob);
        });

        // 生成ZIP文件
        const content = await zip.generateAsync({ type: 'blob' });

        // 触发下载
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'extension-icons.zip';
        link.click();

        // 清理
        setTimeout(() => {
            URL.revokeObjectURL(link.href);
        }, 100);

        downloadBtn.innerHTML = '✅ 下载完成';
        setTimeout(() => {
            downloadBtn.innerHTML = '📦 下载ZIP文件';
            downloadBtn.disabled = false;
        }, 2000);

    } catch (error) {
        console.error('下载失败:', error);
        showError('下载失败：' + error.message);
        downloadBtn.innerHTML = '📦 下载ZIP文件';
        downloadBtn.disabled = false;
    }
}

// 设置加载状态
function setLoading(isLoading) {
    const btnText = generateBtn.querySelector('.btn-text');
    const btnLoader = generateBtn.querySelector('.btn-loader');

    if (isLoading) {
        generateBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
    } else {
        generateBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

// 显示错误信息
function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';

    // 3秒后自动隐藏
    setTimeout(() => {
        hideError();
    }, 5000);
}

// 隐藏错误信息
function hideError() {
    errorMsg.style.display = 'none';
}
