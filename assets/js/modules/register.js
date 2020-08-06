const registration = ()=>{
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('./service-worker.js')
          .then(function() {
            console.log('Pendaftaran Service Worker berhasil');
          })
          .catch(function(){
            console.log('Pendaftaran Service Worker gagal');
          });
        })
      } else {
        console.log("Service Worker belum didukung browser ini.")
      }
}

const notification = ()=>{
  if('Notification' in window){
    Notification.requestPermission()
        .then(result => {
            if(result === 'denied'){
                console.log('Notification feature not allowed')
                return
            }else if (result === 'default'){
                console.log('User closes the dialog box')
                return
            }
          
            console.log("Notification feature was allowed");

            if('PushManager' in window){
              navigator.serviceWorker.getRegistration()
              .then(function(registration) {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array("BOJ_XBBNeKNpi9hZLx2AyNWoAfZ2s33VAj2VnB4a4ZmDAS-v1AEbD_XBIS3yeBIJh_Dol0ySb_DcF9dNW2en5P0")
                }).then(function(subscribe) {
                    console.log('endpoint: ', subscribe.endpoint);
                    console.log('p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
                    console.log('auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));
                }).catch(function(e) {
                    console.error('Did not Subscribe', e.message);
                });
              });
            }
        })
  }
  else {
    console.error("Browser doesn't support notification feature.");
  }
}




function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default {
  registration,
  notification
}