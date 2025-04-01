<template>
  <main class="home">
    <section class="intro">
      <h1 class="title">{{ $t('home.title') }}</h1>
      <p class="text">{{ $t('home.intro1') }}</p>
      <p class="text">{{ $t('home.intro2') }}</p>
    </section>

    <section class="features">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8">
          <el-card class="feature-card">
            <h3 class="feature-title">{{ $t('home.features.listing.title') }}</h3>
            <p>{{ $t('home.features.listing.desc') }}</p>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-card class="feature-card">
            <h3 class="feature-title">{{ $t('home.features.edit.title') }}</h3>
            <p>{{ $t('home.features.edit.desc') }}</p>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-card class="feature-card">
            <h3 class="feature-title">{{ $t('home.features.responsive.title') }}</h3>
            <p>{{ $t('home.features.responsive.desc') }}</p>
          </el-card>
        </el-col>
      </el-row>
    </section>
  </main>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding: 1rem;
  overflow: auto;
  box-sizing: border-box;
}

.intro {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.text {
  color: var(--color-text);
}

.features {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
}

.feature-card {
  color: var(--color-text);
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
  padding: 1rem;
  min-height: 12rem;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

@media screen and (min-width: 768px) {
  .home {
    padding: 2rem;
  }
}
</style>
