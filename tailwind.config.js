/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./*{html,js}'],
    theme: {
        extend: {
            screens: {
                mdl: '850px',
            },
        },
    },
    plugins: [],
}
