<template>
    <div id="app">
        <v-head></v-head>
        <v-tabs class="tabs"></v-tabs>
        <keep-alive>
            <router-view/>
        </keep-alive>
        <v-player></v-player>
    </div>
</template>

<script>
import head from "components/head/head";
import tabs from "components/tabs/tabs";
import player from 'components/player/player'
export default {
    name: "App",
    components: {
        "v-head": head,
        "v-tabs": tabs,
        "v-player":player
    }
};
</script>
<style lang="stylus" scoped>
  #app
    position relative
</style>


