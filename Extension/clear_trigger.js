let x = document.body.childNodes;



function goToDepth(arr, wordsToReplace) {
    for (let i = 0; i < arr.length; i++) {
      console.log(arr);
      console.log(i);
      console.log(arr[i]);
      if (arr[i].childNodes.length != 0) {
        console.log('this is an if clause running');
        goToDepth(arr[i].childNodes, wordsToReplace);
      } else {
        console.log('this is a childest element', arr[i]);
            if (arr[i].nodeType == Node.TEXT_NODE) {
                let textContent = arr[i].textContent.toLowerCase();
                console.log('this is the lowecased text content', textContent);
                console.log('these words to be replaced', wordsToReplace);
                wordsToReplace.forEach(word => {
                    let lowerCaseWord = word.toLowerCase();
                    if (textContent.toLowerCase().includes(lowerCaseWord)) {
                        console.log('Found word:', word, 'in:', textContent);
                        // Create a regular expression to replace all occurrences of the word, case insensitive
                        let regex = new RegExp(word, 'gi');
                        console.log('this is the regex', regex);
                        arr[i].textContent = textContent.replace(regex, '<redacted>');
                        console.log('this is the textContent after regex', textContent);
                    } else {
                        console.log('i did not find a', arr[i]);
                        };
                    
                });
                
            }

        }
      }
  }
 



  // Store words on button click
document.addEventListener('DOMContentLoaded', function() {
  console.log('document load event working');
  document.getElementById('submitButton').addEventListener('click', function() { // take document, get element named submitbutton and add a listener for click event which if detects a click, executes a function
    console.log('save event listener working');
    const input = document.getElementById('inputField').value; // take the input you've gotten through inputfield of html and store in constant named input
    words = input.split(','); 
    console.log('first time just splitting splitting', words);
    words = words.map(word => word.trim()); // map takes an array's elements, runs a function on each element and takes the outputs and stores them in a separate new array
    console.log('second time just mapping mapping', words); 
  
    // store words in chrome storage
    chrome.storage.sync.set({storedwords: words}, function(){
      console.log('this was saved', words);
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'replaceWords', words: words});
    });

    });


  });
});

 

chrome.storage.sync.get(['storedwords'], function(result){
    console.log('this will print result', result);
    const psw = result.storedwords;
    console.log('Retrieved value:', psw);
    goToDepth(x, psw);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'replaceWords' && request.words) {
        goToDepth(x, request.words);
    }
});


