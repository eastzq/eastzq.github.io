## 安装包介绍

### 版本介绍
kafka版本：2.3.0  
下载地址/官网/文档：https://kafka.apache.org/downloads

这个安装包自带zookeeper-3.4.14.jar，可以同时启动zookeeper集群，如果要使用自己部署的zookeeper集群，需要注意版本号兼容。

客户端调用（java端）引入包
```
<dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-clients</artifactId>
    <version>2.3.0</version>
</dependency>
```

### kafka目录结构
* logs/ 运行启动日志
* libs/ 依赖包
* config/ 配置文件实例  
* bin/ 命令行工具脚本  

所有的配置都在config下。


## 参数优化

### 服务端配置（config/server.properties）
说明：kafka启动参数配置文件，以下列举常用配置项。
#### 系统参数

* `broker.id=1`  
  唯一的整数来标识每个broker，不能与其他broker冲突，建议从0开始。

* `listeners=PLAINTEXT://localhost:9092`  
  服务端监听的端口，和客户端通讯的端口，默认配置本机主机名或者ip地址。

* `num.network.threads=4`  
  接收客户端请求和发送返回消息的线程数目，建议配置cpu核数，根据实际情况调整。

* `num.io.threads=8`  
  对服务端进行io读写的线程数目。建议配置cpu核数*2，根据实际情况调整。

* `group.initial.rebalance.delay.ms=3000`  
  消费者群进行负载均衡的延迟时间，比如我同时启动10个消费线程，但是我可以延迟3s等待消费线程启动完成再进行负载均衡，这样每个partion可以平均分配到各个消费者上。依据实际情况调整。

#### 日志参数

* `log.dirs=/data/kafka-logs`  
  消息保存位置。可以配置多个目录，如 `/data/kafka-logs1,/data/kafka-logs2`

#### topic参数
* `num.partitions=1`  
  每个主题默认分区数目，自动创建topic时使用默认配置，若是手动创建可以带参数覆盖这些配置。

* `message.max.bytes=5242880`   
  单个消息的最大字节数，，默认977KB，建议改成5M，注意：`replica.fetch.max.bytes`的值也做同样配置，规则：replica.fetch.max.bytes>=message.max.bytes。

* `replica.fetch.max.bytes=5242880`
  复制消息最大字节数，配合`message.max.bytes`使用。

#### zookeeper参数
* `zookeeper.connect=localhost:2181`  
  zookeeper地址，可以配置多个通过逗号隔开，如`127.0.0.1:3000,127.0.0.1:3001,127.0.0.1:3002`

* `zookeeper.connection.timeout.ms=60000`  
  连接zookeeper的超时时间。

### 生产者关键参数
说明：通过自定义KafkaProducer的配置项来优化和broker的通讯。
#### 基本参数
* `bootstrap.servers`  
  一组host和port用于初始化连接，不管这里配置了多少台server, 都只用作发现整个集群全部server信息，这个配置不需要包含集群所有的机器信息，但是最好多于一个， 以防服务器挂掉。

* `key.serializer`  
  用于 key 键的序列化方法，实现了 `org.apache.kafka.common.serialization.Serializer`

* `value.serializer`  
  用于 value 值的序列化方法，实现了 `org.apache.kafka.common.serialization.Serializer`

* `acks`  
  acks 设置消息发送策略,此参数对消息丢失的影响较大。通常设置为 all，确保消息被接收。  
  如果 acks = 0，就表示生产者也不知道自己产生的消息是否被服务器接收了。这就类似于 UDP 的运输层协议，只管发，服务器接受不接受它也不关心。  
  如果 acks = 1，只要集群的 Leader 接收到消息，就会给生产者返回一条消息，告诉它写入成功。如果发送途中造成了网络异常或者 Leader 还没选举出来等其他情况导致消息写入失败，生产者会受到错误消息，这时候生产者往往会再次重发数据。因为消息的发送也分为 同步 和 异步，Kafka 为了保证消息的高效传输会决定是同步发送还是异步发送。如果让客户端等待服务器的响应（通过调用 Future 中的 get() 方法），显然会增加延迟，如果客户端使用回调，就会解决这个问题。  
  如果 acks = all，这种情况下是只有当所有参与复制的节点都收到消息时，生产者才会接收到一个来自服务器的消息。不过，它的延迟比 acks =1 时更高，因为我们要等待不只一个服务器节点接收消息。

* `buffer.memory`  
  此参数用来设置生产者内存缓冲区的大小，生产者用它缓冲要发送到服务器的消息。一般使用默认值即可。

* `compression.type`  
  此参数来表示生产者启用何种压缩算法，默认情况下，消息发送时不会被压缩。该参数可以设置为 snappy、gzip 和 lz4。建议使用lz4效率更高。

* `retries`
  发送失败重试次数。

* `batch.size`   
  当有多个消息需要被发送到同一个分区时，生产者会把它们放在同一个批次里。该参数指定了一个批次可以使用的内存大小。当批次被填满，批次里的所有消息会被发送出去。避免了频繁发送消息带来的网络开销。默认是16384 bytes。建议根据自身消息大小做出调整。
  
* `max.block.ms`  
  此参数指定了在调用 send() 方法发送数据或使用 partitionFor() 方法获取元数据时生产者的阻塞时间。避免阻塞时间过长，默认60s。可以灵活调整。

#### 事务配置参数
* `transactional.id`  
  如果需要开启事务需要配置事务id，并配合事务api使用。

* `transaction.timeout.ms`  
  事务协调器等待producer更新事务状态的最大毫秒数, 超过的话事务协调器会终止进行中的事务. 如果设置的时间大于broker的max.transaction.timeout.ms会收到InvalidTransactionTimeout错误.

* `enable.idempotence`  
  设置为`true`, 将开启exactly-once模式，使用事务api必须设置为true。设置为`false`(默认值), producer会因为borker失败等原因重试发送, 可能会导致消息重复。

### 消费者关键配置
* `group.id`  
  消费者身份标识，如果多个消费者有相同标识，那么消费者将共同完成消息队列的消费，相当于队列模式。如果多个消费者有不同标识，那么每个消费者各自消费队列里的所有消息。相当于发布和订阅模式

* `bootstrap.servers`  
  一组host和port用于初始化连接，不管这里配置了多少台server, 都只用作发现整个集群全部server信息，这个配置不需要包含集群所有的机器信息，但是最好多于一个， 以防服务器挂掉。

* `key.deserializer`  
  用于 key 键的反序列化方法，实现了 `org.apache.kafka.common.serialization.Deserializer`

* `value.deserializer`  
  用于 value 值的反序列化方法，实现了 `org.apache.kafka.common.serialization.Deserializer`

* `max.poll.interval.ms`     
  两次poll数据的最大时间间隔，超过这个值协调器会判定这个结点失效。所以这个值需要大于消息处理的最大时间。

* `max.poll.records`    
  每次拉取数据的最大记录数，记录数维度控制拉取数据上限。根据消息大小进行调整。

* `fetch.max.bytes`  
  每次拉取数据的最大字节数，从字节数维度控制拉取数据上限。建议使用默认值即可。

* `isolation.level`  
  类似数据库的隔离级别。如果设置为`read_committed`，则仅返回已提交的事务性消息。 如果设置为`read_uncommitted`（默认），将返回所有的消息，甚至是已经中止的事务消息，脏数据。建议设置为`read_committed`。

* `auto.offset.reset`  
  指定分区没有被消费者消费过，这个消费者从哪里开始消费。建议使用 `earliest`

* `fetch.max.wait.ms`  
  指定取消息时最大等待毫秒数，如果没有数据要等待多少时间再返回。

* `enable.auto.commit`  
  指定是否自动提交，如果设置为`true`则拉取完数据后自动提交，标识消费完成。否则要手动调用commit方法标识消费完成。


## 主要命令（bin/）
说明：位于bin/目录下，列举常用命令，以shell脚本为例。
### kafka-server-start.sh
1. 启动kafka服务  
kafka-server-start.sh server.properties 

### kafka-topics.sh
1. 创建topic  
    kafka-topics.sh --create --bootstrap-server 10.168.0.221:9092 --topic hello-topic --partitions 3 --replication-factor 2
2. 查看topic列表  
    kafka-topics.sh --list --bootstrap-server 10.168.0.221:9092
3. 查看topic属性  
    kafka-topics.sh --describe --bootstrap-server 10.168.0.221:9092 --topic hello-topic
    ```
    Topic:hello-topic       PartitionCount:3        ReplicationFactor:2     Configs:flush.ms=3000,segment.bytes=1073741824,flush.messages=10000
            Topic: hello-topic      Partition: 0    Leader: 7       Replicas: 7,4   Isr: 7,4
            Topic: hello-topic      Partition: 1    Leader: 4       Replicas: 4,0   Isr: 4,0
            Topic: hello-topic      Partition: 2    Leader: 0       Replicas: 0,7   Isr: 0,7

     字段说明：            
     PartitionCount：partition 个数。
     ReplicationFactor：副本个数。
     Partition：partition 编号，从 0 开始递增。
     Leader：当前 partition 所在 broker.id。
     Replicas: 当前副本数据所在的 broker.id。
     Isr：当前 kafka 集群中可用的 broker.id。
    ```
4. 删除topic  
   kafka-topics.sh --delete --bootstrap-server 10.168.0.221:9092 --topic hello-topic

### kafka-consumer-groups.sh
1. 查看指定消费者  
kafka-consumer-groups.sh --bootstrap-server 10.168.0.221:9092 --describe --group test_group

2. 列出所有消费者  
   kafka-consumer-groups.sh --bootstrap-server 10.168.0.221:9092 --list

3. 取消消费者订阅  
kafka-consumer-groups.sh --bootstrap-server 10.168.0.221:9092 --group test_group --topic hello-topic --delete
4. 删除消费者  
   kafka-consumer-groups.sh --bootstrap-server localhost:9092 --group test_group --delete

## 设计建议
1. kafka集群需要启动3台及以上，并分布在不同的物理机器上。
2. 分区是kafka高效的保证，消费线程要小于等于分区数目，不存在两个消费者消费同一个分区的情况。分区也并非越多越好，消费者消费多个分区对于客户端服务端压力都很大，要灵活调整。
3. 备份是kafka安全保证，kafka分区会定时同步到不同的机器上，依照备份数目动态平均分配。备份数目多也会影响性能。
4. 使用事务处理更容易出现异常，效率更低。所以依照实际情况调整，是否由业务系统主动控制或者交给kafka操作。






