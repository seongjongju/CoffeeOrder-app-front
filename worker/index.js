self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const targetUrl = '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        const targetUrl = event.notification.data.url;
        
        for (const client of clientList) {
            if (client.url === targetUrl && 'focus' in client) {
                return client.focus();
            }
        }
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});