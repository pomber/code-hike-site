// based on https://github.com/dimitrisnl/nord-wave/blob/master/themes/Nord%20Wave-color-theme.json

export default {
  name: "code-hike-docs",
  type: "dark",
  colors: {
    "editor.background": "#212121",
    "editor.foreground": "#d8dee9ff",
    "tab.activeForeground": "#ffffff",
    "tab.activeBackground": "#212121",
    "tab.inactiveBackground": "#292929",
    "tab.inactiveForeground": "#a0a0a0",
    // "tab.activeBorder": "#88c0d0",
    // "tab.border": "#212121",
    "editorGroup.border": "#1f1f1f",
    "editorGroupHeader.tabsBackground": "#323232",
    "editorLineNumber.foreground": "#aaaaaa",
    "editor.selectionBackground": "#61616150",
    "editor.selectionHighlightBackground": "#292929",
    "sideBar.border": "#444444",
    "sideBar.background": "#292929",
    "sideBar.foreground": "#a0a0a0",
    "list.hoverForeground": "#ffffff",
    "list.hoverBackground": "#323232",
    "codeHike.buttons": "#949494",
  },
  tokenColors: [
    {
      settings: {
        foreground: "#d8dee9ff",
        background: "#212121",
      },
    },
    {
      scope: "emphasis",
      settings: {
        fontStyle: "italic",
      },
    },
    {
      scope: "strong",
      settings: {
        fontStyle: "bold",
      },
    },
    {
      name: "Comment",
      scope: "comment",
      settings: {
        foreground: "#99a3b6",
      },
    },
    {
      name: "Constant Character",
      scope: "constant.character",
      settings: {
        foreground: "#EBCB8B",
      },
    },
    {
      name: "Constant Character Escape",
      scope: "constant.character.escape",
      settings: {
        foreground: "#EBCB8B",
      },
    },
    {
      name: "Constant Language",
      scope: "constant.language",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "Constant Numeric",
      scope: "constant.numeric",
      settings: {
        foreground: "#B48EAD",
      },
    },
    {
      name: "Constant Regexp",
      scope: "constant.regexp",
      settings: {
        foreground: "#EBCB8B",
      },
    },
    {
      name: "Entity Name Class/Type",
      scope: ["entity.name.class", "entity.name.type.class"],
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "Entity Name Function",
      scope: "entity.name.function",
      settings: {
        foreground: "#88C0D0",
      },
    },
    {
      name: "Entity Name Tag",
      scope: "entity.name.tag",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "Entity Other Attribute Name",
      scope: "entity.other.attribute-name",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "Entity Other Inherited Class",
      scope: "entity.other.inherited-class",
      settings: {
        fontStyle: "bold",
        foreground: "#8FBCBB",
      },
    },
    {
      name: "Invalid Deprecated",
      scope: "invalid.deprecated",
      settings: {
        foreground: "#D8DEE9",
        background: "#EBCB8B",
      },
    },
    {
      name: "Invalid Illegal",
      scope: "invalid.illegal",
      settings: {
        foreground: "#D8DEE9",
        background: "#BF616A",
      },
    },
    {
      name: "Keyword",
      scope: "keyword",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "Keyword Operator",
      scope: "keyword.operator",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "Keyword Other New",
      scope: "keyword.other.new",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "Markup Bold",
      scope: "markup.bold",
      settings: {
        fontStyle: "bold",
      },
    },
    {
      name: "Markup Changed",
      scope: "markup.changed",
      settings: {
        foreground: "#EBCB8B",
      },
    },
    {
      name: "Markup Deleted",
      scope: "markup.deleted",
      settings: {
        foreground: "#BF616A",
      },
    },
    {
      name: "Markup Inserted",
      scope: "markup.inserted",
      settings: {
        foreground: "#A3BE8C",
      },
    },
    {
      name: "Meta Preprocessor",
      scope: "meta.preprocessor",
      settings: {
        foreground: "#5E81AC",
      },
    },
    {
      name: "Punctuation",
      scope: "punctuation",
      settings: {
        foreground: "#ECEFF4",
      },
    },
    {
      name: "Punctuation Definition Parameters",
      scope: [
        "punctuation.definition.method-parameters",
        "punctuation.definition.function-parameters",
        "punctuation.definition.parameters",
      ],
      settings: {
        foreground: "#ECEFF4",
      },
    },
    {
      name: "Punctuation Definition Tag",
      scope: "punctuation.definition.tag",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "Punctuation Definition Comment",
      scope: [
        "punctuation.definition.comment",
        "punctuation.end.definition.comment",
        "punctuation.start.definition.comment",
      ],
      settings: {
        foreground: "#4C566A",
      },
    },
    {
      name: "Punctuation Section",
      scope: "punctuation.section",
      settings: {
        foreground: "#ECEFF4",
      },
    },
    {
      name: "Punctuation Section Embedded",
      scope: [
        "punctuation.section.embedded.begin",
        "punctuation.section.embedded.end",
      ],
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "Punctuation Terminator",
      scope: "punctuation.terminator",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "Punctuation Variable",
      scope: "punctuation.definition.variable",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "Storage",
      scope: "storage",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "String",
      scope: "string",
      settings: {
        foreground: "#A3BE8C",
      },
    },
    {
      name: "String Regexp",
      scope: "string.regexp",
      settings: {
        foreground: "#EBCB8B",
      },
    },
    {
      name: "Support Class",
      scope: "support.class",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "Support Constant",
      scope: "support.constant",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "Support Function",
      scope: "support.function",
      settings: {
        foreground: "#88C0D0",
      },
    },
    {
      name: "Support Function Construct",
      scope: "support.function.construct",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "Support Type",
      scope: "support.type",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "Support Type Exception",
      scope: "support.type.exception",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "Token Debug",
      scope: "token.debug-token",
      settings: {
        foreground: "#b48ead",
      },
    },
    {
      name: "Token Error",
      scope: "token.error-token",
      settings: {
        foreground: "#bf616a",
      },
    },
    {
      name: "Token Info",
      scope: "token.info-token",
      settings: {
        foreground: "#88c0d0",
      },
    },
    {
      name: "Token Warning",
      scope: "token.warn-token",
      settings: {
        foreground: "#ebcb8b",
      },
    },
    {
      name: "Variable",
      scope: "variable.other",
      settings: {
        foreground: "#D8DEE9",
      },
    },
    {
      name: "Variable Language",
      scope: "variable.language",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "Variable Parameter",
      scope: "variable.parameter",
      settings: {
        foreground: "#D8DEE9",
      },
    },
    {
      name: "[C/CPP] Punctuation Separator Pointer-Access",
      scope: "punctuation.separator.pointer-access.c",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "[C/CPP] Meta Preprocessor Include",
      scope: [
        "source.c meta.preprocessor.include",
        "source.c string.quoted.other.lt-gt.include",
      ],
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[C/CPP] Conditional Directive",
      scope: [
        "source.cpp keyword.control.directive.conditional",
        "source.cpp punctuation.definition.directive",
        "source.c keyword.control.directive.conditional",
        "source.c punctuation.definition.directive",
      ],
      settings: {
        foreground: "#5E81AC",
        fontStyle: "bold",
      },
    },
    {
      name: "[CSS] Constant Other Color RGB Value",
      scope: "source.css constant.other.color.rgb-value",
      settings: {
        foreground: "#B48EAD",
      },
    },
    {
      name: "[CSS](Function) Meta Property-Value",
      scope: "source.css meta.property-value",
      settings: {
        foreground: "#88C0D0",
      },
    },
    {
      name: "[CSS] Media Queries",
      scope: [
        "source.css keyword.control.at-rule.media",
        "source.css keyword.control.at-rule.media punctuation.definition.keyword",
      ],
      settings: {
        foreground: "#D08770",
      },
    },
    {
      name: "[CSS] Punctuation Definition Keyword",
      scope: "source.css punctuation.definition.keyword",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "[CSS] Support Type Property Name",
      scope: "source.css support.type.property-name",
      settings: {
        foreground: "#D8DEE9",
      },
    },
    {
      name: "[diff] Meta Range Context",
      scope: "source.diff meta.diff.range.context",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[diff] Meta Header From-File",
      scope: "source.diff meta.diff.header.from-file",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[diff] Punctuation Definition From-File",
      scope: "source.diff punctuation.definition.from-file",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[diff] Punctuation Definition Range",
      scope: "source.diff punctuation.definition.range",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[diff] Punctuation Definition Separator",
      scope: "source.diff punctuation.definition.separator",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "[Go] String Format Placeholder",
      scope: "source.go constant.other.placeholder.go",
      settings: {
        foreground: "#EBCB8B",
      },
    },
    {
      name: "[Java](JavaDoc) Comment Block Documentation HTML Entities",
      scope:
        "source.java comment.block.documentation.javadoc punctuation.definition.entity.html",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "[Java](JavaDoc) Constant Other",
      scope: "source.java constant.other",
      settings: {
        foreground: "#D8DEE9",
      },
    },
    {
      name: "[Java](JavaDoc) Keyword Other Documentation",
      scope: "source.java keyword.other.documentation",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[Java](JavaDoc) Keyword Other Documentation Author",
      scope: "source.java keyword.other.documentation.author.javadoc",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[Java](JavaDoc) Keyword Other Documentation Directive/Custom",
      scope: [
        "source.java keyword.other.documentation.directive",
        "source.java keyword.other.documentation.custom",
      ],
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[Java](JavaDoc) Keyword Other Documentation See",
      scope: "source.java keyword.other.documentation.see.javadoc",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[Java] Meta Method-Call",
      scope: "source.java meta.method-call meta.method",
      settings: {
        foreground: "#88C0D0",
      },
    },
    {
      name: "[Java](JavaDoc) Meta Tag Template Link",
      scope: [
        "source.java meta.tag.template.link.javadoc",
        "source.java string.other.link.title.javadoc",
      ],
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[Java](JavaDoc) Meta Tag Template Value",
      scope: "source.java meta.tag.template.value.javadoc",
      settings: {
        foreground: "#88C0D0",
      },
    },
    {
      name: "[Java](JavaDoc) Punctuation Definition Keyword",
      scope: "source.java punctuation.definition.keyword.javadoc",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[Java](JavaDoc) Punctuation Definition Tag",
      scope: [
        "source.java punctuation.definition.tag.begin.javadoc",
        "source.java punctuation.definition.tag.end.javadoc",
      ],
      settings: {
        foreground: "#4C566A",
      },
    },
    {
      name: "[Java] Storage Modifier Import",
      scope: "source.java storage.modifier.import",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[Java] Storage Modifier Package",
      scope: "source.java storage.modifier.package",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[Java] Storage Type",
      scope: "source.java storage.type",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[Java] Storage Type Annotation",
      scope: "source.java storage.type.annotation",
      settings: {
        foreground: "#D08770",
      },
    },
    {
      name: "[Java] Storage Type Generic",
      scope: "source.java storage.type.generic",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[Java] Storage Type Primitive",
      scope: "source.java storage.type.primitive",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "[JavaScript] Decorator",
      scope: [
        "source.js punctuation.decorator",
        "source.js meta.decorator variable.other.readwrite",
        "source.js meta.decorator entity.name.function",
      ],
      settings: {
        foreground: "#D08770",
      },
    },
    {
      name: "[JavaScript] Meta Object-Literal Key",
      scope: "source.js meta.object-literal.key",
      settings: {
        foreground: "#88C0D0",
      },
    },
    {
      name: "[JavaScript](JSDoc) Storage Type Class",
      scope: "source.js storage.type.class.jsdoc",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[JavaScript] String Template Literals Punctuation",
      scope:
        "source.js string.template punctuation.definition.template-expression",
      settings: {
        foreground: "#5E81AC",
      },
    },
    {
      name: "[JavaScript] String Template Literal Variable",
      scope: [
        "source.js string.template meta.template.expression support.variable.property",
        "source.js string.template meta.template.expression variable.other.object",
      ],
      settings: {
        foreground: "#D8DEE9",
      },
    },
    {
      name: "[JavaScript] Support Type Primitive",
      scope: "source.js support.type.primitive",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "[JavaScript] Variable Other Object",
      scope: "source.js meta.var.expr variable.other.object",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[JavaScript] Variable Other Read-Write Alias",
      scope: "source.js variable.other.readwrite.alias",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[HTML] Constant Character Entity",
      scope: "text.html.basic constant.character.entity.html",
      settings: {
        foreground: "#EBCB8B",
      },
    },
    {
      name: "[HTML] Constant Other Inline-Data",
      scope: "text.html.basic constant.other.inline-data",
      settings: {
        foreground: "#D08770",
        fontStyle: "italic",
      },
    },
    {
      name: "[HTML] Meta Tag SGML Doctype",
      scope: "text.html.basic meta.tag.sgml.doctype",
      settings: {
        foreground: "#5E81AC",
      },
    },
    {
      name: "[HTML] Punctuation Definition Entity",
      scope: "text.html.basic punctuation.definition.entity",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "[INI] Entity Name Section Group-Title",
      scope: "source.properties entity.name.section.group-title.ini",
      settings: {
        foreground: "#88C0D0",
      },
    },
    {
      name: "[INI] Punctuation Separator Key-Value",
      scope: "source.properties punctuation.separator.key-value.ini",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "[Markdown] Markup Fenced Code Block",
      scope: [
        "text.html.markdown markup.fenced_code.block",
        "text.html.markdown markup.fenced_code.block punctuation.definition",
      ],
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[Markdown] Markup Heading",
      scope: "markup.heading",
      settings: {
        foreground: "#88C0D0",
      },
    },
    {
      name: "[Markdown] Markup Inline",
      scope: [
        "text.html.markdown markup.inline.raw",
        "text.html.markdown markup.inline.raw punctuation.definition.raw",
      ],
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[Markdown] Markup Italic",
      scope: "text.html.markdown markup.italic",
      settings: {
        fontStyle: "italic",
      },
    },
    {
      name: "[Markdown] Markup List Numbered/Unnumbered",
      scope: "text.html.markdown beginning.punctuation.definition.list",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "[Markdown] Markup Quote Punctuation Definition",
      scope: "text.html.markdown beginning.punctuation.definition.quote",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[Markdown] Markup Quote Punctuation Definition",
      scope: "text.html.markdown markup.quote",
      settings: {
        foreground: "#4C566A",
      },
    },
    {
      name: "[Markdown] Punctuation Definition Heading",
      scope: "text.html.markdown punctuation.definition.heading",
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "[Markdown] Punctuation Definition Constant/String",
      scope: [
        "text.html.markdown punctuation.definition.constant",
        "text.html.markdown punctuation.definition.string",
      ],
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "[Markdown] String Other Link Description/Title",
      scope: [
        "text.html.markdown constant.other.reference.link",
        "text.html.markdown string.other.link.description",
        "text.html.markdown string.other.link.title",
      ],
      settings: {
        foreground: "#88C0D0",
      },
    },
    {
      name: "[PHP] Meta Function-Call Object",
      scope: [
        "source.php meta.function-call",
        "source.php meta.function-call.object",
      ],
      settings: {
        foreground: "#88C0D0",
      },
    },
    {
      name: "[Python] Decorator",
      scope: [
        "source.python entity.name.function.decorator",
        "source.python meta.function.decorator support.type",
      ],
      settings: {
        foreground: "#D08770",
      },
    },
    {
      name: "[Python] Function Call",
      scope: [
        "source.python meta.function-call",
        "source.python meta.function-call.generic",
      ],
      settings: {
        foreground: "#88C0D0",
      },
    },
    {
      name: "[Python] Support Type",
      scope: "source.python support.type",
      settings: {
        foreground: "#88C0D0",
      },
    },
    {
      name: "[Python] Function Parameter",
      scope: ["source.python variable.parameter.function.language"],
      settings: {
        foreground: "#D8DEE9",
      },
    },
    {
      name: "[Python] Function Parameter Special",
      scope: [
        "source.python meta.function.parameters variable.parameter.function.language.special.self",
      ],
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "[SCSS] Punctuation Definition Interpolation Bracket Curly",
      scope: [
        "source.css.scss punctuation.definition.interpolation.begin.bracket.curly",
        "source.css.scss punctuation.definition.interpolation.end.bracket.curly",
      ],
      settings: {
        foreground: "#81A1C1",
      },
    },
    {
      name: "[SCSS] Variable Interpolation",
      scope: "source.css.scss variable.interpolation",
      settings: {
        foreground: "#D8DEE9",
        fontStyle: "italic",
      },
    },
    {
      name: "[TypeScript] Decorators",
      scope: [
        "source.ts punctuation.decorator",
        "source.ts meta.decorator variable.other.readwrite",
        "source.ts meta.decorator entity.name.function",
        "source.tsx punctuation.decorator",
        "source.tsx meta.decorator variable.other.readwrite",
        "source.tsx meta.decorator entity.name.function",
      ],
      settings: {
        foreground: "#D08770",
      },
    },
    {
      name: "[TypeScript] Object-literal keys",
      scope: [
        "source.ts meta.object-literal.key",
        "source.tsx meta.object-literal.key",
      ],
      settings: {
        foreground: "#D8DEE9",
      },
    },
    {
      name: "[TypeScript] Object-literal functions",
      scope: [
        "source.ts meta.object-literal.key entity.name.function",
        "source.tsx meta.object-literal.key entity.name.function",
      ],
      settings: {
        foreground: "#88C0D0",
      },
    },
    {
      name: "[TypeScript] Type/Class",
      scope: [
        "source.ts support.class",
        "source.ts support.type",
        "source.ts entity.name.type",
        "source.ts entity.name.class",
        "source.tsx support.class",
        "source.tsx support.type",
        "source.tsx entity.name.type",
        "source.tsx entity.name.class",
      ],
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[TypeScript] Static Class Support",
      scope: [
        "source.ts support.constant.math",
        "source.ts support.constant.dom",
        "source.ts support.constant.json",
        "source.tsx support.constant.math",
        "source.tsx support.constant.dom",
        "source.tsx support.constant.json",
      ],
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[TypeScript] Variables",
      scope: ["source.ts support.variable", "source.tsx support.variable"],
      settings: {
        foreground: "#D8DEE9",
      },
    },
    {
      name: "[XML] Entity Name Tag Namespace",
      scope: "text.xml entity.name.tag.namespace",
      settings: {
        foreground: "#8FBCBB",
      },
    },
    {
      name: "[XML] Keyword Other Doctype",
      scope: "text.xml keyword.other.doctype",
      settings: {
        foreground: "#5E81AC",
      },
    },
    {
      name: "[XML] Meta Tag Preprocessor",
      scope: "text.xml meta.tag.preprocessor entity.name.tag",
      settings: {
        foreground: "#5E81AC",
      },
    },
    {
      name: "[XML] Entity Name Tag Namespace",
      scope: [
        "text.xml string.unquoted.cdata",
        "text.xml string.unquoted.cdata punctuation.definition.string",
      ],
      settings: {
        foreground: "#D08770",
        fontStyle: "italic",
      },
    },
    {
      name: "[YAML] Entity Name Tag",
      scope: "source.yaml entity.name.tag",
      settings: {
        foreground: "#8FBCBB",
      },
    },
  ],
};
