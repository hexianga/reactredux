## docker 常用指令

[docker cli 文档](https://docs.docker.com/engine/reference/commandline/start/)

- docker run：创建一个新的容器并运行一个命令
```
docker run --name mynginx -d nginx:latest // 以后台模式启动并且命名为 mynginx，如果没有当前的容器会自动 pull。
```
 
- start/stop/restart：启动停止或者重启一个容器
```
docker start mynginx
```

- docker kill: 杀掉一个运行中的容器。
```
docker kill mynginx
```

- docker rm：删除一个或多个容器。
```
docker rm -f mynginx // -f 表示强制删除
```

- docker pause/unpause:暂停/恢复容器中所有的进程。
```
docker pause mynginx
```

- docker exec：在运行的容器中执行命令
```
docker exec -it  mynginx /bin/bash // -t: (terminal) 表示交互性质的伪终端，-i：(input)保持 STDIN 打开，在伪终端中才能拿到输入
```

- docker ps: 列出容器
> -a :显示所有的容器，包括未运行的。
> -n :列出最近创建的n个容器
- -f :根据条件过滤显示的内容

```
docker ps --filter name=mynginx // 根据名字过滤 --filter == -f
docker ps --filter ancestor=nginx:latest // 根据镜像过滤
```

- docker inspect：获取容器/镜像的元数据
```
docker inspect nginx
```

- docker logs: 获取容器的日志
```
docker logs -f mynginx // 跟踪日志输出
```









