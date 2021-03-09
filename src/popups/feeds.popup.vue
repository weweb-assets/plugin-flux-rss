<template>
    <div class="ww-popup-rss-feed-feeds">
        <button class="rss-feed-feeds__all ww-editor-button -primary" @click="addFeed">Add feed</button>
        <div class="rss-feed-feeds__row" v-for="(feed, index) in settings.privateData.APIs" :key="index">
            <div class="paragraph-m">{{ feed.name || feed.url }}</div>
            <button class="ww-editor-button -secondary -small m-auto-left" @click="editFeed(index, feed)">Edit</button>
            <div class="rss-feed-feeds__button-delete m-left" @click="deleteFeed(index)">
                <wwEditorIcon name="delete" small />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FeedsPopup',
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
            settings: {
                privateData: {},
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
            return this.settings.privateData.APIs && this.settings.privateData.APIs.length;
        },
    },
    methods: {
        async addFeed() {
            try {
                const result = await wwLib.wwPopups.open({
                    firstPage: 'RSS_FEED_ADD_FEED_POPUP',
                });
                this.settings.privateData.APIs.push(result.feed);
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        },
        async editFeed(index, feed) {
            try {
                const result = await wwLib.wwPopups.open({
                    firstPage: 'RSS_FEED_EDIT_FEED_POPUP',
                    data: { feed },
                });
                this.settings.privateData.APIs.splice(index, 1, result.feed);
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        },
        async deleteFeed(index) {
            const confirm = await wwLib.wwModals.open({
                title: {
                    en: 'Delete data source?',
                    fr: 'Supprimer la source de données ?',
                },
                text: {
                    en: 'Are you sure you want to delete the data source?',
                    fr: 'Voulez-vous vraiment supprimer la source de données ?',
                },
                buttons: [
                    {
                        text: {
                            en: 'Cancel',
                            fr: 'Annuler',
                        },
                        color: '-secondary',
                        value: false,
                        escape: true,
                    },
                    {
                        text: {
                            en: 'Delete',
                            fr: 'Supprimer',
                        },
                        color: '-primary -red',
                        value: true,
                        enter: true,
                    },
                ],
            });
            if (!confirm) return;
            this.settings.privateData.APIs.splice(index, 1);
        },
        async beforeNext() {
            this.options.setLoadingStatus(true);
            try {
                const plugin = wwLib.wwPlugins.pluginFluxRss;
                plugin.settings = await wwLib.wwPlugin.saveSettings(
                    plugin.id,
                    plugin.settings.id,
                    this.settings.data,
                    this.settings.privateData
                );

                const oldFeeds = this.options.data.settings.privateData.APIs;
                const newFeeds = this.options.result.settings.privateData.APIs;
                const deletedFeeds = oldFeeds.filter(feed => !newFeeds.find(elem => elem.id === feed.id));
                deletedFeeds.forEach(feed => wwLib.wwPlugin.deleteCmsDataSet(feed.id));

                wwLib.wwPlugins.pluginFluxRss.settings = plugin.settings;
                this.options.data.settings = plugin.settings;
            } catch (err) {
                wwLib.wwLog.error(err);
            }
            this.options.setLoadingStatus(false);
        },
    },
    created() {
        this.settings = _.cloneDeep(this.options.data.settings || this.settings);
        this.options.result.settings = this.settings;
        this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
    },
};
</script>

<style scoped lang="scss">
.ww-popup-rss-feed-feeds {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .rss-feed-feeds {
        &__all {
            margin: 0 auto var(--ww-spacing-02) auto;
        }
        &__row {
            display: flex;
            align-items: center;
            margin-bottom: var(--ww-spacing-04);
        }
        &__button-delete {
            margin: 0 var(--ww-spacing-03);
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
    .m-left {
        margin-left: var(--ww-spacing-03);
    }
}
</style>
