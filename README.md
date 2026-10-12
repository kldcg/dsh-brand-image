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

## 改标题

改 `lib/client.js` 顶部这两个常量：

```js
const BRAND_TITLE = "DeepSeek Harness";
```

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

## 限制

- 图片内联，改图必须重跑 `npm run embed` 并重装。目前没有设置页。
- 若原图是深色背景而你在浅色主题下使用，标志会呈现为一个深色圆——这是刻意的，不是 bug；要完全贴合请用透明背景 PNG。

## 卸载

```sh
dsh plugin --profile desktop remove dsh-brand-image
```


## License

MIT
