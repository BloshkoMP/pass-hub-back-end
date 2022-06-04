module.exports = {
    overrides: [
        {
            files: '*.html',
            options: {
                printWidth: 80,
                parser: 'html',
            },
        },
        {
            files: '*.less',
            options: {
                printWidth: 120,
                parser: 'less',
            },
        },
    ],
};
