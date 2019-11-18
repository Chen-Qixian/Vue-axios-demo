<template>
  <div>
    This demo is to introduce axios methods.
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'axios methods',
  created() {
    // get
    axios.get('/data.json').then((res) => {
      console.log(res);
    })
    axios.get('/data.json', {
        params: {
            id: 12
        }
    }).then((res) => {
      console.log(res);
    })
    axios({
        method: 'get',
        url:'/data.json',
        params: {
            id: 13
        }
    }).then(res => {
        console.log(res);
    })
    // post：新建数据发送
    // form-data表单提交（图片上传，文件上传）
    // application / json
    let data = {
        id: 233
    }
    axios.post('/post', data).then(res => {
        console.log(res);
    });
    axios({
        method: 'post',
        url: '/post',
        data: data
    }).then(res => {
        console.log(res);
    })
    // form-data 请求
    let formData = new FormData();
    for(let key in data) {
        formData.append(key, data[key]);
    }
    axios.post('/post', formData).then(res => {
        console.log(res);
    })
    axios({
        method: 'post',
        url: '/post',
        data: formData
    })
    // put:更新数据（整段）
    axios.put('/put', data).then(res => {
        console.log(res);
    })
    //patch：更新数据（部分）
    axios.patch('/patch', data).then(res => {
        console.log(res);
    })
    // delete
    axios.delete('/delete', {
        params: {
            id: 12
        }
    }).then(res => {
        console.log(res);
    })

    axios.delete('/delete', {
        data: {
            id: 12
        }
    }).then(res => {
        console.log(res);
    })

    axios({
        method: 'delete',
        url: '/delete',
        params: {
            id: 12
        },
        data: {}
    }).then(res => {
        console.log(res);
    })
  }
}
</script>
