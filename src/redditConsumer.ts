import { connect } from "amqplib";

var q = "tasks";

async function main() {
  const connection = await connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(q);
  channel.consume(q, function (msg) {
    if (msg !== null) {
      console.log(msg.content.toString());
      channel.ack(msg);
    }
  });
}

main();
