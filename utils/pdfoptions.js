var options = {
    format: "Letter",
    orientation: "portrait",
    border: "1in",
    header: {
        height: "28mm",
        contents: '<div style="text-align: center;">Author: Feast of Friends by A-Tribu </div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page',
        }
    }
};

module.exports=options;