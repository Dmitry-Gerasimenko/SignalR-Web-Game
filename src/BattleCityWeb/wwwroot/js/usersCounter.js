var userCounterConnection = new signalR.HubConnectionBuilder().withUrl("/usershub").build();

userCounterConnection.on("NotifyClientsCounter", function (clientsCounter, authorizedClientsCounter) {

    $('#usersCounter').fadeToggle().text(clientsCounter).fadeToggle()
    $('#authCounter').fadeToggle().text(authorizedClientsCounter).fadeToggle();
});

userCounterConnection
    .start()
    .then(function () {
        console.dir('USERS COUNTER CONNECTION STARTED')
    })
    .catch(function (err) {
        return console.error(err.toString());
    });