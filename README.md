# st-web

>后台管理系统

### 安装依赖

```shell
$ cd /path/to/st-web
$ npm install
```

### 本地运行

```shell
$ npm run dev
```

or run with mock api
```shell
$ npm run mock
```

### 构建

```shell
# dev环境构建
$ npm run build:dev

# prd环境构建
$ npm run build:prd
```

### 发布前
```shell
# 生成ChangeLog
$ npm run prepublishOnly
```

### 发布
```shell
$ npm run release
```

### 备注
nginx需增加以下配置

```shell
location / {
  try_files $uri $uri/ /index.html;
}

```

