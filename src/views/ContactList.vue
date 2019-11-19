<template>
  <div>
    <!-- 联系人列表 -->
    <van-contact-list :list="list" @add="onAdd" @edit="onEdit" />
    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { ContactList, Toast, ContactEdit, Popup } from "vant";

export default {
  name: "demo",
  components: {
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit,
    [Popup.name]: Popup
  },
  data() {
    return {
      // {
      //     id: 1,
      //     name: '',
      //     tel: ''
      // }
      list: [], // 请求到的数据列表
      instance: null, // axios实例
      showEdit: false, // 编辑弹窗显隐
      editingContact: {}, // 编辑的内容
      isEdit: false // 新建或者编辑
    };
  },
  created() {
    this.instance = axios.create({
      baseURL: "http://localhost:9000/api",
      timeout: 1000
    });
    this.getList();
    console.log(this.$Http);
  },
  methods: {
    // 获取联系人列表
    // getList() {
    //   this.instance
    //     .get("/contactList")
    //     .then(res => {
    //       this.list = res.data.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       Toast("请求失败，请稍后重试");
    //     });
    // },
    async getList() {
      let res = await this.$Http.getContactList();
      this.list = res.data;
    },
    // 添加联系人
    onAdd() {
      this.showEdit = true;
      this.isEdit = false;
    },
    // 编辑联系人
    onEdit(info) {
      this.showEdit = true;
      this.isEdit = true;
      this.editingContact = info;
    },
    // 保存联系人
    async onSave(info) {
      if (this.isEdit) {
        // 保存编辑
        let res = await this.$Http.editContact(info);
        if (res.code === 200) {
          Toast("编辑成功！");
          this.showEdit = false;
          this.getList();
        }
      } else {
        // 保存新建
        let res = await this.$Http.newContactJson(info);
        if (res.code === 200) {
          Toast("新建成功！");
          this.showEdit = false;
          this.getList();
        }
      }
    },
    async onDelete(info) {
      let res = await this.$Http.delContact({
        id: info.id
      });
      if (res.code === 200) {
        Toast("删除成功！");
        this.showEdit = false;
        this.getList();
      }
    }
  }
};
</script>
