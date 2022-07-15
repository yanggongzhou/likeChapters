import { ModelConfig } from "@antv/g6-core/lib/types";
import { ShapeDefine, ShapeOptions } from "@antv/g6-core/lib/interface/shape";
import G6 from "@antv/g6";
import { ISceneItem } from "@/interfaces/editor.interfaces";

/**
 * format the string
 * @param {string} str The origin string
 * @param {number} maxWidth max width
 * @param {number} fontSize font size
 * @return {string} the processed result
 */
export const fittingString = (str: string, maxWidth = 90, fontSize = 12) => {
  const ellipsis = '...';
  const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
  let currentWidth = 0;
  let res = str;
  const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
  str.split('').forEach((letter, i) => {
    if (currentWidth > maxWidth - ellipsisLength) return;
    if (pattern.test(letter)) {
      // Chinese charactors
      currentWidth += fontSize;
    } else {
      // get the width of single letter according to the fontSize
      currentWidth += G6.Util.getLetterWidth(letter, fontSize);
    }
    if (currentWidth > maxWidth - ellipsisLength) {
      res = `${str.substr(0, i)}${ellipsis}`;
    }
  });
  return res;
};

const CustomNode = (cfg: ModelConfig & { info: ISceneItem }): ShapeOptions | ShapeDefine => {
  // const typeName = TemplateTypeZhEnum[cfg.info.type]
  const typeName = cfg.info.sceneContent;
  return `
    <group style={{ cursor: 'pointer' }}>
      <rect style={{
          cursor: 'pointer'
      }}>
        <rect style={{
          cursor: 'pointer',
          width: 100,
          height: 20,
          fill: ${cfg.color},
          radius: [6, 6, 0, 0],
          stroke: ${cfg.color}
        }} draggable="true">
          <text style={{
            marginLeft: 20,
            fill: '#fff' }}>${typeName}</text>
        </rect>
        <rect style={{
          cursor: 'pointer',
          width: 100,
          height: 20,
          stroke: ${cfg.color},
          fill: '#ffffff',
          radius: [0, 0, 6, 6]
        }}>
        <text style={ { marginTop: 5, marginLeft: 10, fill: '#333' } }> ${fittingString(cfg.info.sceneContent || '')} </text>
        </rect>
      </rect>
    </group>`
}

G6.registerNode('cho-node', CustomNode);

export const ChoNode = () => {
  return {
    type: 'cho-node',
    color: '#9191fd',
  }
}
