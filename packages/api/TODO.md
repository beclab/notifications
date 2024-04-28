## bullMq+ nestJs用法
https://codesandbox.io/s/nestjs-forked-y26vp2?file=/src/app.module.ts

novu源码:
apps/api/src/app/events/usecases/parse-event-request/parse-event-request.usecase.ts
// 先查询模版

// 添加队列
// triggerHandlerQueueService.add
```js
import {
  JobsOptions,
  Metrics,
  MetricsTime,
  Processor,
  Queue,
  QueueOptions,
  Worker,
  WorkerOptions,
} from 'bullmq';

 // id是transactionId （uuid）

  Queue.add(id, data, {
    ...options,
    ...(BullMqService.pro && groupId
      ? {
          group: {
            id: groupId,
          },
        }
      : {}),
  });
```


## Building a REST API with NestJS and Prisma（NestJS, Prisma, PostgreSQL and Swagger）
https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0



## Fix turborepo package unexpected token export
https://stackoverflow.com/questions/73189881/turborepo-package-unexpected-token-export

## pnpm monorepo dockerfile如何写
https://pnpm.io/docker
