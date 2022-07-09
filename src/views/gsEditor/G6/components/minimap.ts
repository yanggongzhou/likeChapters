import G6 from "@antv/g6";

export const storyMinimap = () => (
  new G6.Minimap({
    container: 'storyMiniMap',
    size: [250, 200],
  })
);
