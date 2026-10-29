# 水 Bar · 清吧与啤酒吧地图

纯 HTML + CSS + JS 的网页版 MVP，无需构建、无外部依赖，可直接部署到 GitHub Pages。

## 部署
1. 新建 GitHub 仓库（例如 `bar-atlas`），把本目录的文件和 `data` 文件夹上传到根目录。
2. Settings → Pages → Deploy from a branch → `main` / `(root)` → Save。
3. 访问 `https://你的用户名.github.io/bar-atlas/`。

## 功能
- 跟随手机自动切换深色 / 浅色。
- 推荐：顶部「今日推荐」鸡尾酒（按日期每天换一款，所有人相同）；列表每天随机排序一次，同一天顺序固定；按类型和禁烟筛选；底部有「合作联系」按钮。
- 地图：圆形小地图，外圈弧线表示各方向的店铺多少（弧越长越亮 = 越多），点地图放大成全屏；「Random One」随机打开一家；下面两列卡片按距离从近到远。
- 收藏：收藏的店扇形展开 + 统计，下面是收藏列表（存在浏览器本地）。
- 搜索：点底栏右侧放大镜，底栏变成输入框，筛选当前页面。
- 定位：首次打开请求一次定位，用于显示距离。位置只在手机上计算，不保存、不上传；拒绝后不再询问，也不显示距离。
合作邮箱开好后，在 `app.js` 里搜索 `合作邮箱即将开放`，把那一行换成你的邮箱提示。

## 今日鸡尾酒
- 数据在 `data/cocktails.json`，每款一项：`zh` 中文名、`en` 英文名、`img` 图片、`video` 视频（可选）。
- 图片和视频只能放在本站的 `assets/` 文件夹里（例如 `assets/cocktails/gin-tonic.webp`、`assets/video/gin-tonic.mp4`），外部链接会被忽略。
- 有 `video` 时自动静音循环播放；手机开了「减少动态效果」、省流量模式或视频加载失败时显示图片。
- 现有 90 款插画来自 [rasmusab/iba-cocktails](https://github.com/rasmusab/iba-cocktails)（MIT 许可）的配方数据，由我们自己生成。
- 使用网络图片时，请在下方记下来源和许可：
  - （待填）金汤力图片：来源 ______，许可 ______

## 修改数据
店铺数据维护在「酒吧数据模板.xlsx」里，网页读取的是 `data/` 文件夹里的 JSON 文件，不要直接改 JSON。
1. 在 Excel 里改好数据（每家店一行，下拉选项只能从下拉里选）。
2. 在本目录运行：`python3 tools/build_data.py 酒吧数据模板.xlsx`（需要先 `pip3 install openpyxl`）。
3. 脚本会检查格式；有错误时会列出第几行、哪一栏，改完再运行一次。
4. 把生成的 `data/` 文件夹上传覆盖到 GitHub。

新增城市：在 `tools/build_data.py` 顶部的 `CITY_SLUGS` 里加一行，例如 `"郑州": "zhengzhou"`。
不会导出到网页的内容：核实日期；禁烟只导出“是否全店禁烟”。
本地预览要用 `python3 -m http.server 8000` 打开，直接双击 `index.html` 读不到数据文件。

## 设计取向
参考 [emilkowalski/skills](https://github.com/emilkowalski/skills) 的界面原则：
- 进入动画用 ease-out 曲线（`cubic-bezier(.23,1,.32,1)`），退出更快；只动 `transform` 和 `opacity`
- 按钮按下 `scale(.97)`，弹层从下方滑入或由 `scale(.96)` 展开，不从 0 开始
- 用半透明阴影环代替实线边框；卡片与封面圆角同心
- 移动端：`100dvh`、安全区、输入框 16px 防缩放、关闭点击高亮、`hover` 仅在支持悬停的设备生效
- 价格使用等宽数字；尊重 `prefers-reduced-motion`

## 高德地图
- 在 `config.js` 填入高德「Web端(JS API)」的 Key 和安全密钥。它们会公开在页面源码里，请在高德控制台给 Key 设置**域名白名单**（你的 `用户名.github.io` 和本地测试用的 `localhost`）。
- 本地测试：在本目录运行 `python3 -m http.server 8000`，打开 `http://localhost:8000`。
- 只有填了坐标的店会出现在地图上、显示距离和「导航到这里」按钮。

## 分享预览图
- `share.jpg` 是微信等分享链接时显示的缩略图（800×800），`icon.png` 是网页图标；想换图，直接用同名文件覆盖即可。
- 微信会缓存链接卡片。换图后想立刻看到效果，请分享带后缀的新链接，例如 `https://staleegin.github.io/xinxiangbarweb/?v=2`。
