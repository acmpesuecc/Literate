Week 2 (React):
I went through Bro Code’s React tutorial https://www.youtube.com/watch?v=CgkZ7MvWUAA . To use react i has to install node.js. 
After installation, you have to type 4 commands to set up your app.
1. npm create vite@latest
Type project name, choose framework as React using arrow keys and choose variant as whatever you are using (Ex: Javascript)
2. cd <filename>
3. npm install (To install all the required packages)
4. npm run dev (To run your app)
You get a website which is a virtual DOM (Document Object Model), which is faster and more efficient than a real DOM, as the whole webpage doesn't need to be re-rendered.
Copy the link in the terminal and paste it into your desired browser.

However, while running the first command to make react app, I encountered this error.
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system. For more information, 
see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ npm run dev
+ ~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
  
So there are 3 solutions. 
1. Temporarily bypass for this session by tying in the VS Code PowerShell terminal
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
2. Use cmd terminal in VS Code.
3. Enable remote-signed mode in PowerShell only for the current user. However, it permanently alters the system mode, and this can be changed back again. This allows users to run local scripts or scripts from verified sources. It doesn’t guarantee absolute safety, as even though it is verified, scripts downloaded from the internet can be unsafe.
Safe for Downloads: It prevents malicious, unsigned scripts from the internet (email, browsers) from executing automatically.
Local Trust: It assumes scripts written locally are safe, allowing you to run your own administrative scripts without needing to sign them.
Limitation: If a local user creates a malicious script or an attacker places a script on your machine, RemoteSigned will execute it.
Command: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

Also, to open an existing React file in your system in VSCode:
cd <filename>
npm install 
To install all the required packages
npm run dev
To run your app

In your editor, you see many folders under your app
node_modules: Contains external libraries and packages our projects rely on (Ex: Build Tools, utility libraries, routing libraries)
public: Has public assets like public fonts, images, and videos.
src (IMP most time spent here): Our files are here, including app.jsx file and main.jsx file. The App.css and index.css are our style sheets (font, format, etc).

Basic format of a component file:
function funcname(){
return();
}
export default funcname

//If JavaScript code (variables, etc.) in the return statement, curly braces are needed. If outside return not req.

In app.jsx:
import funcname from ‘./filename.jsx’
Function App(){
return(
	<funcname></funcname> or <funcname/>
//The order and number of times the func is added determines how it will look in webpage
);
}
export default App

When there is more than one component to return in app.jsx or general, enclose the components in <></>


Elements in HTML (All these need to be closed):
1. <ul> :unordered list	</ul>:To close
2. <li>:List
3. <h1>,<h2>:Headings but font decreases as number increases (h2<h1)
4. <nav>:Contains navigation links
5. <a>:Anchor tags to make something a hyperlink (<a href=”link”>). Remember to close.
6. <hr>: Horizontal rule to make a horizontal line
7. <header>: For header element 
8. <footer>: For footer element
9. <p>: Paragraph element

I also learnt how to make card components, about adding css styles, props, conditional rendering (if else and what to display in both cases or ternary operator).
There are a lot of commands which require basic knowledge of html commands and JavaScript. 
