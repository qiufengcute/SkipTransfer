# 📖 本扩展参数 DSL 文档

## 最简单的例子
```
[Element(.title).[HTML]]
```
👆 将参数获取结果设为页面上第一个 `class="title"` 元素的 innerHTML

## 语法速览

```
[命令(参数).数据指令 => 后处理]
```

| 部分 | 说明 | 必填 |
|------|------|------|
| 命令 | `Element` / `Arg` | ✅ |
| 参数 | 选择器 / 参数名 | ✅ |
| 数据指令 | `.属性` / `.[HTML]` / `.[JumpInit\|...]` | ❌ |
| 后处理 | `=> BASE64` | ❌ |

## 命令详解

### `Element` — 提取页面元素

从指定 tab 的页面中，用 CSS 选择器取元素。

```
[Element(.product-title).[HTML]]
```
将参数获取结果设置为：第一个匹配元素的 `innerHTML`

```
[Element(.price).textContent]
```
将参数获取结果设置为：第一个匹配元素的 `textContent`

```
[Element(.avatar).src]
```
将参数获取结果设置为：第一个匹配元素的 `src` 属性

```
[Element(.config).[HTML] => BASE64]
```
将参数获取结果设置为：取到 HTML 后再进行 Base64 解码

### `Arg` — 获取 URL 参数

```
[Arg(token)]
```
将参数获取结果设置为：当前页面 URL 中的 `token` 参数值

```
[Arg(userId)]
```
将参数获取结果设置为：`userId` 参数值

> ⚠️ `Arg` 命令不能带数据指令

## 数据指令 `JumpInit` — 给元素重置跳转

这个很特别，它**不设置参数获取结果**，而是重置匹配到的**所有元素**的绑定点击事件。

部分网站的中转页不是单独页面，而是进行弹窗。在这种网站即可使用此数据指令。

```
[Element(.product-card).[JumpInit|data-url]]
```
点击卡片后，跳转到它的 `data-url` 属性值

```
[Element(.link-btn).[JumpInit|[HTML]]]
```
点击按钮后，跳转到按钮 `innerHTML` 里的 URL

## 后处理：BASE64

对提取到的数据进行 Base64 解码：

```
[Element(.encoded-config).[HTML] => BASE64]
```

如果数据不是合法的 Base64，会抛出 `DSLParseError`。

## 错误处理

所有异常都是 `DSLParseError` 类型，会被 `Service Worker` (`background.js`) 自动捕获并输出到控制台

**但是捕获后参数结果将一律视为 `null` (不跳转) 且无任何提示**

### 常见错误

| 错误信息 | 原因 |
|----------|------|
| `Syntax analysis faild.` | 语法格式不对 |
| `Element command must have data command.` | Element 少了数据指令 |
| `Arg command cannot have data command.` | Arg 带了不该带的数据指令 |
| `Selector command unknown` | 命令名不是 Element 或 Arg |
| `Last command only support BASE64` | 后处理只支持 BASE64 |
| `data is not a BASE64 string` | Base64 解码失败 |

## 架构原理

代码位于 [parseDSL.js](./parseDSL.js)

```
DSL 字符串
    ↓
正则解析 → 拆成 [命令, 参数, 数据指令, 后处理]
    ↓
命令路由 → Element → chrome.scripting 跨页取 DOM
         → Arg     → new URL() 取参数
    ↓
数据指令处理 → 属性提取 / innerHTML / JumpInit 绑定
    ↓
后处理 → BASE64 解码
    ↓
返回结果
```
