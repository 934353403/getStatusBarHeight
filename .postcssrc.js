// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
	"plugins": {
		"postcss-import": {},
		"postcss-url": {},
		// to edit target browsers: use "browserslist" field in package.json
		"autoprefixer": {
			browsers: ['Android >= 4.0', 'iOS >= 7']
		},
		'postcss-pxtorem': {
			rootValue: 75, //一个rem等于75个px;相当于vue/css文件中写width:75;会装换成width:1rem;再根据html的fontsize计算实际的width:
			propList: ['*'], //允许哪些属性转成rem;
			unitPrecision: 5, //最多小数位数;
			selectorBlackList: [/^\.van-/,/^\.mescroll/], //忽略.van-和.mescroll开头的类名;
			replace: true,
			mediaQuery: false, //允许在媒体查询中转换px
			minPixelValue: 2, //设置要替换的最小像素值
		}

	}
}