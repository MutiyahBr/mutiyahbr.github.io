var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BOJ_XBBNeKNpi9hZLx2AyNWoAfZ2s33VAj2VnB4a4ZmDAS-v1AEbD_XBIS3yeBIJh_Dol0ySb_DcF9dNW2en5P0",
    "privateKey": "qXZvi90GAzKRX4dXWFS2-Wdn7TTV7Vaq9L5uYrUyCHA"
 };
  
  
 webPush.setVapidDetails(
    'mailto:mutiyahbr@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
 )
 const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dRUNMmUpjEw:APA91bGZOSp_S3NzRzWf6he0pTISGWAg58ZFVuCeoF0DpFAJcxWXGIb9PWL4PHcEXEB1yRpTJ0R16zqdBH0herIAxbDht_B4kDVHIG0YWQdVd8aBy_5g3L5QF87Kabstjadsiq0mauAV",
    "keys": {
        "p256dh": "BCWdbAzE2LGhrYKflO5CF/PnvYI4+IG22PM0TgTySARA5XHkrDdn7XuaorXDKobl2EmvO6jIKgEyHJLYbkw57as=",
        "auth": "LftRYo0I9wBealRQL8efLw=="
    }
 };
 const payload = 'Look at here!';
  
 const options = {
    gcmAPIKey: '135599640865',
    TTL: 60
 };
 webPush.sendNotification(
    pushSubscription,
    payload,
    options
 );