编写公共库是为外部使用者提供 .d.ts 接口声明
===

## 必要操作

_tsconfig.json_

```json
{
    "declaration": true
}
```

此时会将生成的 .d.ts 文件与编译生成的 .js 文件放在同一目录下:

_Ps: 此示例为无 webpack 状态下的编译结果_

```
dist
 |
 |- high-order
 |   |
 |   |- base.js
 |   |- base.d.ts
 |
 |- index.js
 |- index.d.ts
```

此时无需其他额外操作, 引用方安装当前库后便自动具备 API 提示功能.

## 个性化操作

_tsconfig.json_

```json
{
    "declarationDir": "types"
}
```

此配置可以将所有 .d.ts 文件生成到某一目录下:

```
root
 |
 |- dist
 |   |
 |   |- high-order
 |   |   |
 |   |   |- base.js
 |   |
 |   |- index.js
 |
 |- types
     |
     |- high-order
     |   |
     |   |- base.d.ts
     |
     |- index.d.ts
 
```

但此时也必须在 package.json 中声明 .d.ts 文件的位置:

```json
{
    "types": "types"
}
```

_用 `"typings": "types" 亦可_

## 示例操作指南

1. 在当前目录下 `npm install` 安装依赖

1. 在当前目录下 `npm run build` 编译

1. 在当前目录下 `npm link` 建立连接

1. 到 `user` 项目中 `npm install typescript`

    这里因为 typescript 中 `import` 的前提是安装了该库, 而 "安装" 的定义是 "node_modules 中存在该库" 且 "package.json 中有对此库的依赖"

    所以 `user` 项目的 `package.json` 中必须声明对 `export-library` 的依赖, 而该 demo 库我不可能发布, 所以只能在 `package.json` 里随便声明一下
    
    进而不能直接在该项目内 `npm install`

1. 在 `user` 项目中运行 `npm link export-library` 连接上面的库

1. 在 `user` 项目中运行 `npm run build`, 查看 .d.ts 文件独立存储的写法

1. 删除 `export-library/tsconfig.json` 中的 `declarationDir` 选项

    删除 `export-library/package.json` 中的 `types` 字段
    
1. 回到 `user` 项目中运行 `npm run build`, 查看 .d.ts 文件与 .js 文件混合存储的写法
