/* Comandos
https://quiet-journey-88282.herokuapp.com/ModAdd?mod=frutsicongelad0
https://quiet-journey-88282.herokuapp.com/ModAdd?mod=ShinkeiAls
https://quiet-journey-88282.herokuapp.com/ModAdd?mod=Unicorniooscuro
https://quiet-journey-88282.herokuapp.com/ModAdd?mod=Meliluff
https://quiet-journey-88282.herokuapp.com/ModAdd?mod=papitax3

https://quiet-journey-88282.herokuapp.com/ModRmState?state=nose

https://quiet-journey-88282.herokuapp.com/ModAddState?state=Atiende consultas
https://quiet-journey-88282.herokuapp.com/ModAddState?state=Posiciona canción
https://quiet-journey-88282.herokuapp.com/ModAddState?state=Agrega canción

https://quiet-journey-88282.herokuapp.com/ModState?mod=frutsicongelad0&state=Agrega canción
*/

let token = '';
let Bearer_token = '';
let auth_token = '';
let clientId = ''; // for the app
let user = {id: '', login: '', display_name: ''};

const twitch = window.Twitch.ext;

async function log (msg) {
    var logs;
    do {
        logs = document.getElementById ("logs");
        if (! logs ) {
            await new Promise (resolve => setTimeout (resolve, 1000));
        }
    } while (! logs);

    var el = document.createElement ("p");
    el.innerHTML = `log: ${msg}`;
    el.style.color = "red";
    logs.appendChild (el);
}

twitch.onContext (function (context) {
    log (`context: ${JSON.stringify (context)}`);
});

twitch.onAuthorized (function (auth) {
    // save our credentials
    log (`<onAuthorized>`);

    if (token != '') {
        return;
    }

    auth_token = auth.token;
    token  = '1idg3c5ccg55tfqz826wjhs3w81n3f'; // Secret code generated from extention admin page
    Bearer_token = token;
    clientId = 'z6nrx4ljttxzi6rf0a72nd6bjejx2s'; // app's "client id"

    if (twitch.viewer.id === null) {
        twitch.actions.requestIdShare ();
    }

  // enable the button
  $('#cycle').removeAttr('disabled');

  getData (`https://api.twitch.tv/helix/users?id=${twitch.viewer.id}`)
  .then (data => {
        log (`data: ${data}`);
        data = JSON.parse (data).data;
        user ['id']           = data [0].id;
        user ['login']        = data [0].login;
        user ['display_name'] = data [0].display_name;

        log (`user: ${JSON.stringify (user)}`);

        //add_mod (user ['login']);

        getData (`https://quiet-journey-88282.herokuapp.com/ModList`)
        .then (data => {
            log (`mod list: ${data}`);
            mods = JSON.parse (data);

            var eventSource = new EventSource ("https://quiet-journey-88282.herokuapp.com/ModListEvent");
            eventSource.onmessage = function (e) {
                var logs = document.getElementById ("logs");
                if (e.logs) {
                    var el = document.createElement ("p");
                    el.innerHTML = `log: ${e.logs}`;
                    el.style.color = "red";
                    logs.appendChild (el);
                }

                updateMods (JSON.parse (e.data));
            }

            mods = JSON.parse(mods);
            console.log (`mods: ${Object.keys (mods)}`);
            console.log (`user: ${user ['login']}`);

            if (Object.keys (mods).find ((str) => str === user ['login']) === undefined) {
                //twitch.actions.minimize ();
                return;
            }

            $("#buttons").show ();
            //$("#debug-buttons").show ();

            getData (`https://quiet-journey-88282.herokuapp.com/ModGetStates`)
            .then (data => {
                log (`state getted: ${data}`);

                states = JSON.parse (data);

                for (const [key, value] of Object.entries (states)) {
                    var buttons = document.getElementById ("buttons");
                    var el = document.createElement ("input");
                    el.type = `button`;
                    el.classList.add (`state-button`);
                    el.value = `${key}`;
                    el.style.color = "green";
                    buttons.appendChild (el);
                }

                var buttons = document.getElementById ("buttons");
                var el = document.createElement ("input");
                el.type = `button`;
                el.id = `offline-btn`;
                el.value = `offline`;
                el.style.color = "red";
                buttons.appendChild (el);
                
                $('.state-button').click(function () {
                    log (`set state-button: ${$(this).val ()}`);
                    set_state (user ['login'], $(this).val ());
                });

                $('#offline-btn').click(function () {
                    set_state (user ['login'], 'offline');
                });
            });
        });
    });
});

function logSuccess (hex, status) {
    log ('EBS request returned '+hex+' ('+status+')');
}

async function getData (url = '') {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch (url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        //mode: 'no-cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'omit', // include, *same-origin, omit
        headers: {
            'Authorization': 'Bearer ' + Bearer_token,
            //'Authorization': 'OAuth ' + auth_token,
            'client-id':     clientId,
            'Accept':        'application/vnd.twitchtv.v5+json'
        },
    })
    .catch (function (text) {
    });
    return response.text (); // parses JSON response into native JavaScript objects
}

function add_mod (mod_name, callback) {
    getData (`https://storage.rada0722.repl.co/edit?filename=ModList.json&${mod_name}=offline`)
    .then (data => {
        log (`mod added: ${data}`);
        callback (data);
    });
}

function rm_mod (mod_name, callback) {
    getData (`https://quiet-journey-88282.herokuapp.com/ModRm?mod=${mod_name}`)
    .then (data => {
        log (`mod removed: ${data}`);
        callback (data);
    });
}

function get_states (callback) {
    getData (`https://storage.rada0722.repl.co/get?filename=ModStates.json`)
    .then (data => {
        log (`state getted: ${data}`);
        callback (data);
    });
}

function add_state (state, callback) {
    getData (`https://storage.rada0722.repl.co/edit?filename=ModStates.json&${state}=1`)
    .then (data => {
        log (`state added: ${data}`);
        callback (data);
    });
}

function rm_state (state, callback) {
    getData (`https://quiet-journey-88282.herokuapp.com/ModRmState?state=${state}`)
    .then (data => {
        log (`state removed: ${data}`);
        callback (data);
    });
}

function set_state (mod, state, callback) {
    getData (`https://storage.rada0722.repl.co/edit?filename=ModList.json&${mod}=${state}`)
    .then (data => {
        log (`state setted: ${data}`);
        callback (data);
    });
}

$(function () {
    $('#log-btn').click(function () {
        if ($('#logs').css ('display') === 'none') {
            $('#logs').show ();
            $('#log-btn').val('ocultar logs');
        } else {
            $('#logs').hide ();
            $('#log-btn').val('mostrar logs');
        }
    });

    $('#get-states-btn').click(function () {
        get_states ((data) => {});
    });

    $('#add-state-btn').click(function () {
        text = document.getElementById ("extra-txt").value;
        add_state (text, () => {});
    });

    $('#rm-state-btn').click(function () {
        text = document.getElementById ("extra-txt").value;
        rm_state (text, () => {});
    });

    $('#offline-state-btn').click(function () {
        text = document.getElementById ("extra-txt").value;
        set_state (text, 'offline', () => {});
    });

    $('#add-mod-btn').click(function () {
        text = document.getElementById ("extra-txt").value;
        add_mod (text, () => {});
    });

    $('#rm-mod-btn').click(function () {
        text = document.getElementById ("extra-txt").value;
        rm_mod (text, () => {});
    });
});

function updateMods (json_obj) {
    // Remove all mods
    var mods_online = document.getElementById ("mods-online");
    mods_online.textContent = '';
    var mods_offline = document.getElementById ("mods-offline");
    mods_offline.textContent = '';

    for (const [key, value] of Object.entries (json_obj)) {
        tags = '';
        if (value === "offline") {
            mods = mods_offline;
            color = "red";
            tags = "offline";
        } else {
            mods = mods_online;
            color = "green";
            value.forEach(v => {
                tags+=`${v}, `;
            });
        }
        display = "inline";
        fontWeight = "bold";
        var el = document.createElement ("p");
        el.innerHTML = `${key}: `;
        el.style.display = display;
        el.style.color = "white";
        mods.appendChild (el);
        var el = document.createElement ("p");
        el.innerHTML = `${value}</br>`;
        el.style.display = display;
        el.style.color = color;
        el.style.fontWeight = fontWeight;
        mods.appendChild (el);
    }
}