# WEEK 2

## 21 Feb 2026
Worked on the Google login using GIS(Google Identity Services).

So once we have logged in using google, we are redirected to the main application where we use the Google Picker API, a Javascript API, to let users view and select the desired file directly from their Google Drive. 

### Primarily Use
**google.picker.PickerBuilder** the builder object used to configure and construct a Picker instance by setting the client-id and app-id
**google.picker.Picker** is the final picker object created by the PickerBuilder

We are using a Google-provided UI component(i.e Google’s React wrapper over the drive-picker web component) that gives you a ready-made file selection popup so that we don’t have to build our own file browser. 
Now we conditionally render the drive-picker element, i.e once we click on the Open Picker button, the showPicker state changes and the picker is initialized using the Client ID, we then filter out the files to only pdfs owned by the user on their Drive and once a file is picked, the onPicked callback runs which returns the metadata such as the file id, name, MIME type etc which we plan use to fetch the actual file content using the Google Drive API later on.