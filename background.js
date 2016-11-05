function updatebadge() {
  $.getJSON("https://crossorigin.me/https://api.bitfinex.com/v1/pubticker/LTCUSD",function (data) {
    var badge = "n/a";

    if (data['mid']) {
      localStorage['ltc_usd'] = data['mid'];
    }

    if (localStorage['ltc_usd']) {
      badge = localStorage['ltc_usd'];
      badge = roundForBadge(badge);
    }

    chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 0, 255]});
    chrome.browserAction.setBadgeText({'text':""+badge});
  });
}

$.ajaxSetup({ cache: false });
setInterval(updatebadge,60*1000);
updatebadge();

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.browserAction.setBadgeBackgroundColor({color:[255, 0, 0, 255]});
  chrome.browserAction.setBadgeText({'text':"..."});
  updatebadge();
});