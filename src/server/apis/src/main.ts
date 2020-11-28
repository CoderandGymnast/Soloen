import { NestFactory } from '@nestjs/core';
import { EventEmitter } from 'events';
import { AppModule } from './app.module';
import { NodeClient } from './blockchain/NodeClient';
import config from './config';
import { AddressService } from './services/address.service';
import { Synchronizer } from './worker/synchronizer.worker';
import { AddressTracker } from './worker/trackers/address.tracker';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  await app.listen(3000)

  const channel = app.get(EventEmitter)
  const addressService = app.get(AddressService)

  const options: NodeClient.Options = {
    fullHost: config.nodes.fullHost,
    eventServer: config.nodes.eventServer
  }
  const nodeClient = new NodeClient(options)

  const addressTracker = new AddressTracker(channel, addressService)
  await addressTracker.start()

  const listeners = [addressTracker]

  const synchronizer = new Synchronizer(nodeClient, listeners)

  await synchronizer.start()
}
bootstrap();
