<template>
    <el-container style="height: 100vh">
        <!-- 顶部导航栏 -->
        <el-header style="background-color: #409EFF; color: white;">
            <el-row justify="space-between" align="middle">
                <el-col :span="6">
                    <el-menu :default-active="activeMenu" mode="horizontal" background-color="#409EFF" text-color="white" active-text-color="#ffd04b">
                        <el-menu-item index="/" @click="goHome">首页</el-menu-item>
                        <el-menu-item index="/private" @click="checkLogin">私有页面</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-header>

        <!-- 主体内容 -->
        <el-main style="background-color: #f4f6f9; padding: 20px;">
            <el-row justify="center" align="middle" style="height: 100%;">
                <el-col :span="8">
                    <!-- 登录表单 -->
                    <div v-if="isLoginModalVisible">
                        <el-form :model="loginForm" ref="login1Form" :rules="rules" label-width="80px" class="login-form">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="loginForm.username"  placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="loginForm.password"  type="password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="login">登录</el-button>
                            </el-form-item>
                            <el-form-item >
                                <el-button type="info" @click="closeLoginModal" >取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/api/request'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 登录框控制
const isLoginModalVisible = ref(false)

const activeMenu = ref('/')

// 登录表单数据
const loginForm = ref({
    username: '',
    password: ''
})



// 登录表单验证规则
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
}

// 检查是否已登录
const checkLogin = () => {
    loginForm.value = {
        username: '',
        password: ''
    };

    const token = localStorage.getItem('token')
    if (token) {
        router.replace('/private') // 登录状态跳转到私有页面
    } else {
        isLoginModalVisible.value = true // 显示登录表单
    }
}

// 登录操作
const login = async () => {
    try {
        const data = await post('/login', { username: loginForm.value.username, password: loginForm.value.password })

        if (data.token) {
            localStorage.setItem('token', data.token)
            // 登录成功后跳转到 /private 并替换历史记录
            await router.replace('/private')
            closeLoginModal()
        } else {
            ElMessage.error(data.error || '登录失败')
        }
    } catch (error) {
        ElMessage.error('登录失败，请稍后再试')
    }
}

// 关闭登录表单
const closeLoginModal = () => {
    isLoginModalVisible.value = false
}


// 跳转首页
const goHome = () => {
    router.push('/')
    isLoginModalVisible.value = false
}
</script>

<style scoped>

.login-form {
    width: 100%;
}

.el-button {
    width: 100%;
}

.el-header {
    padding: 0 20px;
}

.el-menu {
    background-color: #409EFF;
    border: none;
}

.el-menu-item {
    color: white;
}

.el-menu-item:hover {
    background-color: #66b1ff;
}
</style>
