module.exports = {
  lintOnSave:false,
	publicPath: process.env.NODE_ENV === 'production' ? '/vueye-phone-input/' : '/',
	configureWebpack: {
		output: {
			libraryExport: 'default',
		},
	},
	css: {
		extract: false,
	}
};
