// mixpanel.js
import mixpanel from 'mixpanel-browser';
// live credientals mixpanel => 5f75141353f103e1174c1403b44b1002
// staging credientals mixpanel => 40a316bf34b46e8d5647cfe2de281397

let isMixpanelInitialized = false;
export const initMixpanel = () => {
  // if (!isMixpanelInitialized) {
  //   mixpanel.init('5f75141353f103e1174c1403b44b1002', { debug: true, track_pageview: true, persistence: 'localStorage' });
  //   isMixpanelInitialized = true;
  // }
};

export const identifyUser = (distinct_id, properties) => {
  // if (distinct_id) {
  //   mixpanel.identify(distinct_id);
  // }
  // if (properties) {
  //   mixpanel.people.set(properties);
  // }
};

export const aliasUser = (newId) => {
  // if (newId) {
  //   mixpanel.alias(newId);
  //   mixpanel.identify(newId);
  // }
};

export default mixpanel;
