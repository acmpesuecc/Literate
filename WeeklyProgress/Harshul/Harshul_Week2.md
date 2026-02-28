# Week 2 Progress 
## Day 1 
1. Learnt about terminologies such as API keys, JSON files 
2. API Keys: These are used to send requests from the client to the server and back to the client. 
3. JSON files: These are the files in which any data across the internet is sent. All information is packaged in this file and is sent across the internet as packets. 
## Day 2 
1. Learnt about Google Identity Services and how it works.
    
    GIS: It is Google's authentication service that enables the user to be able to login to their google account and proceed to our webapp. 
2. Learnt about react routing: It is the mechanism by which we can go to different pages within the webapp. 

## Day 3-6
1. Understood terms like 
   1. Client ID: It is the ID that google generates when we are testing the site by logging in from a test account. That id has be to registered by google to provide authentication to login from google. 
   2. Token ID: It is the ID that is generated when we try to login to the SPA. This token is decoded to obtain further user information such as Name, Email ID, etc.
2. Made a .env file : Made a file that stores the client ID that is accessed by OAuth to verify the client ID and then authenticate to login. 
3. Understood the requirement of .env file
4. Understood the workflow of Google Login. 
   
## Challenges.
1. Creating a branch with our feature name, cloning the main project repo and pushing changes to our branch to proceed to make a pull request to merge the branch into the main branch. 
2. Creating the .env file and allowing google OAuth to get access to that file through the landing.jsx file. 

## How I overcame them 
1. Did git pull everytime i was working on a part of the project as my fellow team members were making changes to the files. 
2. Understood why the .env file is necessary for our current phase of the app and learnt how to setup a path in the landing.jsx file so that google OAuth can read the .env file as it is hidden.
