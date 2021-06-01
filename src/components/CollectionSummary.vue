<template>
    <div class="rss-feed-collection-summary">
        <div class="rss-feed-collection-summary__elem caption-s">URL: {{ config.url || '-' }}</div>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        config: { type: Object, required: true },
    },
    watch: {
        isSetup: {
            immediate: true,
            handler(value) {
                this.$emit('update-is-valid', value);
            },
        },
    },
    computed: {
        isSetup() {
            return !!this.config.url;
        },
    },
};
</script>

<style lang="scss" scoped>
.rss-feed-collection-summary {
    &__elem {
        margin-bottom: var(--ww-spacing-01);
    }
}
</style>
