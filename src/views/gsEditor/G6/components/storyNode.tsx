import { ModelConfig } from "@antv/g6-core/lib/types";
import { ShapeDefine, ShapeOptions } from "@antv/g6-core/lib/interface/shape";
import G6 from "@antv/g6";
import { INodeVOSItem } from "@/store/modules/index.model";
import diamond from '@/assets/img/diamond.png'
import { EBoolean } from "@/interfaces/common.interfaces";

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

const CustomNode = (cfg: ModelConfig & INodeVOSItem): ShapeOptions | ShapeDefine => {
  // <text style={{ marginTop: 10, marginLeft: 5, fill: '#333'}}>时间: ${formatTime(cfg.utime) || formatTime(cfg.ctime)}</text>
  const edgeTxt = () => (cfg.options || []).map((val, index) => {
    if (val.free === EBoolean.no) {
      return `<text style={ { marginTop: 5, marginLeft: 10, fill: '#333' } }> ${index + 1}. ${fittingString(val.content)}  <image name="img" style={{ img: ${diamond}, width: 12, height: 12,  marginLeft: 100,  marginTop: 4 }} /> </text>`
    } else {
      return `<text style={ { marginTop: 5, marginLeft: 10, fill: '#333' } }> ${index + 1}. ${fittingString(val.content)} </text>`
    }
  })
  return `
    <group style={{ cursor: 'pointer' }}>
      <rect style={{
          cursor: 'pointer'
      }}>
        <rect style={{
          cursor: 'pointer',
          width: 120,
          height: 20,
          fill: ${cfg.color},
          radius: [6, 6, 0, 0],
          stroke: ${cfg.color}
        }} draggable="true">
          <text style={{
            marginTop: 2,
            marginLeft: 60,
            textAlign: 'center',
            fontWeight: 'bold',
            fill: '#fff' }}>{{nodeName}}</text>
        </rect>
        <rect style={{
          cursor: 'pointer',
          width: 120,
          height: 55,
          stroke: ${cfg.color},
          fill: '#ffffff',
          radius: [0, 0, 6, 6]
        }}>
         ${edgeTxt()}
        </rect>
      </rect>
      <circle style={{
        stroke: ${cfg.color},
        r: 10,
        fill: '#fff',
        marginLeft: 60,
        cursor: 'pointer'
      }} name="circle">
        <text style={{ marginLeft: 55,  marginTop: -8, fill: ${cfg.color}, fontSize: 14, fontWeight: 600 }}>N</text>
      </circle>
    </group>`
}

G6.registerNode('story-node', CustomNode);

export const StoryNode = () => {
  return {
    type: 'story-node',
    color: '#9191fd',
  }
}
