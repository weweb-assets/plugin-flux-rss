<template>
    <div class="rss-feed-collection-edit">
        <wwEditorFormRow label="Url" required>
            <wwEditorFormInput
                type="text"
                name="url"
                placeholder="https://feed-url.com/endpoint"
                :model-value="feed.url"
                large
                @update:modelValue="setProp('url', $event)"
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Headers">
            <template #append-label>
                <button type="button" class="ww-editor-button -primary -small m-auto-left m-bottom" @click="addHeader">
                    Add header field
                </button>
            </template>
            <div
                v-for="(header, index) in feed.headers"
                :key="index"
                class="rss-feed-collection-edit__row -space-between m-bottom"
            >
                <wwEditorFormInput
                    type="text"
                    name="key"
                    placeholder="Key"
                    :model-value="header.key"
                    @update:modelValue="setHeaderProp('key', $event)"
                />
                <wwEditorFormInput
                    type="text"
                    name="value"
                    placeholder="Value"
                    :model-value="header.value"
                    @update:modelValue="setHeaderProp('value', $event)"
                />
                <button type="button" class="ww-editor-button -tertiary -small -icon -red" @click="deleteHeader(index)">
                    <wwEditorIcon class="ww-editor-button-icon" name="delete" small />
                </button>
            </div>
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        config: { type: Object, required: true },
    },
    emits: ['update:config'],
    computed: {
        feed() {
            return {
                url: undefined,
                headers: [],
                ...this.config,
            };
        },
    },
    methods: {
        addHeader() {
            const headers = _.cloneDeep(this.feed.headers || []);
            headers.push({ key: '', value: '' });
            this.setProp('headers', headers);
        },
        setHeaderProp(index, value) {
            const headers = _.cloneDeep(this.feed.headers);
            headers.splice(index, 1, { ...headers[index], ...value });
            this.setProp('headers', headers);
        },
        deleteHeader(index) {
            const headers = _.cloneDeep(this.feed.headers);
            headers.splice(index, 1);
            this.setProp('headers', headers);
        },
        setProp(key, value) {
            this.$emit('update:config', { ...this.feed, [key]: value });
        },
    },
};
</script>

<style scoped lang="scss">
.rss-feed-collection-edit {
    display: flex;
    flex-direction: column;
    &__row {
        display: flex;
        align-items: center;
        &.-space-between {
            justify-content: space-between;
        }
    }
    .m-auto-left {
        margin-left: auto;
    }
    .m-bottom {
        margin-bottom: var(--ww-spacing-02);
    }
}
</style>
