

# 文件系统的组成
文件系统通常会将这两部份的数据分别存放在不同的区块，权限与属性放置到
inode 中，至于实际数据则放置到 data block 区块中。 另外，还有一个超级区块 (superblock) 会记
录整个文件系统的整体信息，包括 inode 与 block 的总量、使用量、剩余量等

每个 inode 与 block 都有编号，至于这三个数据的意义可以简略说明如下：
 superblock：记录此 filesystem 的整体信息，包括 inode/block 的总量、使用量、剩余量， 以及文件系统的
格式与相关信息等；
inode：记录文件的属性，一个文件占用一个 inode，同时记录此文件的数据所在的 block 号码；
block：实际记录文件的内容，若文件太大时，会占用多个 block 。

由于每个 inode 与 block 都有编号，而每个文件都会占用一个 inode ，inode 内则有文件数据放置
的 block 号码。 因此，我们可以知道的是，如果能够找到文件的 inode 的话，那么自然就会知道这
个文件所放置数据的 block 号码， 当然也就能够读出该文件的实际数据了。这是个比较有效率的作
法，因为如此一来我们的磁盘就能够在短时间内读取出全部的数据， 读写的效能比较好

我们将 inode 与 block 区块用图解来说明一下，如下图所示，文件系统先格式化出 inode 与 block 
的区块，假设某一个文件的属性与权限数据是放置到 inode 4 号(下图较小方格内)，而这个 inode 记
录了文件数据的实际放置点为 2, 7, 13, 15 这四个 block 号码，此时我们的操作系统就能够据此来排
列磁盘的阅读顺序，可以一口气将四个 block 内容读出来！ 那么数据的读取就如同下图中的箭头所
指定的模样了

![](https://static.meowrain.cn/i/2023/09/20/kfzpyl-3.webp)

这种数据存取的方法我们称为索引式文件系统(indexed allocation)。

## inode table
inode 记录的文件数据:
该文件的存取模式(read/write/excute)；
 该文件的拥有者与群组(owner/group)；
 该文件的容量；
 该文件建立或状态改变的时间(ctime)；
 最近一次的读取时间(atime)；
 最近修改的时间(mtime)；
 定义文件特性的旗标(flag)，如 SetUID...；
 该文件真正内容的指向 (pointer)；

inode的特色：
每个 inode 大小均固定为 128 bytes (新的 ext4 与 xfs 可设定到 256 bytes)；
 每个文件都仅会占用一个 inode 而已；
 承上，因此文件系统能够建立的文件数量与 inode 的数量有关；
 系统读取文件时需要先找到 inode，并分析 inode 所记录的权限与用户是否符合，若符合才能够开始实际
读取 block 的内容

## Super Block
Superblock 是记录整个 filesystem 相关信息的地方，没有 Superblock ，就没有这个 filesystem 了。
他记录的信息主要有：
block 与 inode 的总量；
 未使用与已使用的 inode / block 数量；
 block 与 inode 的大小 (block 为 1, 2, 4K，inode 为 128bytes 或 256bytes)；
 filesystem 的挂载时间、最近一次写入数据的时间、最近一次检验磁盘 (fsck) 的时间等文件系统的相关信
息；
 一个 valid bit 数值，若此文件系统已被挂载，则 valid bit 为 0 ，若未被挂载，则 valid bit 为 1 。