import ReactGA4 from "react-ga4";

const InitializeGoogleAnalytics = (id) => {
    // Initialize GA4 - Add your measurement ID
    const gTagID = id;
    ReactGA4.initialize(gTagID);
    console.log("GA INITIALIZED WITH: ", gTagID);
};

const TrackGoogleAnalyticsEvent = async (id, category, action, label) => {
    console.log("GA event:", id, ":", category, ":", action, ":", label);

    // InitializeGoogleAnalytics(id);

    // ReactGA4.event({
    //     category: category,
    //     action: action,
    //     label: label,
    // });

    window.postMessage({
        action: 'sentGoogleAnalytics', data: {
            id: id,
            category: category,
            action: action,
            label: label,
        }
    }, '*');

    console.log('----Send Googld Analytics');

};

export default InitializeGoogleAnalytics;
export { InitializeGoogleAnalytics, TrackGoogleAnalyticsEvent };