import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisClient as Redis } from 'redis';
import { PROVIDE } from 'src/references';
import Bluebird from 'bluebird';

@Module({
	providers: [
		{
			provide: PROVIDE.REDIS,
			useFactory: (config: ConfigService) => {
				return new RedisService(redisFactory(config));
			},
			inject: [ConfigService]
		}
	],
	exports: [PROVIDE.REDIS],
	imports: [ConfigModule],
})
export class RedisModule {}

export interface RedisClient extends Redis {
	getAsync?: (str: string) => string | null;
}

const redisFactory = (config: ConfigService) => {
	const client: RedisClient = new Redis({
		host: config.get('redis.host'),
		port: config.get('redis.port'),
		db: config.get('redis.db'),
	});
	client.getAsync = Bluebird.promisify(client.get).bind(client);
	// Bluebird.promisifyAll(client.get).prototype;
	// client.get = Promise.promisify(client.get).bind(client);
  // client.hmget = Promise.promisify(client.hmget).bind(client);
  // client.hgetall = Promise.promisify(client.hgetall).bind(client);
  // client.scan = Promise.promisify(client.scan).bind(client);
  // client.multi = Promise.promisify(client.multi).bind(client);
  // client.del = Promise.promisify(client.del).bind(client);
	return client;
}

interface ProxyReturnData {
  cacheKey: string;
  func: Function;
  arg: any[];
  expireTime?: number;
}

export class RedisService {

	constructor(
		private readonly client: RedisClient
	) {}

	async returnCacheData<T> ({cacheKey, func, arg, expireTime = 60}: ProxyReturnData) : Promise<T> {
		try {
			// console.log('expireTime', expireTime);
			const cache = await this.client.getAsync(cacheKey);
			// console.log('cache', cache);
			if(!cache) {
				const result = await func(...arg);  
				this.client.set(
					cacheKey, 
					JSON.stringify(result),
					'EX',
					expireTime,
				);
				return result;
			}
			const payload = JSON.parse(cache);
			// // console.log('payload', payload);
			return payload;
		} catch(error) {
			// console.log('cache error');
			return await func(...arg);
		}
	}
}

// export async function returnCacheData<T> ({cacheKey, func, arg, expireTime = 60}: ProxyReturnData) : Promise<T> {
//   try {
//     // console.log('expireTime', expireTime);
//     const client = getRedisClient();
//     const cache = await client.get(cacheKey);
//     // console.log('cache', cache);
//     if(!cache) {
//       const result = await func(...arg);  
//       client.set(
//         cacheKey, 
//         JSON.stringify(result),
//         'EX',
//         expireTime,
//       );
//       return result;
//     }
//     const payload = JSON.parse(cache);
//     // console.log('payload', payload);
//     return payload;
//   } catch(error) {
//     // console.log('cache error');
//     return await func(...arg);
//   }
// }