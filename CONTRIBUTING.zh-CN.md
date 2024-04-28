## 初始化

### Step 1：依赖环境&环境变量初始化

方法1: 通过dockercompose安装数据库，初始化环境变量
```bash
cp .env.example .env
cd docker                                                             
docker compose up -d
```

方法2: 直接修改环境变量
- 重命名.env.example为.env 
- 将.env的redis pgsql地址替换为您正在使用的

### Step 2： nodejs环境
nodejs: v18 (建议安装v20+ 这样会自带corepack)
初始化packageManager：
```
corepack enable
```

### Step 3：初始化db

```
pnpm db:migrate:deploy
```

## npm script解析
- 待补充



## api开发
- 待补充

## prisma使用

### 修改db字段,生成迁移文件
参考: https://www.prisma.io/docs/concepts/components/prisma-schema
schema.prisma目录： packages/database/prisma/schema.prisma
生成迁移记录

本地执行: 
```
pnpm db:migrate:dev
```

prisma调用
具体有哪些方法，参考：https://www.prisma.io/docs/concepts/components/prisma-client

我们使用了monorepo单独维护prisma的(packages/database)
Importing Prisma Client的方式:
package.json 中:  "database": "workspace:*",

调用方式：
```
import { PrismaClient } from 'database';
const prisma = new PrismaClient()
```

