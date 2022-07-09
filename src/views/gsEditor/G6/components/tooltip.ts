import G6 from "@antv/g6";
import { IG6GraphEvent } from "@antv/g6-core";
import { ModelConfig } from "@antv/g6-core/lib/types";
import { INodeVOSItem } from "@/store/modules/index.model";

export const storyTooltip = () => new G6.Tooltip({
  offsetX: 10,
  offsetY: 10,
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ['node'],
  trigger: 'click',
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (evt?: IG6GraphEvent): HTMLDivElement => {
    const outDiv = document.createElement('div');

    const edgeTxt = () => ((evt?.item?.getModel() as ModelConfig & INodeVOSItem).options || []).map((val) => {
      return `<li style={ { marginTop: 5, marginLeft: 5, fill: '#333' } }> ${val.content} </li>`;
    }).join('')
    outDiv.style.width = 'fit-content';
    outDiv.innerHTML = `
      <b>${evt?.item?.getModel().label || evt?.item?.getModel().id}</b>
      <ul>
        ${edgeTxt()}
      </ul>`;
    return outDiv;
  },
});
