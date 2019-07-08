<template>
    <div id="project">
        <div class="list" id="list">
            <VueDragResize v-for="(rect, index) in rects"
                           :key="index"
                           :w="rect.width"
                           :h="rect.height"
                           :x="rect.left"
                           :y="rect.top"
                           :parentW="listWidth"
                           :parentH="listHeight"
                           :axis="rect.axis"
                           :isActive="rect.active"
                           :minw="rect.minw"
                           :minh="rect.minh"
                           :isDraggable="rect.draggable"
                           :isResizable="rect.resizable"
                           :parentLimitation="rect.parentLim"
                           :snapToGrid="rect.snapToGrid"
                           :aspectRatio="rect.aspectRatio"
                           :z="rect.zIndex"
                           v-on:activated="activateEv(index)"
                           v-on:deactivated="deactivateEv(index)"
                           v-on:dragging="changePosition($event, index)"
                           v-on:resizing="changeSize($event, index)"
            >
                <div class="filler" :style="{backgroundColor:rect.color}">
                    <p></p>
                </div>
            </VueDragResize>
        </div>
        <button @click="addRect"> + </button>
        <toolbar></toolbar>
    </div>
</template>

<style>
    body {
        /* height: 100vh;
        width: 100vw; */
        background-color: #ECECEC;
    }
    #project {
        margin: 0;
        box-sizing: border-box;
        width: 100%;
        /* height: 1008px; */
        position: relative;
        font-family: 'Lato', sans-serif;
    }
    .filler {
        width: 100%;
        height: 100%;
        display: inline-block;
        position: absolute;
        left: 0;
    }
    .list {
        position: absolute;
        top: 30px;
        bottom: 30px;
        left: 30px;
        right: 300px;
        width: 640px;
        height: 1008px;
        box-shadow: 0 0 2px #AAA;
        background-color: white;
    }
</style>

<script>
    // import VueDragResize from '@/components/vue-drag-resize.vue';
    import VueDragResize from 'vue-drag-resize';
    import toolbar from '@/components/toolbar/toolbar.vue';
    import '@/icons';
    export default {
        name: 'project',
        components: {
            VueDragResize,
            toolbar
        },
        data(){
            return {
                listWidth: 0,
                listHeight: 0
            }
        },
        mounted() {
            let listEl = document.getElementById('list');
            this.listWidth = listEl.clientWidth;
            this.listHeight = listEl.clientHeight;
            window.addEventListener('resize', ()=>{
                this.listWidth = listEl.clientWidth;
                this.listHeight = listEl.clientHeight;
            })
        },
        computed: {
            rects() {
                return this.$store.state.rect.rects
            }
        },
        methods: {
            addRect() {
                this.$store.dispatch('rect/addRect');
            },
            activateEv(index) {
                this.$store.dispatch('rect/setActive', {id: index});
            },
            deactivateEv(index) {
                this.$store.dispatch('rect/unsetActive', {id: index});
            },
            changePosition(newRect, index) {
                this.$store.dispatch('rect/setTop', {id: index, top: newRect.top});
                this.$store.dispatch('rect/setLeft', {id: index, left: newRect.left});
                this.$store.dispatch('rect/setWidth', {id: index, width: newRect.width});
                this.$store.dispatch('rect/setHeight', {id: index, height: newRect.height});
            },
            changeSize(newRect, index) {
                this.$store.dispatch('rect/setTop', {id: index, top: newRect.top});
                this.$store.dispatch('rect/setLeft', {id: index, left: newRect.left});
                this.$store.dispatch('rect/setWidth', {id: index, width: newRect.width});
                this.$store.dispatch('rect/setHeight', {id: index, height: newRect.height});
            }
        }
    }
</script>