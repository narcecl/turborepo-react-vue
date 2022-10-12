<template>
  <button :class="`button--${type}`" @click="handleClick">
    <slot v-if="hasContentSlot" />
    <span v-else>{{ label }}</span>
  </button>
</template>

<script>
export default{
  props: {
    type: { type: String, default: 'primary' },
    label: { type: String, default: 'Button' },
  },
  methods: {
    handleClick: function(){
      alert("Hello from Vue UI!");
    },
  },
  computed: {
    hasContentSlot: function(){
      return !!this.$slots.default;
    }
  }
}
</script>
