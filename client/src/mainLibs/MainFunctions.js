export default class MainFunctions {

    static dateFormat(javadate, dateOnly) {
        if (javadate) {
            var months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
            var today = new Date();
            var date = new Date(javadate);
            var timeDiff = Math.abs(today.getTime() - date.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (dateOnly) {
                return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
            }
            if (date.toDateString() == today.toDateString()) return ('сегодня в ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2));
            else if (diffDays < 2) return ('вчера в ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2));
            return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
        }
        return '';
    }

}
if (process.env.NODE_ENV === 'development') {
    var logData = [];
    (function () {
        var log = console.log,
            error = console.error,
            warn = console.warn,
            info = console.info;

        console.log = function () {
            var args = Array.prototype.slice.call(arguments);
            log.apply(this, args);
            logData.push({
                level: "log",
                arguments: args
            });
        };
        console.error = function () {
            var args = Array.prototype.slice.call(arguments);
            error.apply(this, args);
            logData.push({
                level: "error",
                arguments: args
            });
        };
        console.warn = function () {
            var args = Array.prototype.slice.call(arguments);
            warn.apply(this, args);
            logData.push({
                level: "warn",
                arguments: args
            });
        };
        console.info = function () {
            var args = Array.prototype.slice.call(arguments);
            info.apply(this, args);
            logData.push({
                level: "info",
                arguments: args
            });
        };
    }());
    (function (console) {

        console.save = function (filename) {

            if (!logData) {
                console.error('Console.save: No data');
                return;
            }

            if (!filename) filename = 'console.json';

            if (typeof logData === "object") {
                var saveDate = JSON.stringify(logData, undefined, 4)
            }

            var blob = new Blob([saveDate], {
                    type: 'text/json'
                }),
                e = document.createEvent('MouseEvents'),
                a = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        }
    })(console);
}