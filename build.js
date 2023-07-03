const fs = require('fs');
const util = require('util');
const yamlFront = require('yaml-front-matter');
const MarkdownIt = require('markdown-it');
const tex = require('markdown-it-texmath');
const MarkdownItAnchor = require('markdown-it-anchor');

const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');
const { enableLineNumbers } = require('./plugins/prism/line-numbers');
const { JSDOM } = require('jsdom');

let dom = new JSDOM();

enableLineNumbers(Prism, dom.window);

function highlight(str, lang) {
	if (lang) loadLanguages([ lang ]);
	let document = dom.window.document;
	document.body.innerHTML = `<pre class="language-${ lang } line-numbers"><code>${ require('escape-html')(str) }</code></pre>`;
	Prism.highlightAllUnder(document);
	return document.body.innerHTML.trim();
}

let md = MarkdownIt({
	highlight: highlight
});
md.use(tex, {
	engine: require('katex'),
	delimiters: 'dollars'
});
md.use(MarkdownItAnchor);

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
				list[contest][problem][ID].lastCommit = JSON.parse(fs.readFileSync('commitInfo/' + file + '.json'));
				let content = list[contest][problem][ID].__content.trim();
				fs.writeFileSync('dist' + '/' + file, content);
				fs.writeFileSync('dist' + '/' + fileName + '.html', md.render(content));
				delete list[contest][problem][ID].__content;
			}
		}
	});
	let data = {};
	data.data = list;
	data.lastCommit = JSON.parse(fs.readFileSync('commitInfo/global.json'));
	fs.writeFileSync('dist/list.json', JSON.stringify(data));
}

makeDist();
build();
