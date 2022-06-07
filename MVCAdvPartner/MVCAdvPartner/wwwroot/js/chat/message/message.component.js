; (function (ng) {

    'use strict'

    ng.module('chat')
        .component('message', {
            templateUrl: '/wwwroot/js/chat/message/_message.html',
            controller: MsgComponentCtrl,
            bindings: {
                msg: '<'
            }
        });

    MsgComponentCtrl.$inject = [];

    function MsgComponentCtrl() {
        var ctrl = this;

        ctrl.$postLink = postLink;

        function postLink() {
            ctrl.incoming = ctrl.msg.name.toLowerCase() !== localStorage.getItem('name').toLowerCase();
            ctrl.msgClass = ctrl.incoming ? "incoming_msg" : "outgoing_msg";
        }
    }

})(window.angular);
