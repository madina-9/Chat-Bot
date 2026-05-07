'use client';
import { useEffect } from 'react';

function urlBase64ToUint8Array(base64: string) {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(b64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .register('/sw.js')
      .then(async (reg) => {
        if (!('PushManager' in window)) return;
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        if (!vapidKey) return;

        const existing = await reg.pushManager.getSubscription();
        if (existing) {
          localStorage.setItem('pushSub', JSON.stringify(existing));
          return;
        }

        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;

        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidKey),
        });
        localStorage.setItem('pushSub', JSON.stringify(sub));
      })
      .catch((err) => console.error('SW registration failed', err));
  }, []);

  return null;
}
