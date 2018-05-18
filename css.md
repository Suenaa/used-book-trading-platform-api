# CSS 布局问题

## 盒模型（每个元素都会被解析成布局盒子）

## 视觉格式化模型（处理盒子在视窗内如何显示）
- 尺寸与类型
  - 行内级盒子
  - 块级盒子
  - float 盒子
  - position 盒子
  - table 盒子
  - flex container 盒子
- 定位方案
  - 容器块（一般父元素作为子元素容器块）
      - 产生
        - 根元素
        - 
  - 格式化上下文
    - BFC
      - 规定块级子元素的排列
      - 垂直一个接一个，水平沾满空间
      - 垂直方向距离由上下margin决定，同属于一个BFC中的两个或者以上的相邻盒margin会重叠（不同不会）
      - 隔离的独立容器，子元素不会影响到外面
      - 包裹浮动元素高度
      - 创建条件
        - 根元素
    - IFC
      - 规定行内级子元素的排列
      - inline-block 的 margin padding 会撑开高度
      - 不包含一个块级
    - TFC
      - table 属于 BFC
      - inline-table 属于 IFC
      - table-layout
    - float
      - 设置之后自动为 display: block
    
    - position
      - 同一个堆叠上下文（absolute 
      
  - 常规流
    - BFC
    - IFC
    - GFC
    - TFC
    - FFC
    容器块（一般父元素作为子元素容器块）
      - 产生
        - 根元素
        - 
  - 浮动流
- 与其他元素的关系
- 其他（如 viewport）

