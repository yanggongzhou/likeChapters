<template>
  <div class="character-warp">
    <div class="character-list">
      <div class="title">
        {{ t('bookSource.characterList') }}
      </div>

      <ul class="list-box" v-if="characterList.length > 0">
        <li v-for="value in characterList" :key="value.id" class="list-item"
            @click="goCharacterCenter(value.id , value.bookId)">
          <ListAvatar :data-source="value?.dressUp?.[0]"></ListAvatar>
          <div class="character-name">
            <i v-if="value.mainCharacter === EBoolean.yes" class="gs-font gs-zhujiaose-"></i>
            <i class="gs-font"
               :class="{'gs-nanxing': value.sex === SexType.boy, 'gs-nvxing': value.sex === SexType.girl}"></i>
            <p class="name">{{ value.characterName }}</p>
          </div>
          <div>
            <el-button class="edit_btn" type="text" style="color: #9191fd" icon="EditPen"
                       @click.stop="editCharacter(value)"/>
            <el-button class="edit_btn" type="text" style="color: #9191fd" icon="Delete"
                       @click.stop="deleteCharacter(value)"/>
          </div>
        </li>
      </ul>

      <el-empty v-else :description="t('common.noData')"></el-empty>
    </div>
    <div class="foot-create" @click="createCharacter">
      <el-icon>
        <circle-plus-filled/>
      </el-icon>
      <span class="text">{{ t('bookSource.createCharacter') }}</span>
    </div>
    <EditCharacterDialog
      :visible="visible"
      @close="visible = false"
      @confirm="onConfirm"
      :form="characterForm"
      :dressUpItem="dressUpItem"
    ></EditCharacterDialog>
  </div>
</template>

<script lang="ts" setup>
import ListAvatar from './listAvatar.vue'
import { useI18n } from 'vue-i18n';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EditCharacterDialog from './editCharacter.vue'
import {
  AddCharacter, DeleteCharacter,
  EditCharacter, ListCharacter,
} from "@/api/characterCenter";
import { EBoolean } from "@/interfaces/common.interfaces";
import { ICharacterListItem, ICharacterParams, IDressUpItem, SexType } from "@/interfaces/character.interfaces";

const { t } = useI18n()
const visible = ref<boolean>(false)
const route = useRoute()
const router = useRouter()
const dressUpItem = ref<IDressUpItem | undefined>()
const bookId = computed(() => route.query.bookId as string)
const characterForm = reactive<ICharacterParams>({
  id: void 0,
  bookId: bookId.value,
  characterName: '',
  characterIntro: '',
  sex: SexType.boy,
  mainCharacter: EBoolean.no,
})

const characterList = ref<ICharacterListItem[]>([]);

// 创建角色
const createCharacter = () => {
  characterForm.id = void 0
  characterForm.characterName = ''
  characterForm.characterIntro = ''
  characterForm.sex = SexType.boy
  characterForm.mainCharacter = EBoolean.no
  dressUpItem.value = undefined
  visible.value = true
}
const editCharacter = async (obj: ICharacterListItem) => {
  visible.value = true
  characterForm.id = obj.id
  characterForm.characterName = obj.characterName
  characterForm.characterIntro = obj.characterIntro || ''
  characterForm.sex = obj.sex || SexType.boy
  characterForm.mainCharacter = obj.mainCharacter || EBoolean.no
  dressUpItem.value = undefined;
  if (obj.dressUp && obj.dressUp.length > 0) {
    dressUpItem.value = obj.dressUp[0]
  }
}

const deleteCharacter = async (value: ICharacterListItem) => {
  await DeleteCharacter(value.id)
  await goCharacterList();
}

const onConfirm = async (characterForm: ICharacterParams) => {
  visible.value = false;
  if (characterForm.id) {
    await EditCharacter(characterForm)
  } else {
    await AddCharacter(characterForm)
  }
  await goCharacterList()
}

const goCharacterCenter = (id: string, bookId: string) => {
  router.push({ path: '/characterCenter', query: { characterId: id, bookId } })
}

const goCharacterList = async () => {
  characterList.value = await ListCharacter(bookId.value)
}

onMounted(async () => {
  await goCharacterList()
})

</script>

<style lang="less" scoped>
.character-warp {
  background-color: #ffffff;
  box-shadow: 0 2px 4px #00152914;
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  .character-list {
    margin: 20px 20px 80px;
    height: calc(100% - 100px);
    overflow-y: auto;

    .title {
      font-size: 18px;
      font-weight: bold;
    }

    .list-box {
      margin-top: 20px;

      .list-item {
        padding: 10px;
        margin: 10px 2px;
        border-radius: 8px;
        cursor: pointer;
        transition: box-shadow .3s;
        display: grid;
        grid-template-columns: 60px auto 52px;
        align-items: center;
        grid-column-gap: 10px;

        &:hover {
          box-shadow: 0 1px 4px #f1f1ff;
        }

        .character-name {
          font-size: 14px;
          font-weight: 500;

          .name {
            width: 208px;
            margin-top: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .gs-zhujiaose- {
            color: #9191fd;
            margin-right: 10px;
          }

          .gs-nvxing {
            color: #f9a0e8;
          }

          .gs-nanxing {
            color: #9191fd;
          }
        }

        .edit_btn {
          opacity: 0;
          transition: opacity .3s;
        }

        &:hover .edit_btn {
          opacity: 1;
        }
      }
    }
  }

  .foot-create {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    box-shadow: 0 -2px 4px #00152914;
    font-size: 35px;
    color: #a5a5fa;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color .5s;
    cursor: pointer;

    .text {
      font-size: 16px;
      margin: 8px 0 0 8px;
      font-weight: 500;
    }

    &:hover {
      color: #9191fd;
    }
  }
}
</style>
