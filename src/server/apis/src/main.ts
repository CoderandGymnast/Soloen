import { NestFactory } from '@nestjs/core';
import { EventEmitter } from 'events';
import { AppModule } from './app.module';
import { NodeClient } from './blockchain/nodeclient.blockchain';
import config from './config';
import { AddressService } from './services/address.service';
import { ContractService } from './services/contract.service';
import { Synchronizer } from './worker/synchronizer.worker';
import { AddressTracker } from './worker/trackers/address.tracker';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(3000)

  const channel = app.get(EventEmitter)
  const addressService = app.get(AddressService)
  const contractService = app.get(ContractService)

  const options: NodeClient.Options = {
    fullHost: config.nodes.fullHost,
    eventServer: config.nodes.eventServer
  }
  const nodeClient = new NodeClient(options)
  
  contractService.initNodeClients(nodeClient.getNodeClients())

  const addressTracker = new AddressTracker(channel, addressService)
  await addressTracker.start()

  const listeners = [addressTracker]

  const synchronizer = new Synchronizer(nodeClient, listeners)

  await synchronizer.start()

  console.log("[SOLOEN]: All services are ready...")
}
bootstrap();

/**
 * [NOTES]: 
 * Retrieve a specific instance: https://docs.nestjs.com/standalone-applications
 */