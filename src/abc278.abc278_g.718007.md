---
title: "ABC278G 题解（官方题解做法）"
tags: []
author: "psz2007"
created: "Mon Nov 21 2022 19:20:00 GMT+0800 (中国标准时间)"
---


看到公平组合游戏，想到 SG 函数。令 $f(i)$ 表示局面为连续的 $n$ 块石头时的 SG 函数，于是我们有：

$$
f(i)=\operatorname{mex}_{x,y\in\mathbb N,i-r\le x+y\le i-l} f(x)\oplus f(y),f(0)=1
$$

这个 $x$ 和 $y$ 就表示中间选了一段以后左边和右边剩下的石子个数。直接计算肉眼可见是 $O(n^3)$ 的（其实存在 $O(n^2\log n)$ 的计算方法，见 [Acfboy 的题解](https://atcoder-for-chinese-developers.github.io/atcoder-for-chinese/index.html?page=Sabc278.abc278_g.mf25ic)），于是我们绕过 SG 函数的计算过程，来看博弈时的决策：

如果我们选择先手，那么第一步决策以后要使得当前局面的 SG 函数为 0，又因为我们知道 $x\oplus x=0$，于是有一种构造方案是使得左右均分，然后要始终保持左右两部分局面相同（在交互器操作的另一边对应位置进行操作），从而保持 SG 函数异或和为 0。

我们注意到存在上述构造的条件是 $\exists k\in[l,r]\cup\mathbb N,k\equiv n\pmod 2$，而当 $l<r$ 时条件总是可以被满足。从而我们解决了所有 $l<r$ 的情况。

$l=r$ 的情况即按照上述式子递推 SG 函数，然后每次挑选一个位置使得当前操作后 SG 函数为 0。以上过程可在 $O(n^2)$ 的时间内完成。

代码有轻微压行。

```cpp
#include<bits/stdc++.h>
using namespace std;
int const N=4105;
int n,l,r,x,y,f[N],g[N],v[N],p[N],q[N];
void move(){
    int s=0;
    for(int i=1,t=0;i<=n+1;i++)
        v[i]?s^=f[t],t=0:t++,p[i]=v[i]?i:p[i-1];
    for(int i=n+1;i;i--)
        q[i]=v[i]?i:q[i+1];
    // p[i],q[i] 表示左边和右边最近的被拿走的
    for(int i=1;i<=n;i++)
        // 验证去掉当前段，加上被劈开的左右两段以后 SG 和是不是为 0
        if(!v[i]&&i+l<=q[i]&&!(s^f[q[i]-p[i]-1]^f[i-p[i]-1]^f[q[i]-i-l])){
            cout<<i<<" "<<l<<endl;
            for(int j=i;j<i+l;v[j++]=1);
            break;
        }
}
int main(){
    if(cin>>n>>l>>r,l<r)
        for(l+=n-l&1,cout<<"First\n"<<(n-l)/2+1<<" "<<l<<endl;;){
            if(cin>>x>>y,!x)exit(0);
            cout<<x+(n+l)/2*(x>n/2?-1:1)<<" "<<y<<endl;
        }
        // l<r 的情况：保持左右一致
    for(int i=1;i<=n;i++){
        memset(g,0,sizeof g);
        for(int j=0;j<=i-l;j++)
            g[f[j]^f[i-j-l]]=1;
        for(;g[f[i]];f[i]++);
    }
    // 递推 SG 函数 f(i)
    for(v[n+1]=1,cout<<(f[n]?"First":"Second")<<endl,f[n]&&(move(),1);;move()){
        if(cin>>x>>y,!x)exit(0);
        for(int i=x;i<x+y;v[i++]=1);
    }
}
```
