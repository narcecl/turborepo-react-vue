<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@narcecl/vue';

const count = ref<number>(0);

const increment = () => {
    console.log('Hello from Vue UI');
    count.value++;
}
</script>

<template>
    <Button
        :label="`This is a Vue Button - ${ count }`"
        @click="increment"
    />
</template>