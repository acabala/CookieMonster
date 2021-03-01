let defaults = [];

async function removeCookies() {
    let mappings = await getMappings();

    let parsedUrl = window.location.href.replace("https://", "")
                .replace("http://", "")
                .replace("www.", "")

    let domain = parsedUrl.slice(0, parsedUrl.indexOf('/') == -1 ? parsedUrl.length : parsedUrl.indexOf('/'))
    .slice(0, parsedUrl.indexOf('?') == -1 ? parsedUrl.length : parsedUrl.indexOf('?'));

console.log(mappings);

let results = mappings.filter(item => item.domain === domain);

results.forEach(item => {
        let element;

        if(item.type == 'class') {
         element = document.getElementsByClassName(item.value)[0];
        } else {
          element = document.getElementById(item.value);
        }

        if(item.action == 'click') {
            element.click();
        } else if (item.action == 'hide') {
            element.setAttribute("style", "display: none !important;");
        }

        console.log('cookies box removed');
    
    });
    
}


async function getMappings()
{

return new Promise(function(resolve, reject) {
    let url = chrome.extension.getURL('mappings.json');

    // Standard XHR to load an image
    var request = new XMLHttpRequest();
    request.open('GET', url);
    // When the request loads, check whether it was successful
    request.onload = function() {
      if (request.status === 200) {
      // If successful, resolve the promise by passing back the request response
        resolve(JSON.parse(request.responseText));
      } else {
      // If it fails, reject the promise with a error message
        reject(Error('Request failed.  error code:' + request.statusText));
      }
    };
    request.onerror = function() {
    // Also deal with the case when the entire request fails to begin with
    // This is probably a network error, so reject the promise with an appropriate message
        reject(Error('There was a network error.'));
    };
    // Send the request
    request.send();
  });

}

removeCookies();

