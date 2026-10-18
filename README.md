# Skip Transfers

![支持浏览器](https://img.shields.io/badge/Edge-支持-0078D7?logo=microsoftedge&logoColor=white)
![支持浏览器](https://img.shields.io/badge/Chrome-支持-4285F4?logo=googlechrome&logoColor=white)
![开源协议](https://img.shields.io/badge/协议-MIT-green)
[![Edge 商店版本](https://img.shields.io/badge/dynamic/json?label=Edge+商店&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Faffddlaihdgmikjjkimicgpfkpnndfag)](https://microsoftedge.microsoft.com/addons/detail/skip-transfer/affddlaihdgmikjjkimicgpfkpnndfag)
[![Edge 商店评分](https://img.shields.io/badge/dynamic/json?label=Edge+商店评分&suffix=/5&query=%24.averageRating&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Faffddlaihdgmikjjkimicgpfkpnndfag)](https://microsoftedge.microsoft.com/addons/detail/skip-transfer/affddlaihdgmikjjkimicgpfkpnndfag)

<a href="https://microsoftedge.microsoft.com/addons/detail/skip-transfer/affddlaihdgmikjjkimicgpfkpnndfag"><img src="./Get_it_from_edge.png" alt="Get it from edge" width="320"></a>

🚀 自动跳过网站中转/重定向页面，直达目标链接。

适用于所有 **Chromium 内核** 的浏览器（Edge、Chrome、Brave、Vivaldi 等）。当你点击链接进入中转页（如 `link.zhihu.cn` 等）时，扩展会自动检测目标链接并直接跳转，省去等待和手动点击的步骤。

## 💡 为什么做这个？

每次点开知乎/掘金/CSDN 的链接，都要经过一个“中转页”——转圈、等待、再点一次。烦。

市面上有类似的扩展，但大部分没有 **DSL 功能** —— 复杂场景（弹窗、Base64、路径参数）只能硬编码，遇到新站就得等更新。

所以写了 SkipTransfer：
- **自研 DSL**，复杂场景也能自己扩展。比如 `[Element(.product-card).[JumpInit|data-url]]` —— 点击卡片，跳转到它的 `data-url` 属性值。
- 内置 48+ 站点规则（知乎、掘金、CSDN、B站、Steam、Curseforge……），开箱即用。
- 完全开源，不收集数据。

## 🆚 和多数同类扩展的区别

| 能力 | 场景 | SkipTransfer | 多数同类扩展 |
|------|------|-------------|-------------|
| 自定义规则生效 | 你想加个“没内置”的站 | ✅ 支持 | ⚠️ 部分不生效 |
| 复杂场景 | 中转页是“弹窗”或“Base64” | ✅ 自研 DSL | ❌ 硬编码 |
| 多参数 / 多规则备选 | 一个站“多个参数名” | ✅ 支持数组，如 `["toasturl","url","u"]` | ❌ 单参数 |
| **Edge** | **Edge 用户** | **✅ Edge 商店直装** | **⚠️ 多数只有 Chrome 商店（国内访问不了）** |
| **Chrome** | **Chrome 用户** | **⚠️ 需开发者模式（Edge 商店扩展装不了）** | **✅ Chrome 商店直装（但国内访问不了）** |
| **其他 Chromium** | **Brave / Vivaldi / Opera 用户** | **⚠️ 需开发者模式** | **⚠️ 需开发者模式** |
| **Firefox** | **Firefox 用户** | **❌ 暂不支持** | **✅ 多数支持** |

## ✨ 功能特性

- 自动识别并跳过常见中转站域名
- 支持用户自定义中转站匹配规则
- 支持通过侧边栏查看和管理当前页面的跳转配置
- 所有规则和配置仅保存在本地浏览器中，不上传任何数据

## 📦 安装方式

### Edge 扩展商店

<a href="https://microsoftedge.microsoft.com/addons/detail/skip-transfer/affddlaihdgmikjjkimicgpfkpnndfag"><img src="./Get_it_from_edge.png" alt="Get it from edge" width="320"></a>

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

## 🌐 内置支持的中转站（48+）

| 分类 | 支持站点 |
|------|---------|
| **社区 / 问答** | 知乎、稀土掘金、CSDN、少数派、酷安、NodeSeek、牛客网、力扣、OSCHINA、InfoQ、HelloGitHub、机核 GCORES、豆瓣、百度贴吧 |
| **代码 / 文档** | Gitee、腾讯文档、语雀、石墨文档、腾讯云开发者社区、阿里云开发者社区、微信开发者社区、51CTO |
| **游戏** | Curseforge、Bilibili游戏、Steam 社区、巴哈姆特電玩資訊站、多玩游戏网、红石中继站、碧蓝之星 |
| **社交** | 微博、简书、Instagram、Telegram、领英、KOOK |
| **工具 / 其他** | 爱发电、企查查、天眼查、快懂百科、站长之家、优设网、423down、MC百科、微信公众号、YouTube、LaTeX 问答 |

> 💡 没找到你要的站点？可以在侧边栏**自定义添加规则**，或用 DSL 描述复杂场景。
>
> 也欢迎**提 [Issue](https://github.com/qiufengcute/SkipTransfer/issues)** 请求支持，或**提 [PR](https://github.com/qiufengcute/SkipTransfer/pulls)** 直接贡献规则。
>
> 📋 完整规则列表见 [`default_transfers.json`](./default_transfers.json)。

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
