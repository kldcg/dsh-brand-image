# dsh-brand-image

Replace the DeepSeek Harness sidebar brand mark with your own image, and retitle the brand row.
用你自己的图片替换 DeepSeek Harness 侧栏左上角的品牌标志，并自定义品牌标题。

> 自己做的一个 dsh 小插件：把 DeepSeek Harness 原本的黑色虎鲸图标换成 Q 版鲸鱼娘。
> A small DSH plugin that replaces the original black orca icon of DeepSeek Harness with a chibi whale girl.

- 槽位：`sidebar.brand.mark`（标志图）+ `sidebar.brand.name`（标题与版本徽标）
- 零依赖、零构建、零 Host 代码、不联网、不读文件系统
- 图片以 data URL 内联在 `lib/client.js` 里

## 安装

```sh
dsh plugin --profile desktop add github:kldcg/dsh-brand-image
```

安装后刷新 GUI（或重启 DSH）。

未发布时的本地安装（手动路线）：

```sh
cd ~/.dsh/profiles/desktop
pnpm add file:/绝对路径/dsh-brand-image
```

然后把 `dsh-brand-image` 加进该目录 `package.json` 的 `dsh.profile.bundles` 数组。

## 换成你自己的图

```sh
node tools/embed-image.mjs assets/brand.jpg
node tools/embed-image.mjs C:/path/to/your.png
```

改完重装一次（或让 profile 的 HMR 重新加载），图片即生效。不需要改任何代码。

建议：正方形、约 192×192、带透明背景的 PNG 效果最好。标志的显示尺寸只有 20–30 px，
更大的原图只会让仓库变大。

## 改标题与版本号

改 `lib/client.js` 顶部这两个常量：

```js
const BRAND_TITLE = "DeepSeek Harness";
const BRAND_VERSION = "0.2.0-rc.2-04f392c";
```

**`BRAND_VERSION` 必须自己维护。** DSH 把版本字符串在**构建期内联**进自己的客户端 bundle
（`ui-sidebar` 里的 `localBuildVersion()` 直接返回一个字面量），没有任何运行时来源——
环境变量、Host 服务、`window.__DSH_BOOT__` 里都取不到。所以每次重建或升级 DSH 之后，
来这里改这一行，否则徽标会显示过期版本。

## 原理

本插件占用两个 single 槽位，取代外壳的默认回退（鱼形标志 + 本地构建标签）：

```js
const inject = ["slots"];

function apply(ctx) {
  ctx.slots.inject("sidebar.brand.mark", () =>
    ctx.slots.register({ name: "sidebar.brand.mark" }, BrandImage)
  );
  ctx.slots.inject("sidebar.brand.name", () =>
    ctx.slots.register({ name: "sidebar.brand.name" }, BrandName)
  );
}
```

`ctx.slots.inject` 会等 `ui-sidebar` 声明该槽位再注册，所以插件激活顺序无关紧要；
声明消失（例如 ui-sidebar 被禁用）时，本次填充会被一起撤销。

两个槽位的契约（取自槽位目录）：

- `SidebarBrandMarkOwnerProps { size: number }` —— 外壳给出标志的像素边长，`BrandImage` 按它渲染。
- `SidebarBrandNameOwnerProps { children?: never }` —— 标题占用者**自己拥有内容与宽度**，外壳不传内容。

三个样式对象逐字照搬 `ui-sidebar` 自己的样式表（外层 `height:24px` 列布局、标题
`12px/13px`、徽标 `6px/10px` 深底白字），所以观感与外壳原生一致，并跟随主题自动反色。

客户端半部由 `package.json` 的 `dsh.client` 声明加载，走
`window.__ModuleLoader__.load({ id, factory })` 这一个入口——因此没有构建步骤。

### 给改这个包的人：不要用 locale 改文案

`ctx.locale.register(ns, locale, dict)` 是**整包替换**该命名空间的字典，不是按键合并。
只在 `common` 命名空间里注册一个 key，会把该命名空间其余所有文案丢掉，
整个界面变成英文 key 名。要改某个界面文本，就占用它所在的槽位自己渲染。

## 限制

- 图片内联，改图必须重跑 `npm run embed` 并重装。目前没有设置页。
- 使用圆形裁切（`border-radius: 50%`）。若原图是深色背景而你在浅色主题下使用，
  标志会呈现为一个深色圆——这是刻意的，不是 bug；要完全贴合请用透明背景 PNG。
- 占用 `sidebar.brand.name` 后，外壳自带的版本徽标不再渲染，版本号由 `BRAND_VERSION`
  携带，需要你自己跟进（见上）。

## 卸载

```sh
dsh plugin --profile desktop remove dsh-brand-image
```

## 图片版权

`assets/brand.jpg` 是随仓库附带的占位图。**发布前请确认你对所用图片拥有使用权。**
若该插画来自他人作品，请替换为你自己有权使用的图片，或在 README 中注明作者、来源与授权方式。
代码本身是 MIT，图片不在 MIT 授权范围内。

## License

MIT
