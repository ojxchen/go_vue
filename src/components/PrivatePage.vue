<template>
    <div> <p>欢迎进入私有页面</p></div>
    <div> <p>欢迎进入私有页面</p></div>
    <div> <p>欢迎进入私有页面</p></div>
    <div> <p>欢迎进入私有页面</p></div>
    <div> <p>欢迎进入私有页面</p></div>
    <div> <p>欢迎进入私有页面</p></div>
    <div> <p>欢迎进入私有页面</p></div>
    <div> <p>欢迎进入私有页面</p></div>
    <div> <p>欢迎进入私有页面</p></div>
    <el-form-item >
        <el-button type="danger" @click="logout" >退出</el-button>
    </el-form-item>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {onMounted} from "vue";

const router = useRouter()

const logout = () => {
    localStorage.clear();
    router.push('/')
}

onMounted(() => {
    const token = localStorage.getItem('token')
    if (token) {
        // 如果已登录，直接跳转到 /private
        router.replace('/private')
    } else {
        // 未登录，跳转到首页
        router.replace('/')
    }
})
</script>

<style scoped>


</style>