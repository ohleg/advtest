; (function (ng) {

    'use strict'

    ng.module('chat')
        .component('chat', {
            templateUrl: '/wwwroot/js/chat/_chat.html',
            controller: ChatComponentCtrl
        });

    ChatComponentCtrl.$inject = ['$timeout', 'ChatHub'];

    function ChatComponentCtrl($timeout, ChatHub) {
        var ctrl = this;

        ctrl.title = 'чат';
        ctrl.msgHistory = [];

        ctrl.$onInit = onInit;
        ctrl.sentMessage = sentMessage;

        function onInit() {
            ChatHub.start(function (name, message) {
                $timeout(function () {
                    ctrl.msgHistory.push({
                        name: name,
                        message: message,
                        time: new Date()
                    });
                    resetMsg();
                });
            }).then(function () {
                checkName();
            });
        }

        function sentMessage(message) {
            if (!message) {
                return;
            }

            $timeout(function () {
                ChatHub.sendMessage(ctrl.you, message);
                ctrl.msgHistory.push({
                    name: ctrl.you,
                    message: message,
                    time: new Date()
                });
                resetMsg();
            });
        }

        function resetMsg() {
            ctrl.message = "";
            $timeout(function () {
                var historyElement = document.querySelector(".msg_history");
                historyElement.scrollTop = historyElement.scrollHeight;
            });
        }

        async function checkName() {
            ctrl.you = localStorage.getItem('name');

            if (!ctrl.you) {
                const { value: name } = await Swal.fire({
                    title: 'Добро пожаловать',
                    input: 'text',
                    inputLabel: 'Как Вас зовут?',
                    confirmButtonText: 'Войти',
                    inputValidator: async (value) => {
                        if (!value) {
                            return 'Введите имя!'
                        }
                        var res = await ChatHub.isExistName(value);

                        if (res) {
                            return 'Это имя уже занято, введите другое';
                        }
                    }
                });

                if (name) {
                    localStorage.setItem('name', name);
                    ChatHub.setName(name);
                    ctrl.you = name;
                    initHistory();
                } else {
                    checkName();
                }
            } else {
                ChatHub.setName(ctrl.you);
                initHistory();
            }
        }

        function initHistory() {

            ChatHub.getHistory()
                .then(function (history) {
                    $timeout(function () {
                        ctrl.msgHistory = history;
                        $timeout(function () {
                            resetMsg();
                        }, 17);
                    });
                });
        }
    }

})(window.angular);
