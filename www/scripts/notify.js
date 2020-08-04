(function(){

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Initialize PubNub Broadcast Receiver
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    PUBNUB(PUBNUB.setup).subscribe({
        channel : PUBNUB.setup.channel,
        message : receiver
    });

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Receiver of Remote Broadcast Events
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function receiver(message) {
        chrome.notifications.create("my_noti", message, function(notificationId) {
            setTimeout(function() {
                chrome.notifications.clear(notificationId, function(wasCleared) {
                    console.log(wasCleared);
                });
            }, 20000);
        });
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // User Clicked on a Button inside the Desktop Notification
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
        var pb = PUBNUB.init(PUBNUB.setup);
        var resp;
        if(buttonIndex == 0){
            resp = "Yes";
        }
        else if(buttonIndex == 1){
            resp = "No";
        }
        else{
            resp = "Error";
        }
        pb.publish({
          channel: PUBNUB.setup.channel,
          message: {
            iconUrl   : 'images/icon.png',
            type      : 'basic',
            title     : new Date(),
            message   : resp,
            priority  : 1
          }
        });
        
    });
})();