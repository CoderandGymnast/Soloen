import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NodeClient } from './blockchain/NodeClient';
import config from './config';
import { Synchronizer } from './worker/synchronizer.worker';
import TronWeb from "tronweb"

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  await app.listen(3000)

  const options: NodeClient.Options = {
    fullHost: config.nodes.fullHost,
    eventServer: config.nodes.eventServer
  }
  const nodeClient = new NodeClient(options)
  await nodeClient.connectToNodes()

  const synchronizer = new Synchronizer(nodeClient, [])

  await synchronizer.start()
}
bootstrap();
