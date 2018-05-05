'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "Remove console logs" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.removeConsoleLogs', () => {
        // The code you place here will be executed every time your command is executed
        const currEditor = vscode.window.activeTextEditor;
        if (!currEditor) {
            return;
        }
        // tslint:disable-next-line:no-unused-expression
        new Promise((resolve) => {
            currEditor.edit((builder) => {
                let doc = currEditor.document;
                for (let i = 0; i <= doc.lineCount - 1; i++) {
                    if (doc.lineAt(i).text.indexOf('console.log') !== -1) {
                        builder.replace(new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i + 1, 0)), "");
                    }
                }
                resolve();
            });
        });
        currEditor.document.save();
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}