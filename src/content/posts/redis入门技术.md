---
title: Redis 入门技术
published: 2023-04-04
description: Redis 基础介绍、安装与入门使用。
tags:
  - Redis
category: 技术
draft: false
---

# redis 入门技术

Created by: cat
Created time: April 4, 2023 10:10 AM
Tags: redis

# redis

Created: April 3, 2023 12:08 AM Tags: redis Updated: April 3, 2023 12:25 AM

# Redis介绍

***Redis*** 是典型的 ***NoSQL*** 数据库。

***redis官网***：https://redis.io/download

> Redis 是一个开源的 key-value 存储系统。
> 
> 
> 它支持存储的 ***value*** 类型相对更多，包括 ***string、list、set、zset(sorted set)、hash***。
> 
> 这些数据类型都支持 ***push/pop、add/remove*** 及取交集并集和差集及更丰富的操作，而且这些操作都是原子性的。
> 
> 在此基础上，***Redis*** 支持各种不同方式的排序。
> 
> 为了保证效率，数据都是存储在内存中。
> 
> 区别的是 ***Redis*** 会周期性的把更新的数据写入磁盘或者把修改操作写入追加的记录文件。
> 
> 并且在此基础上实现了***master-slave*** （主从）同步。
> 
> 单线程 + ***IO*** 多路复用。
> 

# 安装和启动

切换到root用户

su -

### 1.安装依赖项

Install on Ubuntu/DebianYou can install recent stable versions of Redis from the official packages.redis.io APT repository. Add the repository to the apt index, update it, and then install:

通过su命令切换到root用户, 后续sudo就可以不加

```
apt -y install curl gpg lsb-release
```

### 2.添加商店凭据

下面两组指令, 一组带sudo, 一组不带sudo, 选一组命令敲下去就ok

> 注意, 下面的一组指令中有两条命令需要分别复制粘贴回车
> 

不带sudo(如果是ubuntu用户输入上面指令就可以)

> 获取redis安装的凭据, 使得我们的应用商城中包含redis
> 

```
curl -fsSL https://packages.redis.io/gpg |  gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main"|  tee /etc/apt/sources.list.d/redis.list
```

### 3.更新装

```
apt update
apt -y install redis
```

### 4.安装成功查看

如何证明安装成功

```
cd /etc/redis
ls
如果ls的结果中有一个文件叫redis.conf, 表示安装成功
```

### 5.关闭自动启动的redis

安装完成后 会以默认配置文件的方式启动 默认的方式不可用 所以需要先停止一下redis程序

有的同学安装完成redis之后, redis会自动的启动起来, 需要先关闭一下redis

linux中查看某个服务是否正在运行, ps -ef | grep redis, 如果有显示结果, 表示redis服务正在运行

如果敲完命令有结果, 结果如下,表明没有redis服务正在启动, 3718是这个redis的进程id

```
root@VM-24-6-ubuntu:/etc/redis# ps -ef | grep redis
root      3718   513  0 01:06 pts/1    00:00:00 grep --color=auto redis

```

**如果有redis相关的程序, 如何关闭, 使用kill -9 进程id**

**如果kill -9 命令没有关闭这个服务,后续发现这个服务仍然存在, 使用下面的命令关闭redis**

```
/etc/init.d/redis-server stop
```

> 后续的所有操作, 必须在root用户中执行, 不能通过sudo了
> 

使用su - 命令 输入root用户密码切换到root用户执行后续安装修改配置

vi /etc/redis/redis.conf

> 如果没有vim, 通过apt -y install vim
> 

port 后面的值改成 26379

requirepass itszt22

> 注意: 通过/语法找到requirepass 后, 发现是被注释的, 删除调 #号, 然后后接的你要给redis设置的密码, 密码设置一定要简单, 推荐用同一个密码, itszt21
> 

通过/命令查看bind, 然后将bind 这句话注释掉

找到了如下字样

```
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
bind 127.0.0.1 -::1
```

在bind单词之前, 添加一个#

随后保存并退出这个配置文件

启动redis服务之前的有没有redis服务 ps -ef | grep redis

启动redis服务

redis-server /etc/redis/redis.conf

输入命令连接redis

```
redis-cli -p 26379

显示如下内容,表示连接成功,也表明redis安装彻底安装成功
127.0.0.1:26379>

```

输入密码认证

```
auth itszt21

set name zhangsan

get name
```

使用exit命令退出出来

后续需要ps命令在查看一次

ps -ef | grep redis

> 腾讯云设置root用户密码: 在腾讯云服务器控制台 重置密码的位置 选择指定用户名 输入root 然后输入密码(建议和ubuntu用户一个密码) 然后强制重启
> 

**默认端口号：6379**

# NoSQL, 内存数据库

- 解决 ***CPU*** 及内存压力
    
    ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211021213413082.png)
    
    https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211021213413082.png
    
    https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211021213413082.png
    
- 解决 ***IO*** 压力
    
    ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211021213423883.png)
    
    https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211021213423883.png
    
    https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211021213423883.png
    

***NoSQL（ NoSQL = Not Only SQL ）***，意即不仅仅是 ***SQL***，泛指非关系型的数据库。

***NoSQL*** 不依赖业务逻辑方式存储，而以简单的 ***key-value*** 模式存储。因此大大的增加了数据库的扩展能力。

- 不遵循 ***SQL*** 标准。
- 不支持 ***ACID***。
- 远超于 ***SQL*** 的性能。

**适用于的场景**

- 对数据高并发的读写；
- 海量数据的读写；
- 对数据高可扩展性的。

**不适用的场景**

- 需要事务支持；
- 基于 ***sql*** 的结构化查询存储，处理复杂的关系，需要即席查询。

常见的 ***NoSQL*** 数据库

- Redis
- MongoDB

大数据时代常用的数据库类型

- 行式数据库
    
    ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211021215032857.png)
    
    https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211021215032857.png
    
    https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211021215032857.png
    
- 列式数据库
    
    ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211021215041246.png)
    
    https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211021215041246.png
    
    https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211021215041246.png
    

# 常用五大基本数据类型

## key操作

> keys *：查看当前库所有 key
> 
> 
> `exists key`：判断某个 ***key*** 是否存在
> 
> `type key`：查看你的 ***key*** 对应的value是什么类型
> 
> `del key` ：删除指定的 ***key*** 数据
> 
> `unlink key`：根据 ***value*** 选择非阻塞删除，仅将 ***keys*** 从 ***keyspace*** 元数据中删除，真正的删除会在后续异步操作, 非常不重要的语法
> 
> `expire key 10` ：为给定的 ***key*** 设置过期时间
> 
> `ttl key`：查看还有多少秒过期，-1表示永不过期，-2表示已过期
> 
> `select`：命令切换数据库
> 
> `dbsize`：查看当前数据库的 ***key*** 的数量
> 
> `flushdb`：清空当前库
> 
> `flushall`：通杀全部库
> 

## 字符串（String）

***String*** 类型是二进制安全的。意味着 ***Redis*** 的 ***string*** 可以包含任何数据。比如 ***jpg*** 图片或者序列化的对象。

***String*** 类型是 ***Redis*** 最基本的数据类型，一个 ***Redis*** 中字符串 ***value*** 最多可以是 512M。

> set ：添加键值对
> 
> 
> `get <key>`：查询对应键值
> 
> `setex <key><过期时间><value>`：设置键值的同时，设置过期时间，单位秒。
> 
> `incr <key>`：重要: 将 ***key*** 中储存的数字值增 1，只能对数字值操作，如果为空，新增值为 1（**具有原子性**）
> 
> `append <key><value>`：将给定的 追加到原值的末尾 了解
> 
> `strlen <key>`：获得值的长度
> 
> `setnx <key><value>`：只有在 ***key*** 不存在时，设置 ***key*** 的值
> 
> `decr <key>`：将 ***key*** 中储存的数字值减 1，只能对数字值操作，如果为空，新增值为 -1
> 
> `incrby/decrby <key><步长>`：将 ***key*** 中储存的数字值增减。自定义步长
> 
> `mset <key1><value1><key2><value2>` ：同时设置一个或多个 ***key-value*** 对
> 
> `mget <key1><key2><key3>...`：同时获取一个或多个 ***value***
> 
> `msetnx <key1><value1><key2><value2>...`：同时设置一个或多个 ***key-value*** 对，当且仅当所有给定 ***key*** 都不存在 了解
> 
> `getrange <key><起始位置><结束位置>`：截取获得String的子字符串
> 
> `setrange <key><起始位置><value>`：指定的字符串覆盖给定 key 所储存的字符串值，覆盖的位置从偏移量 offset 开始
> 
> `getset <key><value>`：以新换旧，设置了新值同时获得旧值。
> 

**原子性**

所谓 **原子** 操作是指不会被线程调度机制打断的操作；

这种操作一旦开始，就一直运行到结束，中间不会有任何 ***context switch*** （切换到另一个线程）。

- 在单线程中， 能够在单条指令中完成的操作都可以认为是“原子操作”，因为中断只能发生于指令之间。
- 在多线程中，不能被其它进程（线程）打断的操作就叫原子操作。

***Redis*** 单命令的原子性主要得益于 ***Redis*** 的大多数操作是单线程。

**数据结构**

内部结构实现上类似于 ***Java*** 的 ***ArrayList***，采用预分配冗余空间的方式来减少内存的频繁分配.

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211022000751746.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211022000751746.png

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211022000751746.png

## 列表（List）

***Redis*** 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。

它的底层实际是个双向链表，对两端的操作性能很高，通过索引下标的操作中间的节点性能会较差。

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211022121129201.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211022121129201.png

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211022121129201.png

> lpush/rpush ….： 从左边/右边插入一个或多个值。
> 
> 
> ```
> lpush k1 v1 v2 v3
> lrange k1 0 -1
> 输出：v3 v2 v1
> 
> rpush k1 v1 v2 v3
> lrange k1 0 -1
> 输出：v1 v2 v3
> ```
> 
> `lpop/rpop <key>`：从左边/右边吐出一个值。值在键在，值光键亡。
> 
> `rpoplpush <key1><key2>`：从 列表右边吐出一个值，插到 列表左边。
> 
> `lrange <key><start><stop>`：按照索引下标获得元素（从左到右）
> 
> `llen <key>`：获得列表长度
> 
> `lrange mylist 0 -1`：左边第一个，-1右边第一个，（0 -1表示获取所有）
> 
> `lindex <key><index>`：按照索引下标获得元素（从左到右）
> 
> `linsert <key> before/after <value><newvalue>`：在 的前面/后面插入 插入值
> 
> `lrem <key><n><value>`：从左边删除 ***n*** 个 ***value***（从左到右）
> 
> `lset<key><index><value>`：将列表 ***key*** 下标为 ***index*** 的值替换成 ***value***
> 

**数据结构**

***List*** 的数据结构为快速链表 ***quickList***。

首先在列表元素较少的情况下会使用一块连续的内存存储，这个结构是 ***ziplist***，也即是压缩列表。

它将所有的元素紧挨着一起存储，分配的是一块连续的内存。

当数据量比较多的时候才会改成 ***quicklist***。

因为普通的链表需要的附加指针空间太大，会比较浪费空间。比如这个列表里存的只是 ***int*** 类型的数据，结构上还需要两个额外的指针 ***prev*** 和 ***next***。

***Redis*** 将链表和 ***ziplist*** 结合起来组成了 ***quicklist***。也就是将多个 ***ziplist*** 使用双向指针串起来使用。这样既满足了快速的插入删除性能，又不会出现太大的空间冗余。

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211022122514593.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211022122514593.png

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/image-20211022122514593.png

## Set（集合）

***Set*** 对外提供的功能与 ***List*** 类似列表的功能，特殊之处在于 ***Set*** 是可以 **自动排重** 的，当需要存储一个列表数据，又不希望出现重复数据时，***Set*** 是一个很好的选择，并且 ***Set*** 提供了判断某个成员是否在一个 ***Set*** 集合内的重要接口，这个也是 ***List*** 所不能提供的。

***Redis*** 的 ***Set*** 是 ***String*** 类型的无序集合。它底层其实是一个 ***value*** 为 ***null*** 的 ***hash*** 表，所以添加，删除，查找的复杂度都是 ***O(1)***。

一个算法，随着数据的增加，执行时间的长短，如果是 ***O(1)***，数据增加，查找数据的时间不变。

> sadd …..：将一个或多个 member 元素加入到集合 key 中，已经存在的 member 元素将被忽略
> 
> 
> `smembers <key>`：取出该集合的所有值。
> 
> `sismember <key><value>`：判断集合 是否为含有该 值，有返回 1，没有返回 0
> 
> `scard<key>`：返回该集合的元素个数。
> 
> `srem <key><value1><value2> ....`：删除集合中的某个元素
> 
> `spop <key>`：了解, 随机从该集合中吐出一个值
> 
> `srandmember <key><n>`：随机从该集合中取出 ***n*** 个值，不会从集合中删除
> 
> `smove <source><destination>value`：把集合中一个值从一个集合移动到另一个集合
> 
> `sinter <key1><key2>`：返回两个集合的交集元素
> 
> `sunion <key1><key2>`：返回两个集合的并集元素
> 
> `sdiff <key1><key2>`：返回两个集合的差集元素（***key1*** 中的，不包含 ***key2*** 中的）
> 

**数据结构**

***Set*** 数据结构是字典，字典是用哈希表实现的。

## Hash（哈希）

***Redis hash*** 是一个键值对集合。

***Redis hash*** 是一个 ***String*** 类型的 ***field*** 和 ***value*** 的映射表，***hash*** 特别适合用于存储对象。

> hset ：给 集合中的 键赋值
> 
> 
> `hget <key1><field>`：从 集合 取出 ***value***
> 
> `hmset <key1><field1><value1><field2><value2>...`： 批量设置 ***hash*** 的值
> 
> `hmget` …
> 
> `hexists <key1><field>`：查看哈希表 ***key*** 中，给定域 ***field*** 是否存在
> 
> `hkeys <key>`：列出该 ***hash*** 集合的所有 ***field***
> 
> `hvals <key>`：列出该 ***hash*** 集合的所有 ***value***
> 
> `hincrby <key><field><increment>`：为哈希表 ***key*** 中的域 ***field*** 的值加上增量 1 -1
> 
> `hsetnx <key><field><value>`：将哈希表 ***key*** 中的域 ***field*** 的值设置为 ***value*** ，当且仅当域 ***field*** 不存在
> 

**数据结构**

***Hash*** 类型对应的数据结构是两种：***ziplist***（压缩列表），***hashtable***（哈希表）。

当 ***field-value*** 长度较短且个数较少时，使用 ***ziplist***，否则使用 ***hashtable***。

> hash表结构, 会在java集合源码, hashmap的源码分析的时候说明
> 

## Zset（有序集合 sorted set）

***Redis*** 有序集合 ***zset*** 与普通集合 ***set*** 非常相似，是一个没有重复元素的字符串集合。

不同之处是有序集合的每个成员都关联了一个评分（***score***）,这个评分（***score***）被用来按照从最低分到最高分的方式排序集合中的成员。集合的成员是唯一的，但是评分可以是重复的。

因为元素是有序的，所以可以很快的根据评分（***score***）或者次序（***position***）来获取一个范围的元素。

访问有序集合的中间元素也是非常快的，因此能够使用有序集合作为一个没有重复成员的智能列表。

> zadd …：将一个或多个 member 元素及其 score 值加入到有序集 key 当中
> 
> 
> `zrange <key><start><stop> [WITHSCORES]`：返回有序集 ***key*** 中，下标在 之间的元素
> 
> 当带 ***WITHSCORES***，可以让分数一起和值返回到结果集
> 
> `zrangebyscore key min max [withscores] [limit offset count]`：返回有序集 ***key*** 中，所有 ***score*** 值介于 ***min*** 和 ***max*** 之间（包括等于 ***min*** 或 ***max*** ）的成员。有序集成员按 ***score*** 值递增（从小到大）次序排列。
> 
> `zrevrangebyscore key max min [withscores] [limit offset count]`：同上，改为从大到小排列
> 
> `zincrby <key><increment><value>`：为元素的 ***score*** 加上增量
> 
> `zrem <key><value>`：删除该集合下，指定值的元素
> 
> `zcount <key><min><max>`：统计该集合，分数区间内的元素个数
> 
> `zrank <key><value>`：返回该值在集合中的排名，从 0 开始。
> 

**数据结构**

***SortedSet（zset）***是 ***Redis*** 提供的一个非常特别的数据结构，一方面它等价于 ***Java*** 的数据结构 ***Map<String, Double>***，可以给每一个元素 ***value*** 赋予一个权重 ***score***，另一方面它又类似于 ***TreeSet***，内部的元素会按照权重 ***score*** 进行排序，可以得到每个元素的名次，还可以通过 ***score*** 的范围来获取元素的列表。

***zset*** 底层使用了两个数据结构

- ***hash***，***hash*** 的作用就是关联元素 ***value*** 和权重 ***score***，保障元素 ***value*** 的唯一性，可以通过元素 ***value*** 找到相应的 ***score*** 值
- 跳跃表，跳跃表的目的在于给元素 ***value*** 排序，根据 ***score*** 的范围获取元素列表

# Jedis操作Redis

即 ***Java*** 操作 ***Redis***。

## 依赖

```xml
                <dependency>            <groupId>redis.clients</groupId>            <artifactId>jedis</artifactId>            <version>3.8.0</version>        </dependency>
```

## 连接 ***Redis***

```java
public class JedisDemo {  public static void main(String[] args) {    Jedis jedis = new Jedis("81.70.199.213", 16379);      jedis.auth("your password");    String pong = jedis.ping();    System.out.println("连接成功：" + pong);  }}
```

## java操作redis

> Key
> 
> 
> ```java
> jedis.set("k1", "v1");jedis.set("k2", "v2");jedis.set("k3", "v3");Set<String> keys = jedis.keys("*");System.out.println(keys.size());for (String key : keys) {System.out.println(key);}System.out.println(jedis.exists("k1"));System.out.println(jedis.ttl("k1"));System.out.println(jedis.get("k1"));
> ```
> 
> ***String***
> 
> ```java
> jedis.mset("str1","v1","str2","v2","str3","v3");System.out.println(jedis.mget("str1","str2","str3"));
> ```
> 
> ***List***
> 
> ```java
> List<String> list = jedis.lrange("mylist",0,-1);for (String element : list) {System.out.println(element);}
> ```
> 
> ***Set***
> 
> ```java
> jedis.sadd("orders", "order01");jedis.sadd("orders", "order02");jedis.sadd("orders", "order03");jedis.sadd("orders", "order04");Set<String> smembers = jedis.smembers("orders");for (String order : smembers) {System.out.println(order);}jedis.srem("orders", "order02");
> ```
> 
> ***Hash***
> 
> ```java
> jedis.hset("hash1","userName","lisi");System.out.println(jedis.hget("hash1","userName"));Map<String,String> map = new HashMap<String,String>();map.put("telphone","13810169999");map.put("address","atguigu");map.put("email","abc@163.com");jedis.hmset("hash2",map);List<String> result = jedis.hmget("hash2", "telphone","email");for (String element : result) {System.out.println(element);}
> ```
> 
> ***zset(后期重点内容)***
> 
> ```java
> jedis.zadd("zset01", 100d, "z3");jedis.zadd("zset01", 90d, "l4");jedis.zadd("zset01", 80d, "w5");jedis.zadd("zset01", 70d, "z6");Set<String> zrange = jedis.zrange("zset01", 0, -1);for (String e : zrange) {System.out.println(e);}
> ```
> 

## 集群的 *Jedis* 开发(集群篇学习后练习)

即使连接的不是主机，集群会自动切换主机存储。主机写，从机读。

无中心化主从集群。无论从哪台主机写的数据，其他主机上都能读到数据。

```java
/**     * 集群的方式连接  传入多个hostAndPort     */    @Test    public void test1(){        Set<HostAndPort> set =new HashSet<HostAndPort>();        set.add(new HostAndPort("101.43.241.199",26383)); // 任何一个端口        set.add(new HostAndPort("101.43.241.199",26384)); // 任何一个端口        set.add(new HostAndPort("101.43.241.199",26385)); // 任何一个端口        set.add(new HostAndPort("101.43.241.199",26386)); // 任何一个端口        set.add(new HostAndPort("101.43.241.199",26387)); // 任何一个端口        set.add(new HostAndPort("101.43.241.199",26388)); // 任何一个端口        //这个要写多个        JedisCluster jedisCluster = new JedisCluster(set, 20000, 20000, 3, "itszt22", new GenericObjectPoolConfig<>());        jedisCluster.set("k1", "v1");        System.out.println(jedisCluster.get("k1"));    }
```

# Spring整合Redis

## 1. 依赖

Spring Data Redis 2.x binaries require JDK level 8.0 and above and [Spring Framework](https://spring.io/projects/spring-framework/) 5.3.21 and above.

```
                <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.3.25</version>
        </dependency>

        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
            <version>3.8.0</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.data</groupId>
            <artifactId>spring-data-redis</artifactId>
            <version>2.7.10</version>
        </dependency>

                <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.3.25</version>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
```

如果依赖关系不正确 通常会报错 class not found Exception

创建ioc配置文件, 加入如下内容

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
       http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- Redis -->
    <bean id="pool" class="redis.clients.jedis.JedisPoolConfig">
        <!--最大能够保持idle的数量，控制一个pool最多有多少个状态为idle的jedis实例，默认值8-->
        <property name="maxIdle" value="1000"/>
        <!--在指定时刻通过pool能够获取到的最大的连接的jedis个数，默认值8-->
        <property name="maxTotal" value="10000"/>
    </bean>
    <!--注入配置 JedisConnectionFactory 和 StringRedisTemplate -->
    <bean id="jedisConnFactory" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">
        <property name="hostName" value="81.70.199.213"/>
        <property name="port" value="26379"/>
        <property name="database" value="0"/>
        <property name="password" value="itszt22"/>
        <property name="timeout" value="20000"/>
        <constructor-arg name="poolConfig" ref="pool"/>
    </bean>

    <bean id="stringRedisTemplate" class="org.springframework.data.redis.core.StringRedisTemplate">
        <constructor-arg name="connectionFactory" ref="jedisConnFactory"/>
        <property name="keySerializer" ref="stringRedisSerializer"/>
        <property name="valueSerializer" ref="jdkSerializer"/>
    </bean>

    <bean id="jdkSerializer" class="org.springframework.data.redis.serializer.JdkSerializationRedisSerializer"/>

    <bean id="stringRedisSerializer"
          class="org.springframework.data.redis.serializer.StringRedisSerializer" />

</beans>

```

集群配置

```xml
<?xml version="1.0" encoding="UTF-8"?><beans xmlns="http://www.springframework.org/schema/beans"       xmlns:context="http://www.springframework.org/schema/context"       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"       xsi:schemaLocation="       http://www.springframework.org/schema/context        https://www.springframework.org/schema/context/spring-context.xsd       http://www.springframework.org/schema/beans        https://www.springframework.org/schema/beans/spring-beans.xsd">    <!-- Redis --><!--    集群配置-->    <bean id="redisClusterConfiguration" class="org.springframework.data.redis.connection.RedisClusterConfiguration">        <property name="maxRedirects" value="3"/>        <!--        <property name="clusterTimeOut"  value="10000" />-->        <property name="clusterNodes">            <set>                <bean class="org.springframework.data.redis.connection.RedisClusterNode">                    <constructor-arg name="host" value="101.43.241.199"/>                    <constructor-arg name="port" value="26388"/>                </bean>                <bean class="org.springframework.data.redis.connection.RedisClusterNode">                    <constructor-arg name="host" value="101.43.241.199"/>                    <constructor-arg name="port" value="26383"/>                </bean>                <bean class="org.springframework.data.redis.connection.RedisClusterNode">                    <constructor-arg name="host" value="101.43.241.199"/>                    <constructor-arg name="port" value="26384"/>                </bean>                <bean class="org.springframework.data.redis.connection.RedisClusterNode">                    <constructor-arg name="host" value="101.43.241.199"/>                    <constructor-arg name="port" value="26385"/>                </bean>                <bean class="org.springframework.data.redis.connection.RedisClusterNode">                    <constructor-arg name="host" value="101.43.241.199"/>                    <constructor-arg name="port" value="26386"/>                </bean>                <bean class="org.springframework.data.redis.connection.RedisClusterNode">                    <constructor-arg name="host" value="101.43.241.199"/>                    <constructor-arg name="port" value="26387"/>                </bean>            </set>        </property>    </bean>    <bean id="pool" class="redis.clients.jedis.JedisPoolConfig">        <!--最大能够保持idle的数量，控制一个pool最多有多少个状态为idle的jedis实例，默认值8-->        <property name="maxIdle" value="1000"/>        <!--在指定时刻通过pool能够获取到的最大的连接的jedis个数，默认值8-->        <property name="maxTotal" value="10000"/>    </bean>    <!--注入配置 JedisConnectionFactory 和 StringRedisTemplate -->    <bean id="jedisConnFactory" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">        <property name="database" value="0"/>        <property name="password" value="itszt22"/>        <property name="timeout" value="20000"/><!--        集群配置 -->        <constructor-arg name="clusterConfig" ref="redisClusterConfiguration"/>        <constructor-arg name="poolConfig" ref="pool"/>    </bean><!--    正是由这个对象 帮我们完成 redis的相关java操作-->    <bean id="stringRedisTemplate" class="org.springframework.data.redis.core.StringRedisTemplate">        <constructor-arg name="connectionFactory" ref="jedisConnFactory"/>        <property name="keySerializer" ref="stringRedisSerializer"/>        <property name="valueSerializer" ref="jdkSerializer"/>    </bean>    <bean id="jdkSerializer" class="org.springframework.data.redis.serializer.JdkSerializationRedisSerializer"/>    <bean id="stringRedisSerializer"          class="org.springframework.data.redis.serializer.StringRedisSerializer" /></beans>
```

## 2.测试代码

```xml
import org.junit.Test;import org.junit.runner.RunWith;import org.springframework.data.redis.core.RedisTemplate;import org.springframework.data.redis.core.ValueOperations;import org.springframework.test.context.ContextConfiguration;import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;import javax.annotation.Resource;import java.util.ArrayList;import java.util.List;@RunWith(SpringJUnit4ClassRunner.class)@ContextConfiguration("classpath:spring-ioc.xml")public class RedisTest {    @Resource    private RedisTemplate redisTemplate;    @Test    public void test1(){        ValueOperations valueOperations = redisTemplate.opsForValue();        valueOperations.set("k1", "v1");        Object k1 = valueOperations.get("k1");        System.out.println("k1 = " + k1);        User user = new User();        user.setName("张三");        valueOperations.set("user", user);        Object user1 = valueOperations.get("user");        System.out.println("user1 = " + user1);        List<User> users = new ArrayList<>();        users.add(user);        valueOperations.set("userList", users);        Object userList = valueOperations.get("userList");        System.out.println("userList = " + userList);    }}
```

# Redis的发布与订阅(了解)

***Redis*** 发布订阅（ ***pub/sub*** ）是一种消息通信模式：发送者（ ***pub*** ）发送消息，订阅者（ ***sub*** ）接收消息。

***Redis*** 客户端可以订阅任意数量的频道。

1. 客户端可以订阅频道

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/%E6%88%AA%E5%B1%8F2021-10-22%2014.18.02.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/%E6%88%AA%E5%B1%8F2021-10-22%2014.18.02.png

1. 当给这个频道发布消息后，消息就会发送给订阅的客户端

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/%E6%88%AA%E5%B1%8F2021-10-22%2014.21.40.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/%E6%88%AA%E5%B1%8F2021-10-22%2014.21.40.png

> subscribe 频道名称 # 订阅频道
> 

subscribe itszt22

publish 频道名称 hello # 频道发送信息 >

# 配置文件

***redis.conf***

## ***INCLUDE***

> 包含，多实例的情况可以把公用的配置文件提取出来。
> 

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022352785.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022352785.png

## ***NETWORK***

> 网络相关配置。
> 
> 
> ***bind***
> 
> 默认情况 `bind 127.0.0.1` 只能接受本机的访问请求。
> 
> 后续明天还需要, 再腾讯云服务器防火墙加入26379端口的暴露
> 
> 生产环境肯定要写你应用服务器的地址，服务器是需要远程访问的，*所以需要将其注释掉*。
> 
> 如果开启了***protected-mode***，那么在没有设定 ***bind ip*** 且没有设密码的情况下，***Redis*** 只允许接受本机的响应。
> 
> 注意: 从安全角度来说, 要么你开启只允许本机访问, 可以不设置密码
> 
> 要么, 允许所有人访问, 但是要设置密码
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022352259.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022352259.png
> 

redis本身无法限制【只有指定主机】连接到redis中，就像我上面说的一样，bind指定只是用来设置redis对外开放的地址。

如果我有好朋友张三，一个仇人李四。我只想让张三访问，不让李四访问怎么办？除了设置防火墙怎么办？可以简单粗暴，设置密码，告诉张三，这样李四不知道密码就无法访问了。

如果搭建一个新环境，不想让外部网络访问，只让本地访问，那么可以设置protected-mode yes，当然也是默认值。

```
redis3.2版本后新增protected-mode配置
```

protected-mode是redis本身的一个安全层，这个安全层的作用：就是只有【本机】可以访问redis，其他任何都不可以访问redis。这个安全层开启必须满足三个条件，不然安全层处于关闭状态：

（1）protected-mode yes（处于开启）

（2）没有bind指令。原文：The server is not binding explicitly to a set of addresses using the “bind” directive.

（3）没有设置密码。原文：No password is configured。密码的优先级高。

这时redis的保护机制就会开启。开启之后，只有本机才可以访问redis。 如果上面三个条件任何一个不满足，就不会开启保护机制。

> port
> 
> 
> 端口号，默认 ***6379***。
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022353848.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022353848.png
> 

## ***GENERAL***

> 通用。
> 
> 
> ***daemonize 了解***
> 
> 是否为后台进程，设置为 ***yes***。
> 
> 守护进程，后台启动。
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022354448.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022354448.png
> 
> ***pidfile 了解***
> 
> 存放 ***pid*** 文件的位置，每个实例会产生一个不同的 ***pid*** 文件。
> 
> 注意: 如果这个文件夹不存在, 需要自己手动的创建一下文件夹
> 
> 注意: 全程使用root用户
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022355254.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022355254.png
> 
> ***loglevel***
> 
> 指定日志记录级别，***Redis*** 总共支持四个级别：***debug、verbose、notice、warning***，默认为 ***notice***。
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022355966.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022355966.png
> 
> ***logfile***
> 
> 日志文件名称。
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022356809.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022356809.png
> 
> ***database***
> 
> 设定库的数量 默认16，默认数据库为 0，可以使用 `SELECT <dbid>` 命令在连接上指定数据库 ***id***。
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022357447.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022357447.png
> 

## ***LIMITS***

> 限制。
> 
> 
> ***maxclients***
> 
> 设置 ***redis*** 同时可以与多少个客户端进行连接。
> 
> 默认情况下为 ***10000*** 个客户端。
> 
> 如果达到了此限制，***redis*** 则会拒绝新的连接请求，并且向这些连接请求方发出 ***max number of clients reached*** 以作回应。
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022357398.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022357398.png
> 
> ***maxmemory (重要配置)***
> 
> 建议**必须设置**，否则，将内存占满。(默认触发linux的oom killer机制, linux会选择一个当前系统中占用内存最高的服务, 强行杀死这个服务)
> 
> 设置 ***redis*** 可以使用的内存量。一旦到达内存使用上限，***redis*** 将会试图移除内部数据，移除规则可以通过 ***maxmemory-policy*** 来指定。
> 
> 如果 ***redis*** 无法根据移除规则来移除内存中的数据，或者设置了不允许移除，那么 ***redis*** 则会针对那些需要申请内存的指令返回错误信息，比如 ***SET、LPUSH*** 等。
> 
> 但是对于无内存申请的指令，仍然会正常响应，比如 ***GET*** 等。如果你的 ***redis*** 是主 ***redis***（ 说明你的 ***redis*** 有从 ***redis*** ），那么在设置内存使用上限时，需要在系统中留出一些内存空间给同步队列缓存，只有在你设置的是“不移除”的情况下，才不用考虑这个因素。
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022358253.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022358253.png
> 
> ***maxmemory-policy less rencent use***
> 
> ***volatile-lru***：使用 ***LRU*** 算法移除 ***key***，只对设置了过期时间的键（最近最少使用）。
> 
> ***allkeys-lru***：在所有集合 ***key*** 中，使用 ***LRU*** 算法移除 ***key***。
> 
> ***volatile-random***：在过期集合中移除随机的 ***key***，只对设置了过期时间的键。
> 
> ***allkeys-random***：在所有集合 ***key*** 中，移除随机的 ***key***。
> 

> volatile-ttl：移除那些 TTL 值最小的 key，即那些最近要过期的 key。
> 
> 
> ***noeviction***：默认策略, 不进行移除。针对写操作，只是返回错误信息。
> 
> redis中存储的数据: 都是可以被删除的,删除了redis中的数据后, 对主业务系统没有太大的影响
> 
> **面试题: 你在你的项目中, 如何保障redis和mysql的数据 一致性??**
> 
> 被动同步(被动更新) 主动更新(set值得时候时间设置为永久, 在权限修改那块顺带要 删除掉旧的redis中得权限数据)
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022358634.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022358634.png
> 

# 主从复制(了解)

主机数据更新后根据配置和策略， 自动同步到备机的 ***master/slaver*** 机制，***Master*** 以写为主，***Slaver*** 以读为主。

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022359595.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022359595.png

1. 读写分离，性能扩展
2. 容灾快速恢复
3. 一主多从！

## 搭建一主两从

> 注意: 确保之前的redis服务都是关闭了的
> 
> 1. 创建文件目录

```
/opt/etc
```

1. 将 ***redis.conf*** 复制到/opt/etc下面

```
cp /etc/redis/redis.conf /opt/etc/
编辑redis.conf文件 密码设置为itszt21
```

1. /opt/etc目录下创建 3 个 ***redis.conf*** 配置文件

> 注意: 在/opt/etc/redis.conf目录中 将appendonlay 从yes改成no
> 

```
touch redis26379.conf
touch redis26380.conf
touch redis26381.conf
```

```bash
# redis26379.confinclude /opt/etc/redis.confpidfile /var/run/redis_26379.pidport 26379dbfilename dump26379.rdbmasterauth itszt21#replicaof ip 26379=====================================分割线# redis26380.confinclude /opt/etc/redis.confpidfile /var/run/redis_26380.pidport 26380dbfilename dump26380.rdbmasterauth itszt21=====================================分割线# redis26381.confinclude /opt/etc/redis.confpidfile /var/run/redis_26381.pidport 26381dbfilename dump26381.rdbmasterauth itszt21
```

1. 启动 3 台 ***redis*** 服务器

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022359443.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304022359443.png

1. 查看主机运行情况

```
redis-cli -p 26379 -a itszt21
info replication
```

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030000258.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030000258.png

1. 配从不配主

> 记得暴露相应端口号
> 

```bash
slaveof  <ip><port>redis-cli -p 26380 -a itszt21slaveof 127.0.0.1 26379exitredis-cli -p 26381 -a itszt21slaveof 127.0.0.1 26379exit# 成为某个实例的从服务器
```

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030000201.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030000201.png

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030001719.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030001719.png

1. 再次查看主机运行情况

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030001250.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030001250.png

成功搭建。

## 一主二仆

> 主机 6379，从机 6380 和 6381。
> 
> 1. 假设从机 ***6380*** 挂掉。 连接到然后shutdown
> 
> ```
> 当6380重启后，6380不再是6379的从机，而是作为新的master；
> 当再次把6380作为6379的从机加入后，从机会把数据从头到尾复制。
> ```
> 
> 1. 假设主机 ***6379*** 挂掉。
> 
> ```
> 6380和6381仍然是6379的从机，不会做任何事；
> 当6379重启后，既然是主服务器。
> ```
> 

当一个 ***master*** 宕机后，后面的 ***slave*** 可以立刻升为 ***master***，其后面的 ***slave*** 需要重新slave of这个master

```
slaveof no one

...
...
```

### 复制延时

由于所有的写操作都是先在 ***master*** 上操作，然后同步更新到 ***slave*** 上，所以从 ***master*** 同步到 ***slave*** 从机有一定的延迟，当系统很繁忙的时候，延迟问题会更加严重，***slave*** 机器数量的增加也会使这个问题更加严重。

## 复制原理

- ***slave*** 启动成功连接到 ***master*** 后会发送一个 ***sync*** 命令（同步命令）。
- ***master*** 接到命令启动后台的存盘进程，对数据进行持久化操作，同时收集所有接收到的用于修改数据集命令，在后台进程执行完毕之后，***master*** 将传送整个数据文件（***rdb***）到 ***slave***，以完成一次完全同步。
- 当主服务进行写操作后，和从服务器进行数据同步。
- 全量复制：而 ***slave*** 服务在接收到数据库文件数据后，将其存盘并加载到内存中。
- 增量复制：***master*** 继续将新的所有收集到的修改命令依次传给 ***slave***，完成同步。
- 只要是重新连接 ***master***，一次完全同步（全量复制）将被自动执行。

# redis中主从、哨兵和集群这三个有什么区别(面试)

[redis中主从、哨兵和集群这三个有什么区别 ？ - 知乎](https://www.zhihu.com/question/293357668/answer/2485282875)

# 集群

容量不够，***redis*** 如何进行扩容？

并发写操作， ***redis*** 如何分摊？

主从模式，薪火相传模式，主机宕机，导致 ***ip*** 地址发生变化，应用程序中配置需要修改对应的主机地址、端口等信息。

解决方法：

- 代理主机（ ***之前*** ）
    
    ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030002658.png)
    
    https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030002658.png
    
- 无中心化集群配置（ ***redis3.0*** ）

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030004607.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030004607.png

***Redis*** 集群实现了对 ***Redis*** 的水平扩容，即启动 ***N*** 个 ***Redis*** 节点，将整个数据库分布存储在这 ***N*** 个节点中，每个节点存储总数据的 ***1/N*** 。

***Redis*** 集群通过分区（***partition***）来提供一定程度的可用性（***availability***），即使集群中有一部分节点失效或者无法进行通讯， 集群也可以继续处理命令请求。

## 搭建 *Redis* 集群

> 注意: 之前开启的redis服务记得都关闭了 注意: 在root用户下执行
> 

在/etc/redis/目录下创建cluster文件夹, 在cluster文件夹

1. 创建6份配置文件, 端口分别从83, 84 , 85 , 86 ,87, 88

注意: 之前如果/etc/redis/redis.conf配置过 include redis-port.conf, 注释掉

注意 : 主配置文件密码需要也修改对应的密码

```bash
# 以redis26383.conf为例include /etc/redis/redis.confpidfile /var/run/redis_26383.pid# 更改port 26383# 更改dbfilename dump26383.rdb# 更改masterauth itszt22cluster-enabled yes# 打开集群模式cluster-config-file nodes-26383.conf# 设置节点配置文件名称，需要更改cluster-node-timeout 15000# 设置节点失联事件，超过该时间（ms），集群自动进行主从切换
```

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030005676.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030005676.png

> 注意: 如果cv过程有乱码问题, 在/etc/bash.bashrc里面末尾写入，export LC_ALL=“C.UTF-8” 然后source /etc/bash.bashrc。
> 
> 1. 启动 要敲6次启动命令
> 2. 注意: 每个服务启动后, 必须使用ps -ef | grep redis命令, 查看 redis-server *:26383 [cluster]

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030006101.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030006101.png

> 注意: 有的时候会有一两个服务是比如84, 82 可能是挂掉没有启动的 基本上都是配置修改的漏了
> 
> 1. 先确认挂掉的服务, 配置是否正确 ************
> 2. 确定挂掉的服务的端口号没有被其他系统服务占用 比如26382没有启动, 使用命令 lsof -i:26382
> 3. 如果确认端口号被占用了 换一个端口号
> 4. 将 6 个节点合成一个集群

```bash
# 组合之前请确保所有redis实例启动后，nodes-xxxx.conf文件都生成正常。
```

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030006414.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030006414.png

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030006414.png

```bash
redis集群不仅需要开通redis客户端连接的端口，而且需要开通集群总线端口防火墙至少开放12个端口集群总线端口为redis客户端连接的端口 + 10000如redis端口为6379则集群总线端口为16379故，所有服务器的点需要开通redis的客户端连接端口和集群总线端口# 注意公网ip地址换成你自己的# 执行 加密的话 -a 密码 至少需要六个节点 不然会报错redis-cli -a itszt22 --cluster create --cluster-replicas 1 81.70.199.213:26383 81.70.199.213:26384 81.70.199.213:26385 81.70.199.213:26386 81.70.199.213:26387 81.70.199.213:26388redis-cli -a itszt22 --cluster create --cluster-replicas 1 127.0.0.1:26383 127.0.0.1:26384 127.0.0.1:26385 127.0.0.1:26386 127.0.0.1:26387 127.0.0.1:26388
```

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030006728.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030006728.png

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030006728.png

1. 采用集群策略连接

**注意: 一定要使用集群策略链接, redis-cli -c连接, 旧的方式连接后输入命令会报错**

```bash
redis-cli -c -p 26383cluster nodes # 命令查看集群信息
```

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030006000.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030006000.png

## 问题

### *redis cluster* 如何分配这六个节点?

> 一个集群至少要有三个主节点。
> 
> 
> 选项 `--cluster-replicas 1`，表示希望为集群中的每个主节点创建一个从节点。
> 
> 分配原则尽量保证每个主数据库运行在不同的 ***IP*** 地址，每个从库和主库不在一个 ***IP*** 地址上。
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030006892.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030006892.png
> 

### 什么是 *slots*？

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007285.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007285.png

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007883.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007883.png

> 一个 Redis 集群包含 16384 个插槽（hash slot）， 数据库中的每个键都属于这 16384 个插槽的其中一个。
> 
> 
> 集群使用公式 ***CRC16(key) % 16384*** 来计算键 ***key*** 属于哪个槽， 其中 ***CRC16(key)*** 语句用于计算键 ***key*** 的 ***CRC16*** 校验和 。
> 
> 集群中的每个节点负责处理一部分插槽。 例如， 如果一个集群可以有主节点， 其中：
> 
> - 节点 ***A*** 负责处理 ***0*** 号至 ***5460*** 号插槽。
> - 节点 ***B*** 负责处理 ***5461*** 号至 ***10922*** 号插槽。
> - 节点 ***C*** 负责处理 ***10923*** 号至 ***16383*** 号插槽。

### 如何在集群中录入值？

> 在 redis-cli 每次录入、查询键值，redis 都会计算出该 key 应该送往的插槽，如果不是该客户端对应服务器的插槽，redis 会报错，并告知应前往的 redis 实例地址和端口。
> 
> 
> ***redis-cli*** 客户端提供了 ***–c*** 参数实现自动重定向。
> 
> 例如 ***redis-cli -c –p 6379*** 登入后，再录入、查询键值对可以自动重定向。
> 

### 如何查询集群中的值？

> 每个主机只能查询自己范围内部的插槽。
> 
> 
> `cluster keyslot <key>`：查询某个 ***key*** 的 ***slot*** 。
> 
> `cluster countkeysinslot <slot>`：查询某个 ***slot*** 是否有值。
> 

### 故障恢复？

> 如果主节点下线？从节点能否自动升为主节点？注意：15 秒超时。
> 
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007329.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007329.png
> 
> - 当 ***6379*** 挂掉后，***6389*** 成为新的主机。
> 
> 主节点恢复后，主从关系会如何？主节点回来变成从机。
> 
> - 当 ***6379*** 重启后，***6379*** 成为 ***6389*** 的从机。

## 优点

- 实现扩容；
- 分摊压力；
- 无中心配置相对简单。

## 缺点

- 多键操作是不被支持的；
- 多键的 ***Redis*** 事务是不被支持的。***lua*** 脚本不被支持；
- 由于集群方案出现较晚，很多公司已经采用了其他的集群方案，而代理或者客户端分片的方案想要迁移至***redis cluster***，需要整体迁移而不是逐步过渡，复杂度较大。

## 如果失败需要,重启

1. 关闭所有已启动的redis节点

使用kill命令杀掉相应进程即可

2.删除集群相关文件

删除每个节点下的dump.rdb和nodes.conf文件

3.启动所有Redis节点

启动命令：redis-server redis.conf

4.重新启动集群

Redis5.0以后的版本用redis-cli命令：

redis-cli -a itszt21 –cluster create –cluster-replicas 1 81.70.199.213:26382 81.70.199.213:26383 81.70.199.213:26384 81.70.199.213:26385 81.70.199.213:26386 81.70.199.213:26387

# 持久化(面试)

## RDB

在指定的时间间隔内将内存中的数据集快照写入磁盘， 即 ***Snapshot*** 快照，恢复时是将快照文件直接读到内存里。

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007858.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007858.png

***Redis*** 会单独创建一个子进程（***fork***）来进行持久化。

先将数据写入到一个临时文件中，待持久化过程完成后，再将这个临时文件内容覆盖到 ***dump.rdb***。

整个过程中，主进程是不进行任何 ***IO*** 操作的，这就确保了极高的性能。如果需要进行大规模数据的恢复，且对于数据恢复的完整性不是非常敏感，那 ***RDB*** 方式要比 ***AOF*** 方式更加的高效。

***RDB* 的缺点是最后一次持久化后的数据可能丢失**。

### Fork

- 作用是复制一个与当前进程一样的进程。新进程的所有数据（变量、环境变量、程序计数器等） 数值都和原进程一致，但是是一个全新的进程，并作为原进程的子进程
- 在 ***Linux*** 程序中，***fork()*** 会产生一个和父进程完全相同的子进程，但子进程在此后多会 ***exec*** 系统调用，出于效率考虑，***Linux*** 中引入了 **写时复制技术**
- **一般情况父进程和子进程会共用同一段物理内存**，只有进程空间的各段的内容要发生变化时，才会将父进程的内容复制一份给子进程

### 配置

> dump 文件名字
> 
> 
> 在 ***redis.conf*** 中配置文件名称，默认为 ***dump.rdb***。
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007929.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007929.png
> 
> ***dump* 保存位置**
> 
> ***rdb*** 文件的保存路径可以修改。默认为 ***Redis*** `/var/lib/redis/`
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007298.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007298.png
> 
> ***stop-writes-on-bgsave-error***
> 
> 即当 ***redis*** 无法写入磁盘，关闭 ***redis*** 的写入操作。
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007216.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007216.png
> 
> ***rdbcompression***
> 
> 持久化的文件是否进行压缩存储。
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007291.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007291.png
> 
> ***rdbchecksum***
> 
> 完整性的检查，即数据是否完整性、准确性。
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007505.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007505.png
> 

### 优点

- 适合大规模的数据恢复；
- 对数据完整性和一致性要求不高更适合使用；
- 节省磁盘空间；
- 恢复速度快。

### 缺点

- ***Fork*** 的时候，内存中的数据被克隆了一份，极端情况下大致 2 倍的膨胀性需要考虑；
- 虽然 ***Redis*** 在 ***fork*** 时使用了**写时拷贝技术**，但是如果数据庞大时还是比较消耗性能；
- 在备份周期在一定间隔时间做一次备份，所以如果 ***Redis*** 意外 ***down*** 掉的话，就会丢失最后一次快照后的所有修改。

## AOF

以日志的形式来记录每个写操作（增量保存），将 ***Redis*** 执行过的所有写指令记录下来（读操作不记录）， 只许追加文件但不可以改写文件，***Redis*** 启动之初会读取该文件重新构建数据，换言之，如果 ***Redis*** 重启就会根据日志文件的内容将写指令从前到后执行一次以完成数据的恢复工作。

**执行流程**

- 客户端的请求写命令会被 ***append*** 追加到 ***AOF*** 缓冲区内；
- ***AOF*** 缓冲区根据 ***AOF*** 持久化策略 `[always,everysec,no]` 将操作 ***sync*** 同步到磁盘的 ***AOF*** 文件中；
- ***AOF*** 文件大小超过重写策略或手动重写时，会对 ***AOF*** 文件 ***Rewrite*** 重写，压缩 ***AOF*** 文件容量；
- ***Redis*** 服务重启时，会重新 ***load*** 加载 ***AOF*** 文件中的写操作达到数据恢复的目的。

***AOF*** 和 ***RDB*** 同时开启时，系统默认读取 ***AOF*** 的数据（数据丢失可能性非常之底）

### 配置

> AOF 默认不开启
> 
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007979.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007979.png
> 
> **文件名字**
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007114.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030007114.png
> 
> ***AOF* 同步频率设置**
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030008359.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030008359.png
> 
> ***appendfsync always***
> 
> 始终同步，每次 ***Redis*** 的写入都会立刻记入日志；
> 
> 性能较差但数据完整性比较好。
> 
> ***appendfsync everysec***
> 
> 每秒同步，每秒记入日志一次，如果宕机，本秒的数据可能丢失。
> 
> ***appendfsync no***
> 
> ***Redis*** 不主动进行同步，把同步时机交给操作系统。
> 

> Rewrite 压缩
> 
> 
> 当 ***AOF*** 文件的大小超过所设定的阈值时，***Redis*** 就会启动 ***AOF*** 文件的内容压缩，只保留可以恢复数据的最小指令集。可以使用命令 ***bgrewriteaof***。
> 
> ![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030008104.png)
> 
> https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030008104.png
> 

### 优点

- 备份机制更稳健，丢失数据概率更低；
- 可读的日志文本，通过操作 ***AOF*** 稳健，可以处理误操作。

### 缺点

- 比起 ***RDB*** 占用更多的磁盘空间；
- 恢复备份速度要慢；
- 每次读写都同步的话，有一定的性能压力；
- 存在个别 ***Bug***，造成不能恢复。 为什么aof不能独立使用的原因

## 选择

> 官方推荐两个都启用。
> 
> 
> 如果对数据不敏感，可以选单独用 ***RDB***。
> 
> 不建议单独用 ***AOF***，因为可能会出现 ***Bug***。
> 
> 如果只是做纯内存缓存，可以都不用。
> 

# 应用问题解决(面试)

## 缓存穿透

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030008284.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030008284.png

### 现象

***key*** 对应的数据在数据源并不存在，每次针对此 ***key*** 的请求从缓存获取不到，请求都会压到数据源，从而可能压垮数据源。

比如用一个不存在的用户 ***id*** 获取用户信息，不论缓存还是数据库都没有，若黑客利用此漏洞进行攻击可能压垮数据库。

造成：

1. 应用服务器压力变大。
2. ***redis*** 命中率下降 → 查询数据库 。

### 如何解决

- **对空值缓存**
    
    如果一个查询返回的数据为空（不管是数据是否不存在），仍然把这个空结果（***null***）进行缓存，设置空结果的过期时间会很短，最长不超过五分钟。
    
- **设置可访问的名单（白名单）：**
    
    使用 ***bitmaps*** 类型定义一个可以访问的名单，名单 ***id*** 作为 ***bitmaps*** 的偏移量，每次访问和 ***bitmap*** 里面的 ***id*** 进行比较，如果访问 ***id*** 不在 ***bitmaps*** 里面，进行拦截，则不允许访问。
    
- **采用布隆过滤器**
    
    布隆过滤器（***Bloom Filter***）是1970年由布隆提出的。它实际上是一个很长的二进制向量（位图）和一系列随机映射函数（哈希函数）。
    
    布隆过滤器可以用于检索一个元素是否在一个集合中。它的优点是空间效率和查询时间都远远超过一般的算法，缺点是有一定的误识别率和删除困难。
    
    将所有可能存在的数据哈希到一个足够大的 ***bitmaps*** 中，一个一定不存在的数据会被这个 ***bitmaps*** 拦截掉，从而避免了对底层存储系统的查询压力。
    
- **进行实时监控**
    
    当发现 ***Redis*** 的命中率开始急速降低，需要排查访问对象和访问的数据，和运维人员配合，可以设置黑名单限制服务。
    

## 缓存击穿

![](https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030008402.png)

https://selton-1257770752.cos.ap-beijing.myqcloud.com/img/202304030008402.png

***key*** 对应的数据存在，但在 ***redis*** 中过期，此时若有大量并发请求过来，这些请求发现缓存过期一般都会从后端***DB*** 加载数据并回设到缓存，这个时候大并发的请求可能会瞬间把后端 ***DB*** 压垮。

1. 数据库访问压力瞬间增大。
2. ***redis*** 中没有出现大量 ***key*** 过期，***redis*** 正常运行。
3. （即某个经常访问的 ***key*** 过期，突然有大量访问这个数据）

### 如何解决

- 预先设置热门数据
    
    在 ***redis*** 高峰访问之前，把一些热门数据提前存入到 ***redis*** 里面，加大这些热门数据 ***key*** 的时长。
    
- 实时调整
    
    现场监控哪些数据热门，实时调整 ***key*** 的过期时长。
    
- 使用锁

## 缓存雪崩

***key*** 对应的数据存在，但在 ***redis*** 中过期，此时若有大量并发请求过来，这些请求发现缓存过期一般都会从后端***DB*** 加载数据并回设到缓存，这个时候大并发的请求可能会瞬间把后端 ***DB*** 压垮。

缓存雪崩与缓存击穿的区别在于这里针对很多 ***key*** 缓存，前者则是某一个 ***key***。

1. 数据库压力变大。
2. 即极少的时间段，查询大量 ***key*** 的集中过期情况。

### 如何解决

- **构建多级缓存架构**
    
    ***nginx*** 缓存 + ***redis*** 缓存 + 其他缓存（***ehcache***等）
    
- **使用锁或队列：**
    
    用加锁或者队列的方式保证来保证不会有大量的线程对数据库一次性进行读写，从而避免失效时大量的并发请求落到底层存储系统上。不适用高并发情况。
    
- **设置过期标志更新缓存：**
    
    记录缓存数据是否过期（设置提前量），如果过期会触发通知另外的线程在后台去更新实际 ***key*** 的缓存。
    
- **将缓存失效时间分散开：**
    
    比如我们可以在原有的失效时间基础上增加一个随机值，比如 1～5 分钟随机，这样每一个缓存的过期时间的重复率就会降低，就很难引发集体失效的事件。