import ChatServer  from './chat-server';
import * as express from "express";

let app: express.Application = new ChatServer().getApp();
export {app} ;