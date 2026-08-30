# Skip Transfers

![支持浏览器](https://img.shields.io/badge/Edge-支持-0078D7?logo=microsoftedge&logoColor=white)
![支持浏览器](https://img.shields.io/badge/Chrome-支持-4285F4?logo=googlechrome&logoColor=white)
![开源协议](https://img.shields.io/badge/协议-MIT-green)
![Edge 商店](https://img.shields.io/badge/Edge_商店-审核中-blue)

🚀 自动跳过网站中转/重定向页面，直达目标链接。

适用于所有 **Chromium 内核** 的浏览器（Edge、Chrome、Brave、Vivaldi 等）。当你点击链接进入中转页（如 `link.zhihu.cn` 等）时，扩展会自动检测目标链接并直接跳转，省去等待和手动点击的步骤。

## ✨ 功能特性

- 自动识别并跳过常见中转站域名
- 支持用户自定义中转站匹配规则
- 支持通过侧边栏查看和管理当前页面的跳转配置
- 所有规则和配置仅保存在本地浏览器中，不上传任何数据

## 📦 安装方式

### Edge 扩展商店

**正在审核中**

### 其他浏览器 / 开发者模式

1. 克隆本仓库到本地
2. 打开浏览器，访问扩展页面：
   - Edge: `edge://extensions/`
   - Chrome: `chrome://extensions/`
   - Brave: `brave://extensions/`
3. 打开「开发人员模式」
4. 点击「加载解压缩的扩展」，选择本项目的整个文件夹

## 🛠️ 使用说明

1. 安装扩展后，访问包含中转页面的网站（如知乎链接等）
2. 扩展会自动检测并跳过中转，直达目标页面
3. 点击工具栏图标，可在侧边栏查看和自定义规则

## 📝 自定义规则

通过侧边栏界面，你可以：

- 添加新的中转站域名规则
- 删除特定规则

## 🔒 隐私声明

本扩展：

- ❌ 不收集任何用户数据
- ❌ 不上传任何信息到服务器
- ✅ 所有配置仅保存在本地浏览器中（使用 `storage` API）
- ✅ 完全开源，代码可审查

## 💻 本扩展参数 DSL

本扩展的配置文件中，参数部分支持自定义 DSL 语言。

DSL 文档[见此](./DSL.md)，DSL 源代码[见此](./parseDSL.js)

## 🖼️ 图标声明

本扩展图标使用「得意黑」字体，遵循 [SIL Open Font License v1.1](https://openfontlicense.org) 协议。

## 🤝 反馈与建议

如遇问题或有功能建议，请在 [Issues](https://github.com/qiufengcute/SkipTransfer/issues) 中提出。
