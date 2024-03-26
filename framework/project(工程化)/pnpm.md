# pnpm
## 优势
- 基于**链接**模式的包管理方式
- 包安装速度极快；
- 磁盘空间利用非常高效。
- 支持 monorepo
- 安全性高
## 结构
### pnpm生成node_modules主要分为两个步骤
#### 基于硬连接的node_modules
```json
.
└── node_modules
    └── .pnpm
        ├── foo@1.0.0
        │   └── node_modules
        │       └── foo -> <store>/foo
        └── bar@1.0.0
            └── node_modules
                └── bar -> <store>/bar
```
- 结构与npm/yarn的结构完全不同，第一手node_modules下面的唯一文件夹叫做.pnpm
- 在.pnpm下面是一个<PACKAGE_NAME＠VERSION>文件夹
- 而在其下面<PACKAGE_NAME>的文件夹是一个content-addressable store的硬链接
#### 用于依赖解析的软链接
- 用于在foo内引用bar的软链接
- 在项目里引用foo的软链接
```json
.
└── node_modules
    ├── foo -> ./.pnpm/foo@1.0.0/node_modules/foo
    └── .pnpm
        ├── foo@1.0.0
        │   └── node_modules
        │       ├── foo -> <store>/foo
        │       └── bar -> ../../bar@1.0.0/node_modules/bar
        └── bar@1.0.0
            └── node_modules
                └── bar -> <store>/bar
```
#### 本质
- 本质上 pnpm 的 node_modules 结构是个网状 + 平铺的目录结构。这种依赖结构主要基于软连接(即 symlink)的方式来完成。
- pnpm 是通过 hardlink 在全局里面搞个 store 目录来存储 node_modules 依赖里面的 hard link 地址，然后在引用依赖的时候则是通过 symlink 去找到对应虚拟磁盘目录下(.pnpm 目录)的依赖地址
