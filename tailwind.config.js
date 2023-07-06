/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
			fontFamily: {
				sans: ['ClashDisplay-Regular', ...defaultTheme.fontFamily.sans]
			},
			colors:{
				tomato: '#E50914',
				marigold: '#ffbe0b'
			}
		},
  },
  plugins: [],
}

