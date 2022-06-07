; (function (ng) {

    'use strict'

    ng.module('chat')
        .service('ChatHub', ChatHubService);

    ChatHubService.$inject = [];

    function ChatHubService() {
        var service = this;

        service.start = start;
        service.sendMessage = sendMessage;
        service.isExistName = isExistName;
        service.setName = setName;
        service.getHistory = getHistory;

        function sendMessage(name, message) {
            hub.invoke("SendMessage", name, message);
        }

        function isExistName(name) {
            return hub.invoke("IsExistName", name)
                .then(function (data) {
                    return data;
                });
        }

        function setName(name) {
            return hub.invoke("SetName", name);
        }

        function getHistory() {
            return hub.invoke("GetMessageHistory")
                .then(function (history) {
                    return history;
                })
        }

        function start(receiveMessageCallbackFn) {
            $.connection.hub.url = "/signalr";
            $.connection.hub.logging = true;

            hub.client.receiveMessage = function (name, message) {
                if (receiveMessageCallbackFn) {
                    receiveMessageCallbackFn(name, message);
                }
            };

            return $.connection.hub.start().done(function () {
                console.log("Подключено");
            })
                .fail(error => {
                    console.log("Не удалось запустить signalr соединение! Ошибка: ", error);
                });
        }

        var hub = $.connection.chatHub;

        
    }

})(window.angular);
