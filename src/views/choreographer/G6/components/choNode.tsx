import { ModelConfig } from "@antv/g6-core/lib/types";
import { ShapeDefine, ShapeOptions } from "@antv/g6-core/lib/interface/shape";
import G6 from "@antv/g6";
import { ITemplate, TemplateTypeZhEnum } from "@/store/modules/result.model";
import { fittingString } from "@/views/gsEditor/G6/components/storyNode";

const CustomNode = (cfg: ModelConfig & { info: ITemplate }): ShapeOptions | ShapeDefine => {
  const typeName = TemplateTypeZhEnum[cfg.info.type]
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
            marginLeft: 30,
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
        <text style={ { marginTop: 5, marginLeft: 10, fill: '#333' } }> ${fittingString(cfg.info.content || '')} </text>
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
