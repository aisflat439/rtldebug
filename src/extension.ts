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
			editBuilder.insert(editor.selection.active, `, debug`)
		});

		vscode.commands.executeCommand('editor.action.insertLineAfter')
			.then(() => {
				insertText(`debug();`);
			})
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

		const renderWith = `
  const setup = overrides => {
		const props = {
		...overrides
		}

		const R = render(< {...props}/>)

		return {
		...R,
		props
		}
  }`

		editor.edit((editBuilder) => {
			editBuilder.insert(editor.selection.active, renderWith)
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
