import { createServer, Server } from 'http';
import * as express from 'express';
import * as SocketIO from 'socket.io';

import { Message } from './model/message';

export default class ChatServer {

    public static readonly PORT:number = 3000;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || ChatServer.PORT;
        this.server = createServer(this.app);
        this.io = SocketIO(this.server);
        this.listen();
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            let nick = socket.handshake.query ? socket.handshake.query.nick : 'Anonymus';
            console.log('Connected client on port %s. with id %s, nick = %s', this.port, socket.id, nick);

            // socket.on('message', (m: Message) => {
            //     console.log('[server](message): %s', JSON.stringify(m));
            //     this.io.emit('message', m);
            // });

            socket.on('ui_message', (msg: any) => {
                let date = new Date();
                let time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
                let nick = msg.nick;
                let msgText = msg.text;
                console.log('[CHAT] [' + time + '] ' + nick + ': ' + msgText);
                socket.emit('server_message', {
                    nick: nick,
                    text: msgText,
                    time: time
                });
                // console.log('[server](message): %s', JSON.stringify(msg));
                // this.io.emit('message', m);
            });

            socket.on('ding', () => {
                socket.emit('dong');
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}