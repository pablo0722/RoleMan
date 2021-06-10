let token = '';
let tuid = '';

const twitch = window.Twitch.ext;

// create the request options for our Twitch API calls
const requests = {
    set: createRequest('POST', 'cycle'),
    get: createRequest('GET', 'query')
};

function createRequest (type, method) {
    return {
        type: type,
        url: location.protocol + '//localhost:8081/color/' + method,
        //url: "https://twitch.center/customapi/quote?token=5ad96265",
        success: updateBlock,
        error: logError
    };
}

function setAuth (token) {
  twitch.rig.log(`Setting auth keys: ${Object.keys(requests)}`);
  Object.keys(requests).forEach((req) => {
    twitch.rig.log(`Setting auth headers: ${req}`);
    requests[req].headers =
    {
        'Authorization': 'Bearer ' + token
        /*
        ':authority': 'twitch.center',
        ':method': 'twitch.center',
        ':path': '/customapi/quote?token=5ad96265',
        ':scheme': 'https',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
        */
    };
    
    twitch.rig.log(`LITO Setting auth headers: ${req}`);
    //requests[req].headers["accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9";
    /*requests[req].headers["accept-encoding"] = "gzip, deflate, br";
    requests[req].headers["accept-language"] = "es-ES,es;q=0.9,en;q=0.8";
    requests[req].headers["cache-control"] = "max-age=0";
    //requests[req].headers["cookie"] = '_ga=GA1.2.1066112434.1616561979; _gid=GA1.2.1667813093.1621934996; DgU00="iriHhXPLQfRv0MYwclZluk6c5RrCnSxNwftSIbet+6M=1622539888_a614428b6faaaf7770d73615276368e3gAJ9cQB9cQEoVQx0d2l0Y2hfc3RhdGVxAlUIOWIxMTFhZjlxA1UNdHdpdGNoX3JldHVybnEEVQYvdG9rZW5xBXWGcQYu"; sc_is_visitor_unique=rx10729979.1621935096.D57595A7028F4F59274AA2552B0C087D.5.5.5.5.5.5.5.5.5';
    requests[req].headers["sec-ch-ua"] = '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"';
    requests[req].headers["sec-ch-ua-mobile"] = "?0";
    requests[req].headers["sec-fetch-dest"] = "document";
    requests[req].headers["sec-fetch-mode"] = "navigate";
    requests[req].headers["sec-fetch-site"] = "none";
    requests[req].headers["sec-fetch-user"] = "?1";
    requests[req].headers["upgrade-insecure-requests"] = "1";
    *//*
    requests[req].headers["cookie"] = "gzip";
    */
  });
}

twitch.onContext(function (context) {
  twitch.rig.log(context);
});

twitch.onAuthorized(function (auth) {
  // save our credentials
  token = auth.token;
  tuid = auth.userId;

  // enable the button
  $('#cycle').removeAttr('disabled');

  //twitch.rig.log(`ANTES:`);
  //twitch.rig.log(requests);
  setAuth(token);
  $.ajax(requests.get);
  //twitch.rig.log(`DESP:`);
  //twitch.rig.log(requests);
});

function updateBlock (hex) {
  twitch.rig.log('Updating block color');
  $('#color').css('background-color', hex);
  //$('#robi').innerHTML = `robichiste: ${hex}`;
}

function logError(xhr, error, status) {
    twitch.rig.log('EBS request returned '+status+' ('+error+')');
  //twitch.rig.log(`EBS error returned ${status} (${error}: ${xhr.responseText})`);
}
function logSuccess(hex, status) {
  twitch.rig.log('EBS request returned '+hex+' ('+status+')');
}

$(function () {
    // when we click the cycle button
    $('#cycle').click(function ()
    {
        if(!token)
        {
            return twitch.rig.log('Not authorized');
        }
        twitch.rig.log('Requesting a color cycle');
        $.ajax(requests.set);
        //const data = new FormData();
        //data.append('token', '5ad96265');
        //fetch (`https://twitch.center/customapi/quote`,
        //fetch ('https://jsonplaceholder.typicode.com/posts',
        //fetch ('https://api.chucknorris.io/jokes/random',
        //fetch ('https://api.chucknorris.io/jokes/search?query=lalla',
        /*fetch ('https://api.github.com/users/shrutikapoor08/repos')
            .then (logSuccess)
            .catch (fail);
            */
        /*var url = "https://twitch.center/customapi/quote?token=5ad96265";
        $.get(url, function (result)
        {
            twitch.rig.log(result);
        });*/
        //fetch('http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC')
        //fetch('https://randomuser.me/api/?results=1')
        //*
        /*
        ':authority': 'twitch.center',
        ':method': 'twitch.center',
        ':path': '/customapi/quote?token=5ad96265',
        ':scheme': 'https',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
        */
       var myHeaders = new Headers(
           /*
           {
           ':authority': 'twitch.center',
           ':method': 'twitch.center',
           ':path': '/customapi/quote?token=5ad96265',
           ':scheme': 'https',
           'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
        }
        */
       );
       /*
       
        var request = new Request('https://twitch.center/customapi/quote?token=5ad96265'
        , {
                headers: headers
            }
            );
            //*/

        async function getData(url = '') {
            twitch.rig.log('getting data');
            // Opciones por defecto estan marcadas con un *
            const response = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                //mode: 'no-cors', // no-cors, *cors, same-origin
                //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers: {
                    "Content-Type": "text/plain",
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                    "cache-control": "max-age=0",
                    "upgrade-insecure-requests": "1",
                //    "cookie": '_ga=GA1.2.1066112434.1616561979; _gid=GA1.2.1667813093.1621934996; DgU00="iriHhXPLQfRv0MYwclZluk6c5RrCnSxNwftSIbet+6M=1622539888_a614428b6faaaf7770d73615276368e3gAJ9cQB9cQEoVQx0d2l0Y2hfc3RhdGVxAlUIOWIxMTFhZjlxA1UNdHdpdGNoX3JldHVybnEEVQYvdG9rZW5xBXWGcQYu"; sc_is_visitor_unique=rx10729979.1621935096.D57595A7028F4F59274AA2552B0C087D.5.5.5.5.5.5.5.5.5',
                //    "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
                //    "sec-ch-ua-mobile": "?0",
                //    "sec-fetch-dest": "document",
                //    "sec-fetch-mode": "navigate",
                //    "sec-fetch-site": "none",
                //    "sec-fetch-user": "?1",
                },
                ////redirect: 'follow', // manual, *follow, error
                //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            })
            .catch(function(text) {
                twitch.rig.log(`MALLL: ${text}`);
            });
            twitch.rig.log('ke paso?');
            twitch.rig.log('ke paso 2?');
            twitch.rig.log('ke paso 3?');
            return response.text(); // parses JSON response into native JavaScript objects
        }
        
        getData('https://twitch.center/customapi/quote?token=5ad96265')
        .then(data => {
            twitch.rig.log('vino');
            twitch.rig.log(data);
            $('#robi').html(data.slice (1, 20));
        });

        twitch.rig.log('bay bay');
        //*/
        /*
        const Http = new XMLHttpRequest();
        const url='https://twitch.center/customapi/quote?token=5ad96265';
        //const url='https://jsonplaceholder.typicode.com/posts';

        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            twitch.rig.log(Http.responseText);
        }
        */
       
    });
});
