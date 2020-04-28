exports = module.exports = (socket, io) => {
    // When someone tries to open a chat, 
    socket.on('startChat', (msg) => {
        //  Check if there are previous messages to display them. if not, post a new chat. To be finished with Angular
        // fetch('../routes/chatRoute', {
        //     method: 'get', 
        //     headers: {
        //         "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        //     }, 
        //     body: 
        //         'uidUsuario=' + //'getting the id from the frontend' +
        //         '&uidProfesionista=' //'getting the id from the frontend'
        // }).then(
        //     (response) => {
        //         if (response.status !== 200) {
        //             console.log('Algo salió mal. Status Code: ' +
        //                 response.status);
        //             return;
        //         }

        //         // Checking the rsponse text
        //         response.json().then( (data) => {
        //             socket.emit('refresh', 'Loaded');
        //         });
        //     }
        // ).catch( (err) => console.log('Fetch error', err));

        console.log('Client says ', msg);

        // Confirmation
        socket.emit('alert', 'You are now in the chat');
        // Notify if a user is "online" or watching.
        io.emit('alert', "user is now online")

        //to render the new message on the front, it will be "socket.emit('refresh', 'Loaded');"
        io.emit('refresh', 'Loaded');
    });

    // When someone sends a message:
    socket.on('send', (msg, sender, receiver) => {
        // TODO: Store it in the DB for future conversations
        console.log('Client says ', msg, sender, receiver);

        // Sending message to the receiver
        io.to(receiver).emit('send', msg);

        // Sending confirmation to the sender
        io.to(sender).emit('alert', 'Message sent');

        io.emit('send', msg, sender, receiver);
    });



}