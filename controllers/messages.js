
const Message = require('../models/message');
const getChat = async(req, res)=>{
    const myUid = req.uid;
    const messagesFrom = req.params.from;

    // last 30 messages
    const last30 = await Message.find({
        $or: [{from: myUid, to: messagesFrom}, {from: messagesFrom, to: myUid}] // messages that I have sent or that I received
    })
    .sort({createdAt: 'desc'})
    .limit(30);

    res.json({
        ok: true,
        messages: last30
    });

}

module.exports = {
    getChat
}