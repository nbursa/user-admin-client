<script setup lang="ts"></script>

<template>
  <main class="home">
    <section class="hero">
      <h1>Welcome to the User Management Panel</h1>
      <p>This is a lightweight admin interface built with Vue 3 and Element Plus.</p>
      <p>
        Use the sidebar or navigation above to manage users, add new entries, or explore app
        features.
      </p>
    </section>

    <section class="features">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover">
            <h3>User Listing</h3>
            <p>Search, paginate, and browse all users in the system.</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <h3>Create & Edit Users</h3>
            <p>Add new users or modify existing ones using built-in validation rules.</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <h3>Responsive & Clean</h3>
            <p>Fully styled with Element Plus components and mobile-ready layout.</p>
          </el-card>
        </el-col>
      </el-row>
    </section>
  </main>
</template>

<style scoped>
.home {
  padding: 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.features {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
