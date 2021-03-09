<template>
    <div class="ww-popup-rss-feed-feed">
        <label class="rss-feed-feed__label caption-s" for="url-rss-feed">
            Url
            <div class="rss-feed-feed__label-required">required</div>
        </label>
        <input
            type="text"
            name="url-rss-feed"
            class="rss-feed-feed__input caption-m ww-editor-input -large"
            placeholder="https://feed-url.com/endpoint"
            v-model="feed.url"
            autofocus
        />
        <label class="rss-feed-feed__label caption-s" for="name-rss-feed">
            Name
            <div class="rss-feed-feed__label-required">required</div>
        </label>
        <input
            type="text"
            name="name-rss-feed"
            class="rss-feed-feed__input caption-m ww-editor-input -large"
            placeholder="My feed"
            v-model="feed.name"
            :disabled="!feed.url"
        />
        <label class="rss-feed-feed__label caption-s" for="display-by-rss-feed">
            Display by
            <div class="rss-feed-feed__label-required">optional</div>
        </label>
        <input
            type="text"
            name="display-by-rss-feed"
            class="rss-feed-feed__input caption-m ww-editor-input -large"
            placeholder="name"
            v-model="feed.displayBy"
            :disabled="!feed.url"
        />
        <div class="rss-feed-feed__row rss-feed-feed__input">
            <label class="rss-feed-feed__label caption-s" for="rss-feed-headers"> Headers </label>
            <button class="ww-editor-button -primary -small m-auto-left" @click="addHeader" :disabled="!feed.url">
                Add header field
            </button>
        </div>
        <div class="rss-feed-feed__row -space-between" v-for="(header, index) of feed.headers" :key="index">
            <div class="rss-feed-feed__row-item">
                <input
                    type="text"
                    class="rss-feed-feed__input caption-m ww-editor-input"
                    placeholder="Key"
                    v-model="header.key"
                />
            </div>
            <div class="rss-feed-feed__row-item">
                <input
                    type="text"
                    class="rss-feed-feed__input caption-m ww-editor-input"
                    placeholder="value"
                    v-model="header.value"
                />
            </div>
            <div class="rss-feed-feed__input rss-feed-feed__button-delete" @click="deleteHeader(index)">
                <wwEditorIcon name="delete" small />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FeedPopup',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            feed: {
                id: wwLib.wwUtils.getUid(),
                url: undefined,
                name: undefined,
                displayBy: undefined,
                headers: [],
            },
        };
    },
    watch: {
        isSetup() {
            this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
        },
    },
    computed: {
        isSetup() {
            return !!this.feed.url && !!this.feed.url.length && !!this.feed.name && !!this.feed.name.length;
        },
    },
    methods: {
        addHeader() {
            this.feed.headers.push({ key: '', value: '' });
        },
        deleteHeader(index) {
            this.feed.headers.splice(index, 1);
        },
    },
    created() {
        this.feed = this.options.data.feed || this.feed;
        this.options.result.feed = this.feed;
        this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
    },
};
</script>

<style scoped lang="scss">
.ww-popup-rss-feed-feed {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .rss-feed-feed {
        &__label {
            display: flex;
            align-items: center;
            font-weight: 500;
            color: var(--ww-color-dark-500);
            margin-bottom: var(--ww-spacing-01);
            &-required {
                margin-left: auto;
                color: var(--ww-color-dark-400);
            }
        }
        &__link {
            color: var(--ww-color-blue-500);
            margin-left: var(--ww-spacing-02);
        }
        &__input {
            margin-bottom: var(--ww-spacing-03);
        }
        &__select {
            min-width: 65px;
            margin-left: var(--ww-spacing-02);
        }
        &__row {
            display: flex;
            align-items: center;
            &.-space-between {
                justify-content: space-between;
            }
            &-item {
                display: flex;
                flex-direction: column;
                width: 100%;
                margin-right: var(--ww-spacing-02);
                &:last-child {
                    margin-right: 0;
                    margin-left: var(--ww-spacing-02);
                }
            }
        }
        &__button-delete {
            margin-right: var(--ww-spacing-03);
            cursor: pointer;
            transition: color 0.3s ease;
            &:hover {
                color: var(--ww-color-red-500);
            }
        }
    }
    .m-auto-left {
        margin-left: auto;
    }
}
</style>
