# bestPractices
creator最佳实践，它也类似一个功能库或者函数库，用来记录个人在项目开发过程中遇到的各种问题及解决方法。


# git检出项目部分目录（稀疏检出）
* 配置稀疏检出 
    1. 打开稀疏检出 git config core.sparsecheckout true
    2. 配置自定义检出 .git/info/sparse-checkout 如：1./*  2.bestPractices/blockTouches
    
* 再次修改或者添加sparse-checkout文件时候执行 git read-tree -mu HEAD 

* 参考：
    1. https://www.cnblogs.com/yifeng555/p/9957792.html
    2. https://segmentfault.com/a/1190000006703926
    
    
    