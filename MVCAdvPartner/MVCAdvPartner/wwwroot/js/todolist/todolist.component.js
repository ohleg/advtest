; (function (ng) {

    'use strict'

    ng.module('todolist')
        .component('todolist', {
            templateUrl: '/wwwroot/js/todolist/_todolist.html',
            controller: ToDoListComponentCtrl
        });

    ToDoListComponentCtrl.$inject = ['$timeout'];

    function ToDoListComponentCtrl($timeout) {
        var ctrl = this;

        ctrl.todolist = [];
        ctrl.taskText = "";

        ctrl.$onInit = onInit;
        ctrl.addTask = addTask;
        ctrl.removeTask = removeTask;
        ctrl.changeCompleted = changeCompleted;

        ctrl.sortableOptions = {
            update: function (e, ui) {
                $timeout(function () {
                    saveTodoList();
                });
            }
        };

        function onInit() {
            loadTodoList();
        }

        function addTask(taskText) {
            if (!taskText) {
                return;
            }
            ctrl.todolist.push({
                id: generateUUID(),
                text: taskText,
                completed: false
            });
            ctrl.taskText = "";
            saveTodoList();
        }

        function removeTask(id) {
            var index = ctrl.todolist.findIndex(t => t.id === id);
            if (index !== -1) {
                ctrl.todolist.splice(index, 1);
            }
            saveTodoList();
        }

        function changeCompleted(task) {
            saveTodoList();
        }

        // private

        function generateUUID() { 
            var d = new Date().getTime();
            var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16;
                if (d > 0) {
                    r = (d + r) % 16 | 0;
                    d = Math.floor(d / 16);
                } else {
                    r = (d2 + r) % 16 | 0;
                    d2 = Math.floor(d2 / 16);
                }
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        }

        function saveTodoList() {
            localStorage.setItem('todoist', JSON.stringify(ctrl.todolist));
        }

        function loadTodoList() {
            var todoistString = localStorage.getItem('todoist');

            if (todoistString) {
                ctrl.todolist = JSON.parse(todoistString);
            } else {
                ctrl.todolist = [];
            }
        }
    }

})(window.angular);
