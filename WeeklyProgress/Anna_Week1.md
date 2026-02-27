## Git Installation & SSH Setup

* I installed Git on Windows.  
* I used Git Bash.

I generated an SSH key using:  
 ssh-keygen \-t ed25519 \-C "my\_email@example.com"

I started the SSH agent:  
 eval "$(ssh-agent \-s)"  
ssh-add \~/.ssh/id\_ed25519

I copied my public key using:  
 cat \~/.ssh/id\_ed25519.pub  
I added the SSH key to GitHub (Settings → SSH & GPG keys).

I verified the setup using:  
 ssh \-T git@github.com

I configured Git globally with my username and email:  
git config \--global user.name "my-username"  
git config \--global user.email "my\_email@example.com"

## Git Commands I Learned

### Repository Setup

* git init – Initialize a repository  
* git clone – Clone a repository  
* git status – Check repository status  
* git branch – View branches

### Working with Changes

* git add \<file\> – Stage a specific file  
* git add . – Stage all changes  
* git commit \-m "message" – Save changes

### Collaboration

* git push – Upload changes to GitHub  
* git pull – Download updates  
* git fetch – Fetch remote changes  
* git merge – Merge branches

### Other Commands

* git log  
* git show  
* git switch  
* git checkout \-b  
* mv  
* Q to exit log view

## Local Repository Creation 

I created a folder and initialized a repository:  
mkdir abc  
cd abc  
touch file1.md  
git init  
git add file1.md  
git commit \-m "hello"

This helped me understand the staging area and commits.

## GitHub CLI (gh) Setup

I installed GitHub CLI using:  
 winget install \--id GitHub.cli

I logged in using:  
 gh auth login

* I authenticated using the web browser.

## Forking a Repository

* I initially used an incorrect repository format and received a 404 error.

I corrected it and successfully forked a repository using:  
 gh repo fork owner/repository-name \--clone

* The fork was created and cloned locally.  
* The upstream branch was set automatically.

## Moving a Repository

I moved the cloned repository into another directory using:  
mv folder-name Documents/

## Github Activity (through meet- after forking)

I created a new folder:  
mkdir repo-name  
cd repo-name  
echo "\# My First Repo" \> README.md

Initially, I received an error because it was not a Git repository.  
I fixed it by running:  
git init  
git add README.md  
git commit \-m "first commit"

Then I created and pushed it to GitHub using:  
gh repo create repo-name \--public \--source=. \--remote=origin \--push

The repository was successfully created, remote was added, and code was pushed.

## Errors I Faced and Fixed

* Typo in git init  
* Tried running GitHub CLI commands outside a Git repository  
* Forgot to specify \--source=. when creating a repo  
* Used placeholder repository name while forking  
* Accidentally pasted terminal prompt text as commands

I identified and corrected each issue.

## Concepts I Understood

* Local repository vs remote repository  
* Fork vs clone  
* Push vs pull  
* SSH authentication  
* Using GitHub CLI  
* Branch basics

## Final Outcome

* Git installed and configured  
* SSH successfully set up  
* GitHub CLI installed and authenticated  
* Forked a repository  
* Created local repositories  
* Created a new GitHub repository  
* Successfully pushed code

