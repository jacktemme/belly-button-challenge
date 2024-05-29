Module 14

This repositiory contains the HTML (index.html file) and javascript (app.js file) source code for an interactive website that explores the biodiversity of bacteria from the belly buttons of different subjects. The bacteria found on these subjects was counted as well as organized by closely related microbe types called Operational Taxonommic Unit (or OTUs). These findings were then visualized both as bar and bubble charts that can be changed for each subject through a dropdown menu. The dataset for this website can be found in the samples.json file, but originally was referenced from http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/.


The interactive website can be acessed here: 
https://jacktemme.github.io/belly-button-challenge/


To loop through the keys and values of a dictionary this code from chatgpt was referenced:

for (var key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
        console.log(key + ': ' + jsonObject[key]);
    }
}

