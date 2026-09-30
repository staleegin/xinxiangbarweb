# Bar Atlas 新乡酒吧地图

纯 HTML + CSS + JS 的网页版 MVP，无需构建、无外部依赖，可直接部署到 GitHub Pages。

## 部署
1. 新建 GitHub 仓库（例如 `bar-atlas`），把本目录 4 个文件上传到根目录。
2. Settings → Pages → Deploy from a branch → `main` / `(root)` → Save。
3. 访问 `https://你的用户名.github.io/bar-atlas/`。

## 功能
搜索与筛选（鸡尾酒 / 威士忌 / 约会 / 安静 / Live Music）、酒吧列表、详情、酒单与单杯价格、距离、收藏（存在浏览器本地）、高德地图、商家入驻。

## 修改数据
所有酒吧都在 `app.js` 顶部的 `BARS` 数组里，**当前为虚构示例数据，上线前请替换为真实信息**。
字段：`name` 名称、`area` 区域、`km` 距离、`hours` 营业时间、`tags` 标签、`menu` 酒单 `[名称, 说明, 价格]`、`addr` 地址（用于地图定位）、`poi` 店名（按名字在高德搜索定位，推荐）、`lnglat` 坐标 `[经度, 纬度]`（可选，优先级最高）、`demo:true` 虚构数据（不显示在地图上）、`h` 封面色相（0–360）。
商家入驻邮箱在 `app.js` 搜索 `hello@example.com` 后替换。

## 设计取向
参考 [emilkowalski/skills](https://github.com/emilkowalski/skills) 的界面原则：
- 进入动画用 ease-out 曲线（`cubic-bezier(.23,1,.32,1)`），退出更快；只动 `transform` 和 `opacity`
- 按钮按下 `scale(.97)`，弹层从下方滑入或由 `scale(.96)` 展开，不从 0 开始
- 用半透明阴影环代替实线边框；卡片与封面圆角同心
- 移动端：`100dvh`、安全区、输入框 16px 防缩放、关闭点击高亮、`hover` 仅在支持悬停的设备生效
- 价格使用等宽数字；尊重 `prefers-reduced-motion`

## 下一步
网页原型 → React Native + Expo → Supabase 数据库 → 真实酒吧 / 酒单 → 老板后台。数据字段可直接沿用。

## 高德地图
- 在 `config.js` 填入高德「Web端(JS API)」的 Key 和安全密钥。它们会公开在页面源码里，请在高德控制台给 Key 设置**域名白名单**（你的 `用户名.github.io` 和本地测试用的 `localhost`）。
- 本地测试：在本目录运行 `python3 -m http.server 8000`，打开 `http://localhost:8000`。
- 只有带 `addr` 或 `lnglat` 且不是 `demo` 的酒吧会出现在地图上；定位顺序：`lnglat` > 按店名 `poi` 搜索（限定新乡）> 按地址 `addr` 解析。
