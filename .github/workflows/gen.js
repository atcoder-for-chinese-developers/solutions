const fs = require('fs');
const yamlFront = require('yaml-front-matter');

module.exports = ({ github, context, core }) => {
	let list = fs.readdirSync('.');
	let data = {};
	list.forEach(file => {
		let stats = fs.statSync(file);
		if (stats.isFile()) {
			let parts = file.split('.');
			let extName = parts.slice(-1)[0];
			if (extName === 'md' && parts.length === 4) {
				let contest = parts[0], problem = parts[1], ID = parts[2];
				data[contest] = data[contest] || {};
				data[contest][problem] = data[contest][problem] || {};
				data[contest][problem][ID] = yamlFront.loadFront(fs.readFileSync(file));
				fs.writeFileSync(file, data[contest][problem][ID].__content.trim());
				delete data[contest][problem][ID].__content;
			}
		}
	});
	fs.writeFileSync('list.json', JSON.stringify(data));
}