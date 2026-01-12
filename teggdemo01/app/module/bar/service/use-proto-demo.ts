// app/module/bar/service/proto-demo.service.ts
import { ContextProto, SingletonProto, Inject } from 'egg';

// -------------------- ContextProto 示例 --------------------
@ContextProto()
export class ContextHelloService {
    async hello(): Promise<string> {
        return 'ContextProto: hello';
    }
}

@ContextProto({ name: 'contextWorldInterface' })
export class ContextWorldService {
    async world(): Promise<string> {
        return 'world!';
    }
}

@ContextProto()
export class ContextDemo {
    @Inject()
    contextHelloService: ContextHelloService;

    @Inject()
    contextWorldInterface: ContextWorldService;

    async sayContext(): Promise<string> {
        return `${await this.contextHelloService.hello()}, ${await this.contextWorldInterface.world()}`;
    }
}

// -------------------- SingletonProto 示例 --------------------
@SingletonProto()
export class SingletonHelloService {
    async hello(): Promise<string> {
        return 'SingletonProto: hello';
    }
}

@SingletonProto({ name: 'singletonWorldInterface' })
export class SingletonWorldService {
    async world(): Promise<string> {
        return 'world!';
    }
}

@SingletonProto()
export class SingletonDemo {
    @Inject()
    singletonHelloService: SingletonHelloService;

    @Inject()
    singletonWorldInterface: SingletonWorldService;

    async saySingleton(): Promise<string> {
        return `${await this.singletonHelloService.hello()}, ${await this.singletonWorldInterface.world()}`;
    }
}