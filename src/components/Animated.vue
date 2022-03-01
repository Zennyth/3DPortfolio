<template>
  <div ref="target">
    <transition-group
      v-if="group"
      appear
      @before-enter="fadeUpIndexOnBeforeEnter"
      @enter="fadeUpIndexOnEnter"
    >
      <template v-appear="animate">
        <slot />
      </template>
    </transition-group>
    <transition
      v-else
      appear
      @before-enter="fadeUpIndexOnBeforeEnter"
      @enter="fadeUpIndexOnEnter"
    >
      <div v-appear="animate" :data-index="index" class="animated-component">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="js">
import animations from "@/mixins/animations";
import { onMounted, ref } from 'vue';
export default {
  name: 'animated',
  mixins: [animations],
  props: {
    index: {
      type: Number,
      default: 0
    },
    group: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const target = ref();
    const animate = ref(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        animate.value = entry.isIntersecting;
      },
      {
        threshold: 0.5
      }
    );
    onMounted(() => {
      observer.observe(target.value);
    });
    return {
      animate,
      target
    };
  }
};
</script>