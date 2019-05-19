# nz

## Explore Target

No Duplicate Writings

## TODO

写一个 loader, 减少 router 部分的重复工作 // 编辑器无法识别,暂不进行

## 使用方法

@vue/cli 3 项目, `yarn serve`

## 计划

输出形式:

- 制作静态输出工具, 生成运行时所需 vue 模板文件, 去掉预计算以加速运行.(不知效果几何)

向上两层抽象:

1. 插件
   自定义指令等高级功能,使用中间件定制, 规避难以统一
2. 常规套路
   如布局,关联,切换
