import G6 from "@antv/g6";
import { IG6GraphEvent, Item } from "@antv/g6-core";
import '@/views/editor/G6/components/index.less'
import { ElMessageBox, ElMessage } from "element-plus";
import storyBus from "@/utils/storyBus";
import { Path } from "@intlify/core-base";

enum MenuBtnEnum {
  ADDNODE = 'add',
  INSERTNODE = 'insert',
  EDIT = 'edit',
  DELETE = 'del',
  ADDEDGE = 'edge'
}
export const storyNodeMenu = (t: (key: Path | number) => string) => new G6.Menu({
  getContent (evt?: IG6GraphEvent): HTMLDivElement | string {
    return `<div class="storyMenuWarp">
        <div class="item" data-type="${MenuBtnEnum.ADDNODE}">${t('g6.addNode')}</div>
        <div class="item" data-type="${MenuBtnEnum.INSERTNODE}">${t('g6.insertNode')}</div>
         <div class="item" data-type="${MenuBtnEnum.ADDEDGE}">${t('g6.addOption')}</div>
        <div class="item del-btn" data-type="${MenuBtnEnum.DELETE}">${t('g6.delNode')}</div>
    </div>`;
  },
  handleMenuClick: (target: HTMLElement, item: Item) => {
    // console.log(target, item, target.dataset);
    if (target.dataset.type === MenuBtnEnum.ADDNODE) {
      storyBus.emit('G6/AddNode', item)
    }
    if (target.dataset.type === MenuBtnEnum.INSERTNODE) {
      storyBus.emit('G6/InsertNode', item)
    }
    if (target.dataset.type === MenuBtnEnum.ADDEDGE) {
      storyBus.emit('G6/AddEdge', item)
    }
    if (target.dataset.type === MenuBtnEnum.DELETE) {
      ElMessageBox.confirm(
        'proxy will permanently delete the file. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          storyBus.emit('G6/DeleteNode', item)
          ElMessage({
            type: 'success',
            message: 'Delete completed',
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    }
  },
  // offsetX and offsetY include the padding of the parent container
  // 需要加上父级容器的 padding-left 16 与自身偏移量 10
  offsetX: 10,
  // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
  offsetY: 5,
  // the types of items that allow the menu show up
  // 在哪些类型的元素上响应
  itemTypes: ['node'],
});

export const storyEdgeMenu = (t: (key: Path | number) => string) => new G6.Menu({
  getContent (evt?: IG6GraphEvent): HTMLDivElement | string {
    return `<div class="storyMenuWarp">
        <div class="item" data-type="${MenuBtnEnum.EDIT}">${t('g6.editOption')}</div>
        <div class="item del-btn" data-type="${MenuBtnEnum.DELETE}">${t('g6.delOption')}</div>
    </div>`;
  },
  handleMenuClick: (target: HTMLElement, item: Item) => {
    // console.log(target, item, target.dataset);
    if (target.dataset.type === MenuBtnEnum.EDIT) {
      storyBus.emit('G6/EditOption', item)
    }
    if (target.dataset.type === MenuBtnEnum.DELETE) {
      ElMessageBox.confirm(
        'proxy will permanently delete the file. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          storyBus.emit('G6/DeleteOption', item)
          ElMessage({
            type: 'success',
            message: 'Delete completed',
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    }
  },
  // offsetX and offsetY include the padding of the parent container
  // 需要加上父级容器的 padding-left 16 与自身偏移量 10
  offsetX: 10,
  // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
  offsetY: 5,
  // the types of items that allow the menu show up
  // 在哪些类型的元素上响应
  itemTypes: ['edge'],
});
