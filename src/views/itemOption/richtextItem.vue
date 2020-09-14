<template>
  <div class="text-holder">
    <div class="option-config-container">
      <tinymce
        ref="formContent"
        v-model="action.config"
        :width="350"
        :height="600"
      />
    </div>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: 'RichtextItem',
  components: {
    Tinymce
  },
  props: {
    action: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      act: this.action
    }
  },
  watch: {
    'action.config': {
      handler: (val) => {
        // this.$bus.$emit('richtextchange', val)
      }
    }
  }
}
</script>
<style lang="scss">
  .text-holder {
    width: 374px;
    overflow: hidden;
  }
</style>
