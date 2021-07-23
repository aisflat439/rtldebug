// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const insertText = (text: string) => {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		vscode.window.showErrorMessage('Can\'t insert debug because no document is open');
		return;
	}

	editor.edit((editBuilder) => {
		editBuilder.insert(editor.selection.active, text)
	});

};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "rtldebug" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('rtldebug.debug', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }
		// The code you place here will be executed every time your command is executed

		editor.edit((editBuilder) => {
			editBuilder.insert(editor.selection.active, `, debug`);
		});

		vscode.commands.executeCommand('editor.action.insertLineAfter')
			.then(() => {
				insertText(`debug();`);
			});
	});

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('rtldebug.props', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }
		// The code you place here will be executed every time your command is executed

		editor.edit((editBuilder) => {
			editBuilder.insert(editor.selection.active, `, props`)
		});

		vscode.commands.executeCommand('editor.action.insertLineAfter')
			.then(() => {
				insertText(`console.log("props", props);`);
			})
	});

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('rtldebug.render', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }
		// The code you place here will be executed every time your command is executed
		const filePath = editor.document.fileName;
		const fileName = filePath.slice(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.')).replace('.spec', '');

		const renderWith = `
		const setup = overrides => {	
			const props = {
			...overrides
			}

			const R = render(<${fileName} {...props}/>)

			return {
			...R,
			props
			}
		}`;

		editor.edit((editBuilder) => {
			editBuilder.insert(editor.selection.active, renderWith);
		});
	});

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('rtldebug.color', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }
		// The code you place here will be executed every time your command is executed

		const selection = editor.selection;
		const text = editor.document.getText(selection);
		if (!text) { return; }
		
		const coloredText = `
		console.log(
			'\x1b[44m%s\x1b[0m',
			\`--${text}--\${JSON.stringify(${text})}-----\`
		);`;

		editor.edit((editBuilder) => {
			editBuilder.insert(new vscode.Position(editor.selection.end.line, 100000), coloredText);
		});
	});

	disposable = vscode.commands.registerCommand('rtldebug.util', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }
		// The code you place here will be executed every time your command is executed

		const selection = editor.selection;
		const text = editor.document.getText(selection);
		if (!text) { return; }
		
		const coloredText = `
		console.log('************* here');
		const util = require('util');
		console.log(
			util.inspect(${text}, {
				colors: true,
				depth: null,
				maxArrayLength: 1000
			})
		);`;

		editor.edit((editBuilder) => {
			editBuilder.insert(new vscode.Position(editor.selection.end.line, 100000), coloredText);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
