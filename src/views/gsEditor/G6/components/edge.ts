import G6 from "@antv/g6";

export const storyEdge = () => ({
  // type: 'cubic-horizontal',
  // type: 'quadratic',
  size: 2,
  style: {
    cursor: 'pointer',
    endArrow: {
      fill: '#9191fd',
      stroke: '#9191fd',
      path: G6.Arrow.triangle(5, 10, 70), // 箭头
      d: 70
    },
  },
  labelCfg: {
    autoRotate: true,
    style: {
      cursor: 'pointer',
      fill: '#9191fd',
      fontSize: 12,
      fontWeight: 'blob',
      background: {
        fill: '#ffffff',
        stroke: '#9EC9FF',
        padding: [2, 2, 2, 2],
        radius: 3,
      },
    },
  },
})
