Week 1 (Learning git):
Understanding: Git helps keep track of all the changes you make in your project and allows you to experiment with new features safely and collaborate with others without tampering with your proper code. Instead of making multiple files with different versions of the same code, you can do all of this in one repository.

I have gone through https://acmpesuecc.github.io/posts/git-in-action. 
On this website, I learnt how to install Git and set up SSH.
I generated an SSH key:
ssh-keygen -t ed25519 -C "your_email@example.com"
Then start the SSH agent and add the key:
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
Copied my public key:
cat ~/.ssh/id_ed25519.pub
NOTE: Copy the entire output
After setting up the public key, go to GitHub > Settings > SSH and GPG keys > New SSH key, and paste it there.
Then, run the ssh -T git@github.com command in your terminal to verify the setup

I learnt about making repositories and forking in github.
I learnt git commands for cloning, creating and going to branches, pulling and pushing files.
I also learnt about pull requests.

I learnt about conventional commits on this website  https://www.conventionalcommits.org/en/v1.0.0/ 
The commit message should be structured as follows:
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]

The commit contains the following structural elements to communicate intent to the consumers of your library:
fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the Angular convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.
There are many examples on the website which provide more understanding.

In https://rowjee.com/blog/git_up_and_running. I understood git better using this website. It uses a simple example to which you can relate to about Maggi recipes. It talks about how you have a base recipe and document changes. You finally add those recipes you like the most. This example is eventually related to git commands. 

I have read through the websites, but I need to see it practically to understand. I am using this website that was found in the first website, and found this https://learngitbranching.js.org/ . It is more visual and kinda like a simulation with levels.

I also went through what to do if you made any errors in your commits and how to basically undo your mistakes from https://dangitgit.com/en .
