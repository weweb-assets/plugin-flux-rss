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
            plugin.isNew = false;
            this.sidebarButton();
        }
        /* wwEditor:end */
    },
    /* wwEditor:start */
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
    },
    /* wwEditor:end */
};
