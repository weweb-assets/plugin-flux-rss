<template>
    <div class="ww-popup-rss-feed-sync">
        <button class="rss-feed-sync__all ww-editor-button -primary -green" @click="syncAll" :disabled="isFetching">
            <div v-if="!isFetching">Synchronize all</div>
            <div v-else>Fetching...</div>
        </button>
        <div class="rss-feed-sync__row" v-for="(feed, index) in settings.privateData.APIs" :key="index">
            <div class="paragraph-m">{{ feed.name || feed.url }}</div>
            <div class="caption-m m-auto-left">
                <template v-if="!isFeedFetching(feed)">
                    <template v-if="getSource(feed).lastSyncDate">
                        {{ getSource(feed).lastSyncDate | dateFromNow }}
                    </template>
                    <template v-else>never synchronized</template>
                </template>
            </div>
            <button
                :disabled="isFeedFetching(feed)"
                class="ww-editor-button -primary -green -small m-left"
                @click="sync(feed)"
            >
                <div v-if="!isFeedFetching(feed)">Synchronize feed</div>
                <div v-else>Fetching...</div>
            </button>
        </div>
        <div class="rss-feed-sync__separator"></div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'SynchronizationPopup',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    filters: {
        dateFromNow(date) {
            return moment(date).fromNow();
        },
    },
    data() {
        return {
            isFetching: false,
            feedsFetching: [],
            settings: {
                privateData: {},
            },
        };
    },
    methods: {
        getSource(feed) {
            return wwLib.$store.getters['cms/getData'][feed.id] || {};
        },
        isFeedFetching(feed) {
            return this.feedsFetching.indexOf(feed.id) !== -1;
        },
        feedFetching(feed, value) {
            if (value) {
                this.feedsFetching.push(feed.id);
            } else {
                const index = this.feedsFetching.indexOf(feed.id);
                if (index !== -1) this.feedsFetching.splice(index, 1);
            }
        },
        async sync(feed) {
            this.feedFetching(feed, true);
            await wwLib.wwPlugins.pluginFluxRss.sync(feed);
            this.feedFetching(feed, false);
        },
        async syncAll() {
            this.isFetching = true;
            for (const feed of this.settings.privateData.APIs) await this.sync(feed);
            this.isFetching = false;
        },
    },
    created() {
        this.settings = this.options.data.settings;
    },
    mounted() {
        if (this.options.data.isFirstTime) this.syncAll();
    },
};
</script>

<style scoped lang="scss">
.ww-popup-rss-feed-sync {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .rss-feed-sync {
        &__all {
            margin: 0 auto var(--ww-spacing-02) auto;
        }
        &__row {
            display: flex;
            align-items: center;
            margin-bottom: var(--ww-spacing-04);
        }
    }
    .m-auto-left {
        margin-left: auto;
    }
    .m-left {
        margin-left: var(--ww-spacing-02);
    }
}
</style>
