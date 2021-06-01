<template>
    <div class="rss-feed-collection-edit">
        <wwEditorFormRow label="Url" required>
            <wwEditorFormInput
                type="text"
                name="url"
                placeholder="https://feed-url.com/endpoint"
                :value="feed.url"
                @input="setProp('url', $event)"
                v-on:keyup.native.enter="$emit('next')"
                large
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Headers">
            <template slot="append-label">
                <button class="ww-editor-button -primary -small m-auto-left m-bottom" @click="addHeader">
                    Add header field
                </button>
            </template>
            <div
                class="rss-feed-collection-edit__row -space-between m-bottom"
                v-for="(header, index) in feed.headers"
                :key="index"
            >
                <wwEditorFormInput
                    type="text"
                    name="key"
                    placeholder="Key"
                    :value="header.key"
                    @input="setHeaderProp('key', $event)"
                />
                <wwEditorFormInput
                    type="text"
                    name="value"
                    placeholder="Value"
                    :value="header.value"
                    @input="setHeaderProp('value', $event)"
                />
                <button class="ww-editor-button -tertiary -small -icon -red" @click="deleteHeader(index)">
                    <wwEditorIcon class="ww-editor-button-icon" name="delete" small />
                </button>
            </div>
        </wwEditorFormRow>
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
            return !!this.feed.url;
        },
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
            this.$emit('update-config', { ...this.feed, [key]: value });
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
