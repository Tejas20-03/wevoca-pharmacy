importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  // apiKey: 'AIzaSyB_oLjxOdvuANjh-PEm6TXE55xlDbWd0xs',
  // authDomain: 'testing-pn-dvago.firebaseapp.com',
  // projectId: 'testing-pn-dvago',
  // storageBucket: 'testing-pn-dvago.appspot.com',
  // messagingSenderId: '936701484183',
  // appId: '1:936701484183:web:a649d24118a0ed014d9dd2',
};

firebase.initializeApp(firebaseConfig);

class CustomPushEvent extends Event {
  constructor(data) {
    super('push');

    Object.assign(this, data);
    this.custom = true;
  }
}

/*
 * Overrides push notification data, to avoid having 'notification' key and firebase blocking
 * the message handler from being called
 */
self.addEventListener('push', (e) => {
  // Skip if event is our own custom event
  if (e.custom) return;

  // Kep old event data to override
  const oldData = e.data;

  // Create a new event to dispatch, pull values from notification key and put it in data key,
  // and then remove notification key
  const newEvent = new CustomPushEvent({
    data: {
      ehheh: oldData.json(),
      json() {
        const newData = oldData.json();
        newData.data = {
          ...newData.data,
          ...newData.notification,
        };
        delete newData.notification;
        return newData;
      },
    },
    waitUntil: e.waitUntil.bind(e),
  });

  // Stop event propagation
  e.stopImmediatePropagation();

  // Dispatch the new wrapped event
  dispatchEvent(newEvent);
});

(async () => {
  try {
    const isSupported = await firebase?.messaging?.isSupported();
    if (isSupported) {
      const messaging = firebase?.messaging();
      messaging.onBackgroundMessage((payload) => {
        const { title, body, image, ...restPayload } = payload.data;

        const notificationOptions = {
          body,
          icon: 'https://code-optimization.d2zgkjt7atknhm.amplifyapp.com/assets/dvago-icon-192.jpg',
          image: image,
          data: restPayload,
        };
        return self.registration.showNotification(title, notificationOptions);
      });
    } else {
      console.log('Firebase Messaging is not supported in this browser or environment.');
    }
  } catch {
    console.log('Firebase Messaging is not supported in this browser or environment.');
  }
})();

self.addEventListener('notificationclick', (event) => {
  if (event?.notification?.data && event?.notification?.data?.link) {
    self.clients.openWindow(event.notification.data.link);
  }

  // close notification after click
  event.notification.close();
});
