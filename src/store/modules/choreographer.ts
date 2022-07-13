import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { IChoreographerState, INodeVOSItem } from '@/store/modules/index.model';
import { ListChapterNode } from "@/api/gsEditor";
import storyBus from "@/utils/storyBus";
import { ISceneItem } from "@/interfaces/editor.interfaces";

@Module({
  dynamic: true,
  store,
  name: 'choreographer',
  namespaced: true
})
class CHOREOGRAPHER extends VuexModule implements IChoreographerState {
  public activeNodeId = '' // active的节点id
  public nodeVOS = [] as INodeVOSItem[]; // 章节的节点选项列表
  public chatInfo = [] as ISceneItem[]; // 最小节点

  @Mutation
  private SET_ACTIVENODEID(activeNodeId: string) {
    this.activeNodeId = activeNodeId
  }

  @Mutation
  private SET_NODEVOSLIST(list: INodeVOSItem[]) {
    this.nodeVOS = list
  }

  @Mutation
  private SET_CHATINFO(list: ISceneItem[]) {
    this.chatInfo = list
  }

  @Action
  public SetActiveNodeId(activeNodeId: string) {
    this.SET_ACTIVENODEID(activeNodeId)
  }

  @Action
  public SetChatInfo(list: ISceneItem[]) {
    this.SET_CHATINFO(list)
  }

  @Action({ rawError: true })
  public async GetChapterList({ bookId, chapterId }: { bookId: string | number, chapterId: string | number }) {
    const { nodeVOS = [] } = await ListChapterNode(bookId, chapterId)
    // const nodeVOS = [
    //   {
    //     id: 260,
    //     bookId: "179",
    //     chapterId: 432,
    //     chapterName: "chapter 1",
    //     nodeName: "node 1",
    //     content: "<p class=\"sceneheading\" id=\"r1652845501784d383\">Int scene 1</p><p class=\"narrator\" id=\"r1652845545038d201\">旁白</p><p class=\"character\" id=\"r1652845550149d201\">角色01</p><p class=\"expression\" id=\"r1652845576613d607\">Smile</p><p class=\"dialog\" id=\"r1652845579605d888\">对话1</p><p class=\"monologue\" id=\"r1652845592268d885\">内心联想</p>",
    //     nodeIntro: "",
    //     startNode: 1,
    //     totalNum: 16,
    //     ctime: 1652845501000,
    //     utime: 1653965723000,
    //     options: [
    //       {
    //         id: 327,
    //         bookId: "179",
    //         chapterId: 432,
    //         previousNodeId: 260,
    //         nextNodeId: 261,
    //         content: "A选项",
    //         optionType: "option_chat",
    //         free: 1,
    //         coin: 0,
    //         ctime: 1652845765000,
    //         utime: 1652845861000
    //       },
    //       {
    //         id: 328,
    //         bookId: "179",
    //         chapterId: 432,
    //         previousNodeId: 260,
    //         nextNodeId: 262,
    //         content: "B选项",
    //         optionType: "option_chat",
    //         free: 1,
    //         coin: 0,
    //         ctime: 1652845806000,
    //         utime: 1652845869000
    //       },
    //       {
    //         id: 334,
    //         bookId: "179",
    //         chapterId: 432,
    //         previousNodeId: 260,
    //         nextNodeId: 302,
    //         content: "option",
    //         optionType: "option_chat",
    //         free: 1,
    //         coin: 0,
    //         ctime: 1653965795000,
    //         utime: 1653965795000
    //       }
    //     ]
    //   },
    //   {
    //     id: 261,
    //     bookId: "179",
    //     chapterId: 432,
    //     chapterName: "chapter 1",
    //     nodeName: "node 1-1",
    //     content: "<p class=\"sceneheading\" id=\"r1652845754704d16\">seletion A</p><p class=\"narrator\" id=\"r1652845786284d842\">suh</p>",
    //     nodeIntro: "",
    //     startNode: 0,
    //     totalNum: 4,
    //     ctime: 1652845765000,
    //     utime: 1653896114000,
    //     options: [
    //       {
    //         id: 329,
    //         bookId: "179",
    //         chapterId: 432,
    //         previousNodeId: 261,
    //         nextNodeId: 263,
    //         content: "option",
    //         optionType: "option_chat",
    //         free: 1,
    //         coin: 0,
    //         ctime: 1652845882000,
    //         utime: 1652845882000
    //       }
    //     ]
    //   },
    //   {
    //     id: 262,
    //     bookId: "179",
    //     chapterId: 432,
    //     chapterName: "chapter 1",
    //     nodeName: "node 1-2",
    //     content: "<p class=\"sceneheading\" id=\"r1652845801582d11\">selection B</p><p class=\"narrator\" id=\"r1652845820554d889\">bbbbbbb</p><p class=\"narrator\" id=\"r1653896107381d247\">whdi</p><p class=\"narrator\" id=\"r1652845821945d266\"><br></p>",
    //     nodeIntro: "",
    //     startNode: 0,
    //     totalNum: 4,
    //     ctime: 1652845806000,
    //     utime: 1653896111000,
    //     options: [
    //       {
    //         id: 333,
    //         bookId: "179",
    //         chapterId: 432,
    //         previousNodeId: 262,
    //         nextNodeId: 264,
    //         content: "option",
    //         optionType: "option_chat",
    //         free: 1,
    //         coin: 0,
    //         ctime: 1652846966000,
    //         utime: 1652846966000
    //       }
    //     ]
    //   },
    //   {
    //     id: 263,
    //     bookId: "179",
    //     chapterId: 432,
    //     chapterName: "chapter 1",
    //     nodeName: "node 2",
    //     content: "<p class=\"sceneheading\" id=\"r1652845874887d643\">common 2</p><p class=\"narrator\" id=\"r1653896118632d957\">nothing2</p>",
    //     nodeIntro: "",
    //     startNode: 0,
    //     totalNum: 4,
    //     ctime: 1652845882000,
    //     utime: 1653896124000,
    //     options: [
    //       {
    //         id: 331,
    //         bookId: "179",
    //         chapterId: 432,
    //         previousNodeId: 263,
    //         nextNodeId: 264,
    //         content: "option",
    //         optionType: "option_chat",
    //         free: 1,
    //         coin: 0,
    //         ctime: 1652846816000,
    //         utime: 1652846816000
    //       }
    //     ]
    //   },
    //   {
    //     id: 264,
    //     bookId: "179",
    //     chapterId: 432,
    //     chapterName: "chapter 1",
    //     nodeName: "node3",
    //     content: "<p class=\"sceneheading\" id=\"r1652846812421d355\">end</p><p class=\"narrator\" id=\"r1653896136475d483\">end</p>",
    //     nodeIntro: "",
    //     startNode: 0,
    //     totalNum: 2,
    //     ctime: 1652846816000,
    //     utime: 1653896141000,
    //     options: []
    //   },
    //   {
    //     id: 302,
    //     bookId: "179",
    //     chapterId: 432,
    //     chapterName: "chapter 1",
    //     nodeName: "node 1-3",
    //     content: "<p class=\"sceneheading\" id=\"r1653965787727d647\">anther node</p><p class=\"narrator\" id=\"r1653965820928d254\">anther3</p>",
    //     nodeIntro: "",
    //     startNode: 0,
    //     totalNum: 4,
    //     ctime: 1653965795000,
    //     utime: 1653965829000,
    //     options: [
    //       {
    //         id: 335,
    //         bookId: "179",
    //         chapterId: 432,
    //         previousNodeId: 302,
    //         nextNodeId: 264,
    //         content: "option",
    //         optionType: "option_chat",
    //         free: 1,
    //         coin: 0,
    //         ctime: 1653965804000,
    //         utime: 1653965804000
    //       }
    //     ]
    //   }
    // ] as INodeVOSItem[]
    if (Array.isArray(nodeVOS) && nodeVOS.length > 0) {
      if (nodeVOS.findIndex(val => String(val.id) === this.activeNodeId) === -1) {
        this.SET_ACTIVENODEID(String(nodeVOS[0].id))
      }
      this.SET_NODEVOSLIST(nodeVOS)

      const g6ChoreographerData = {
        nodes: [],
        edges: []
      }
      storyBus.emit('ChoreographerModule/refreshData', g6ChoreographerData)
    }
  }
}

export const ChoreographerModule = getModule(CHOREOGRAPHER)
