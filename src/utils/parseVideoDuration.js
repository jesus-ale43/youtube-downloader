export function parseVideoDuration(duration) {
    var hours = ~~(duration / 3600);
    var minutes = ~~((duration % 3600) / 60);
    var seconds = ~~duration % 60;

    var output = '';

    if (hours > 0) {
        output += '' + hours + ':' + (minutes < 10 ? '0' : '');
    }

    output += '' + minutes + ':' + (seconds < 10 ? '0' : '');
    output += '' + seconds;
    return output;
}