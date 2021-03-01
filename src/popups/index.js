import settingsPopup from './settings.popup.vue';
import apisPopup from './apis.popup.vue';
import apiPopup from './api.popup.vue';
import synchronizationPopup from './synchronization.popup.vue';
import webhooksPopup from './webhooks.popup.vue';

wwLib.wwPopups.addPopup('fluxRssSettingsPopup', settingsPopup);
wwLib.wwPopups.addPopup('fluxRssApisPopup', apisPopup);
wwLib.wwPopups.addPopup('fluxRssApiPopup', apiPopup);
wwLib.wwPopups.addPopup('fluxRssSynchronizationPopup', synchronizationPopup);
wwLib.wwPopups.addPopup('fluxRssWebhooksPopup', webhooksPopup);

wwLib.wwPopups.addStory('FLUX_RSS_POPUP', {
    title: {
        en: 'Flux RSS',
        fr: 'Flux RSS',
    },
    type: 'fluxRssSettingsPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
});

wwLib.wwPopups.addStory('FLUX_RSS_APIS_POPUP', {
    title: {
        en: 'Flux RSS - APIs',
        fr: 'Flux RSS - APIs',
    },
    type: 'fluxRssApisPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Save APIs',
                fr: 'Enregistrer les APIs',
            },
            next: 'FLUX_RSS_SYNCHRONIZATION_POPUP',
        },
    },
});

wwLib.wwPopups.addStory('FLUX_RSS_ADD_API_POPUP', {
    title: {
        en: 'Flux RSS - Add API',
        fr: 'Flux RSS - Ajouter une API',
    },
    type: 'fluxRssApiPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Add API',
                fr: 'Ajouter une API',
            },
        },
    },
});

wwLib.wwPopups.addStory('FLUX_RSS_EDIT_API_POPUP', {
    title: {
        en: 'Flux RSS - Edit API',
        fr: "Flux RSS - Editer l'API",
    },
    type: 'fluxRssApiPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Edit API',
                fr: "Editer l'API",
            },
        },
    },
});

wwLib.wwPopups.addStory('FLUX_RSS_WEBHOOKS_POPUP', {
    title: {
        en: 'Flux RSS - Webhooks',
        fr: 'Flux RSS - Webhooks',
    },
    type: 'fluxRssWebhooksPopup',
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

wwLib.wwPopups.addStory('FLUX_RSS_SYNCHRONIZATION_POPUP', {
    title: {
        en: 'Flux RSS - Synchronization',
        fr: 'Flux RSS - Synchronization',
    },
    type: 'fluxRssSynchronizationPopup',
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
