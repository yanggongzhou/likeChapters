import G6 from "@antv/g6";

export const storyToolbar = () => (
  new G6.ToolBar({
    position: { x: 10, y: 10 },
    // getContent: () => {
    //   const outDiv = document.createElement('div');
    //   outDiv.style.width = '180px';
    //   outDiv.innerHTML = `<ul>
    //     <li code='zoom'>1:1</li>
    //     <li code='undo'>测试02</li>
    //     <li code='add'>测试03</li>
    //     <li code='add'>测试04</li>
    //   </ul>`
    //   return outDiv
    // },
    // handleClick: (code: string, graph: IAbstractGraph): void => {
    //   console.log(code, graph)
    //   if (code === 'zoom') {
    //     graph.zoom(0.5)
    //   }
    // },
  })
)
