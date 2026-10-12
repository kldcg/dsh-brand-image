/**
 * dsh-brand-image — Client half.
 *
 * No build step: DSH loads this file as a Cordis client bundle through the
 * `dsh.client` declaration in package.json. The image is inlined as a data URL,
 * so the plugin needs no Host route, no network and no filesystem access.
 *
 * Regenerate the inline image:
 *   node tools/embed-image.mjs assets/brand.jpg
 */
window.__ModuleLoader__.load({
  id: "dsh-brand-image",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    const React = require("react");

    /** 本地图片位置 */
    const BRAND_IMAGE =
      "data:image/jpeg;base64,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";

    /** 图片大小默认为24px */
    const DEFAULT_SIZE = 24;

    /** 渲染图片 */
    function BrandImage(props) {
      const requested = props && props.size;
      const size =
        typeof requested === "number" && requested > 0 ? requested : DEFAULT_SIZE;
      const edge = size + "px";
      return React.createElement("img", {
        src: BRAND_IMAGE,
        alt: "DeepSeek Harness",
        draggable: false,
        width: size,
        height: size,
        style: {
          width: edge,
          height: edge,
          display: "block",
          objectFit: "cover",
          borderRadius: "6px",
          pointerEvents: "none",
          userSelect: "none"
        }
      });
    }

    /** Required service: the UI slot registry. */
    const inject = ["slots"];

    /**
     *填充侧边栏品牌插槽。
     *
     * `ctx.slots.inject` waits for the declaring package (ui-sidebar) to declare
     * the slot, so this works whether the plugin activates before or after the
     * declarer, and the fill is withdrawn when the declaration goes away.
     */
    /** Title shown beside the mark in the expanded brand row. */
    const BRAND_TITLE = "DeepSeek Harness";

    /** 直接复制官方品牌样式，保证在侧边栏收缩时的显示效果一致 */
    const WRAP_STYLE = {
      whiteSpace: "nowrap",
      flexDirection: "column",
      flex: "none",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "1px",
      height: "24px",
      display: "inline-flex"
    };
    const TITLE_STYLE = {
      letterSpacing: 0,
      fontSize: "12px",
      lineHeight: "13px"
    };
    const BADGE_STYLE = {
      height: "10px",
      color: "var(--dsw-alias-label-primary-inverted)",
      background: "var(--dsw-alias-label-primary)",
      fontFamily: "var(--ds-font-family-code)",
      whiteSpace: "nowrap",
      borderRadius: "2px",
      flex: "none",
      alignItems: "center",
      padding: "0 3px",
      fontSize: "6px",
      fontWeight: 500,
      lineHeight: "10px",
      display: "inline-flex"
    };

    function BrandName() {
      return React.createElement(
        "span",
        { style: WRAP_STYLE },
        React.createElement("span", { style: TITLE_STYLE }, BRAND_TITLE),
      );
    }

    /** 填充侧边栏品牌插槽 */
    function apply(ctx) {
      ctx.slots.inject("sidebar.brand.mark", () =>
        ctx.slots.register({ name: "sidebar.brand.mark" }, BrandImage)
      );
      ctx.slots.inject("sidebar.brand.name", () =>
        ctx.slots.register({ name: "sidebar.brand.name" }, BrandName)
      );
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  }
});
