const { checkJWT } = require('../helpers/jwt');
const {io} = require('../index');
const {userConnected , userDisconnected, saveMessage } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Client connected');

    // Get JWT
    const [valid, uid] = checkJWT(client.handshake.headers['x-token']);

    console.log(valid, uid);

    // Verify authentation
    if(!valid){ return client.disconnect();}

    // Client authenticated and connected
    console.log('Client authenticated');
    userConnected(uid);

    // Put user into private room
    // global room -> io.emit
    // create a room with user.id

    // we create a room with the name user.id
    client.join(uid);

    // listen client 'personal-message'
    client.on('personal-message', async (payload) =>{
        console.log(payload);
        // Save message
        await saveMessage(payload);
        // send sms to a channel 
        io.to(payload.to).emit('personal-message', payload);
    });

    client.on('disconnect', () => { 
        console.log('Client disconnected');
        userDisconnected(uid);
    });
    
    
  });
