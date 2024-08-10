/*@jsxRuntime automatic @jsxImportSource react*/
import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from "react/jsx-runtime";
function MDXContent(props = {}) {
  const _components = Object.assign(
      {
        h1: "h1",
        a: "a",
        span: "span",
      },
      props.components
    ),
    { wrapper: MDXLayout } = _components;
  const _content = _jsx(_Fragment, {
    children: _jsxs(_components.h1, {
      id: "test",
      children: [
        "test",
        _jsx(_components.a, {
          className: "anchor",
          href: "#test",
          children: _jsx(_components.span, {
            className: "icon icon-link",
          }),
        }),
      ],
    }),
  });
  return MDXLayout
    ? _jsx(
        MDXLayout,
        Object.assign({}, props, {
          children: _content,
        })
      )
    : _content;
}
export default MDXContent;
