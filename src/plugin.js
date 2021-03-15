/* wwEditor:start */
import './popups';
/* wwEditor:end */

export default {
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
        Data
    \================================================================================================*/
    settings: {
        data: {},
        privateData: {
            APIs: [],
        },
    },
    /* wwEditor:end */
    /*=============================================m_ÔÔ_m=============================================\
        Init
    \================================================================================================*/
    async init() {
        /* wwEditor:start */
        const plugin = wwLib.wwPlugins.pluginFluxRss;
        plugin.settings = (await wwLib.wwPlugin.getSettings(plugin.id)) || this.settings;
        if (!plugin.settings.privateData.APIs) plugin.settings.privateData.APIs = [];
        if (plugin.isNew && !plugin.settings.privateData.APIs.length) {
            this.sidebarButton();
        }
        /* wwEditor:end */
    },
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
        SYNCHRONIZE
    \================================================================================================*/
    async sync(feed) {
        try {
            await wwLib.wwPlugin.saveCmsDataSet(this.settings.id, feed.id, feed.name, feed.displayBy, 'FluxRss');

            wwLib.wwNotification.open({
                text: {
                    en: `Feed "${feed.name}" succesfully fetched`,
                },
                color: 'green',
            });
        } catch (err) {
            wwLib.wwNotification.open({
                text: {
                    en: 'An error occured, please try again later.',
                    fr: 'Une erreur est survenue. Veuillez réessayer plus tard.',
                },
                color: 'red',
            });
            wwLib.wwLog.error(err);
        }
    },
    async syncAll() {
        for (const feed of this.settings.privateData.APIs) await this.sync(feed);
    },
    /*=============================================m_ÔÔ_m=============================================\
        SIDEBAR POPUP
    \================================================================================================*/
    async sidebarButton() {
        try {
            const { id, settings, isNew } = wwLib.wwPlugins.pluginFluxRss;
            const isSetup = !isNew;
            const isFirstTime = !settings.privateData.APIs.length;
            await wwLib.wwPopups.open({
                firstPage: isSetup ? 'RSS_FEED_POPUP' : 'RSS_FEED_FEEDS_POPUP',
                data: {
                    isFirstTime,
                    pluginId: id,
                    settings,
                },
            });
        } catch (err) {
            wwLib.wwLog.error(err);
        }
        wwLib.wwPlugins.pluginFluxRss.isNew = false;
    },
    /* wwEditor:end */
};
