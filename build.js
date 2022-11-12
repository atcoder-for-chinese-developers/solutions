const fs = require('fs');
const yamlFront = require('yaml-front-matter');
const MarkdownIt = require('markdown-it');
const prism = require('markdown-it-prism');
const tex = require('markdown-it-texmath');

let md = new MarkdownIt();
md.use(prism, { defaultLanguage: 'plain' });
md.use(tex, {
	engine: require('katex'),
	delimiters: 'dollars'
});

function deleteDirectory(path) {
	if (fs.existsSync(path)) {
		let list = fs.readdirSync(path);
		list.forEach(file => {
			let filePath = path + '/' + file;
			if (fs.statSync(filePath).isFile()) fs.unlinkSync(filePath);
			else deleteDirectory(filePath);
		});
		fs.rmdirSync(path);
	}
}

function makeDist() {
	deleteDirectory('dist');
	fs.mkdirSync('dist');
}

function build() {
	let files = fs.readdirSync('src');
	let list = {};
	files.forEach(file => {
		let stats = fs.statSync('src/' + file);
		if (stats.isFile()) {
			let parts = file.split('.');
			let extName = parts.slice(-1)[0];
			if (extName === 'md' && parts.length === 4) {
				console.log('Porcessing ', file);
				let fileName = parts[0] + '.' + parts[1] + '.' + parts[2];
				let contest = parts[0], problem = parts[1], ID = parts[2];
				list[contest] = list[contest] || {};
				list[contest][problem] = list[contest][problem] || {};
				list[contest][problem][ID] = yamlFront.loadFront(fs.readFileSync('src/' + file));
				let content = list[contest][problem][ID].__content.trim();
				fs.writeFileSync('dist' + '/' + file, content);
				fs.writeFileSync('dist' + '/' + fileName + '.html', md.render(content));
				delete list[contest][problem][ID].__content;
			}
		}
	});
	let data = {};
	data.data = list;
	fs.writeFileSync('dist/list.json', JSON.stringify(data));
}

makeDist();
build();
