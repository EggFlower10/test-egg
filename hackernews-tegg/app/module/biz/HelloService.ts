// biz/HelloService.ts
import { SingletonProto } from 'egg';

@SingletonProto()
export class HelloService {
    async hello(): Promise<string> {
        return 'hello';
    }
}

@SingletonProto({
    name: 'worldInterface',
})
export class WorldService {
    async world(): Promise<string> {
        return 'world!';
    }
}