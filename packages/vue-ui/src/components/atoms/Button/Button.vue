<script setup lang="ts">
import { computed, useSlots, getCurrentInstance } from "vue";
import type ButtonProps from './Button.interfaces';

const { label = 'Vue Button' } = defineProps<ButtonProps>();

const emit = defineEmits(['click']);
const slots = useSlots();
const hasContentSlot = computed(() => !!slots?.default);

const hasClickEventListener = computed(() => !!getCurrentInstance()?.vnode.props?.onClick);

const handleClick = () => {
    if( hasClickEventListener ) emit('click');
    else console.log('Hello from Vue UI');
}
</script>

<template>
    <button @click="handleClick">
        <slot v-if="hasContentSlot"></slot>
        <span v-else>{{ label }}</span>
    </button>
</template>

<style lang="scss" scoped>
button{
    border: none;
    background: #42b883;
    color: #213547;
    transition: all .3s ease;
    padding: 12px 16px;
    border-radius: 32px;
    cursor: pointer;

    &:hover{
        opacity: .7;
    }
}
</style>
