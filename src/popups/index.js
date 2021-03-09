import settingsPopup from './settings.popup.vue';
import feedsPopup from './feeds.popup.vue';
import feedPopup from './feed.popup.vue';
import synchronizationPopup from './synchronization.popup.vue';
import webhooksPopup from './webhooks.popup.vue';

wwLib.wwPopups.addPopup('rssFeedSettingsPopup', settingsPopup);
wwLib.wwPopups.addPopup('rssFeedFeedsPopup', feedsPopup);
wwLib.wwPopups.addPopup('rssFeedFeedPopup', feedPopup);
wwLib.wwPopups.addPopup('rssFeedSynchronizationPopup', synchronizationPopup);
wwLib.wwPopups.addPopup('rssFeedWebhooksPopup', webhooksPopup);

wwLib.wwPopups.addStory('RSS_FEED_POPUP', {
    title: {
        en: 'RSS feed',
        fr: 'Flux RSS',
    },
    type: 'rssFeedSettingsPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
});

wwLib.wwPopups.addStory('RSS_FEED_FEEDS_POPUP', {
    title: {
        en: 'RSS feed - Feeds',
        fr: 'Flux RSS - Flux',
    },
    type: 'rssFeedFeedsPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Save feeds',
                fr: 'Enregistrer les flux',
            },
            next: 'RSS_FEED_SYNCHRONIZATION_POPUP',
        },
    },
});

wwLib.wwPopups.addStory('RSS_FEED_ADD_FEED_POPUP', {
    title: {
        en: 'RSS feed - Add feed',
        fr: 'Flux RSS - Ajouter un flux',
    },
    type: 'rssFeedFeedPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Add feed',
                fr: 'Ajouter un flux',
            },
        },
    },
});

wwLib.wwPopups.addStory('RSS_FEED_EDIT_FEED_POPUP', {
    title: {
        en: 'RSS feed - Edit feed',
        fr: 'Flux RSS - Editer le flux',
    },
    type: 'rssFeedFeedPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Edit feed',
                fr: 'Editer le flux',
            },
        },
    },
});

wwLib.wwPopups.addStory('RSS_FEED_WEBHOOKS_POPUP', {
    title: {
        en: 'RSS feed - Webhooks',
        fr: 'Flux RSS - Webhooks',
    },
    type: 'rssFeedWebhooksPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        DONE: {
            text: {
                en: 'Done',
                fr: 'Done',
            },
        },
    },
});

wwLib.wwPopups.addStory('RSS_FEED_SYNCHRONIZATION_POPUP', {
    title: {
        en: 'RSS feed - Synchronization',
        fr: 'Flux RSS - Synchronization',
    },
    type: 'rssFeedSynchronizationPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        DONE: {
            text: {
                en: 'Done',
                fr: 'Done',
            },
        },
    },
});
