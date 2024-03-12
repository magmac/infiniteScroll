<template>
  <ul class="box">
    <li class="item" v-for="(item, idx) in state.repos" :key="item.name">
      <div class="name">{{ item.name }}</div>
      <div class="description">{{ item.description }}</div>
      <div class="language">{{ item.language }}</div>
    </li>
  </ul>
  <div class="loading">{{ state.isEnd ? '沒有更多囉 ~~' : state.loading ? '載入中 ...' : '' }}</div>
  <div class="top" v-if="showTop" @click="top">▲</div>
</template>

<script setup>
import {
  onMounted, computed, reactive, ref,
} from 'vue';
import { useStore } from 'vuex';

const page = ref(1);
const showTop = ref(false);
const { dispatch, state: stateStore } = useStore();
const state = reactive({
  repos: computed(() => stateStore.repos),
  loading: computed(() => stateStore.loading),
  isEnd: computed(() => stateStore.isEnd),
});

const fetchData = (size) => {
  dispatch('fetchData', { page: page.value, per_page: size });
  page.value += (size / 10);
};

const top = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const scrollBehavior = () => {
  // 預留高度
  const defaultHeight = 30;
  // 滾動位置
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // 可視高度
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  // 總高度
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  // 判斷底部讀取資料
  if (scrollTop + clientHeight + defaultHeight >= scrollHeight) fetchData(10);
  // 超過 2 倍螢幕高顯示 top
  showTop.value = (scrollTop > clientHeight * 2);
};

onMounted(async () => {
  fetchData(30);
  window.addEventListener('scroll', () => {
    if (state.isEnd) return;
    if (!state.loading) scrollBehavior();
  });
});
</script>

<style scoped>
*, *::before, *::after{
    box-sizing: border-box; /* Set the sizing of an element to include it's border */
}

*{
    margin: 0; /* Set the default margin to 0 */
    padding: 0; /* Set the default padding to 0 */
}

ul[role='list'], ol[role='list']{
    list-style: none; /* Turn off numbered and unordered list decoration */
}

html:focus-within{
    scroll-behavior: smooth; /* Make the scrolling inside of any scrollable element smooth */
}

.box {
  width: 640px;
  margin: 30px auto 10px auto;
}
.item {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #999;
}
.item:last-child {
  border: 0 none;
}
.name {
  color: #2f81f7;
  width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 15px;
}
.description {
  flex: 1;
}

.language {
  width: 80px;
  font-size: 12px;
  padding-left: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #666;
}
.loading {
  text-align: center;
  margin-bottom: 20px;
  color: #666;
}
.top {
 position: fixed;
 right: 30px;
 bottom: 30px;
 display: flex;
 align-items: center;
 justify-content: center;
 width: 30px;
 height: 30px;
 border-radius: 50%;
 border: 1px solid #999;
 cursor: pointer;
}
</style>
