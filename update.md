# Updates Made!

## Resolving JSONstring not becoming PDF issue

-   When selecting a file by the drive picker , the app displayed a bunch of random data about the pdf and not the pdf
    
-   ***THE FIX*** : filtered out only the fileID and then tried passing that into the mupdf viewer in the form of a url , and that worked , i didnt get random strings BUTTT...THE RESPONSE WAS NULL....(CHECK CONSOLE ALWAYS!!)
    

## Resolving the NULL RESPONSE!

-   Okkkk sooo , Google for security reasons didnt allow me to fetch private data , even the fileid needs perms....soooo integrated gapi , what gapi did was that it allowed meto send the access token along the requests , BUT the response was still NULL

## UPDATE:

-   Gapi returned null coz i was still missing some perms , so googled up a quick function which went `gapi.client.getToken().access_token` which essentially made this handle the entire route rather than depending on some client which drive api had inbuilt ,

## Issues fixed

-   File now loads and is being rendered nicely by mupdf
-  BUNCHHH OF MERGE CONFLICTS SMHH , always do ``GIT PULL`` before anything (also the same in all small letters lol)

## whats left

-   Downloading the pdf onto the local storage of the user to that it survives a entire refresh!