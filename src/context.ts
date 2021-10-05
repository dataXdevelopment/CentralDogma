import { Channel } from "amqplib";
export interface Context {
  taskQueue: Channel;
}
