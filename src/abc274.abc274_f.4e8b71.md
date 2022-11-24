---
title: "ABC274F 题解"
tags: []
author: "Rolling_Code"
created: "Thu Nov 24 2022 21:50:00 GMT+0800 (中国标准时间)"
---

首先显然的一点是，我们撒网的时候网左端点处一定有一只鱼，否则我们把网向右移动。

我们先枚举其中一只鱼 $i$ 被抓住，然后看其他鱼可以被捕捉到的区间。

以下 事件 指 一条鱼进入可以捕捉的范围 或者 脱离可以捕捉的范围 的时间点（可能为负数），并且记录对网捕获鱼的价值的贡献。

这时候需要判断当前鱼 $j$ 的速度和 $i$ 的速度的大小关系。

如果速度相同，那么就是判断开始时是否在网内。

如果不同则可以用公式算出进出网的时间。

注意到事件的处理实际上是一个差分。

注意差分的时候先加后减。

然后排序扫一遍就可以了，记得如上结果可能会导致负时刻的出现但是实际上我们不能在负时刻撒网。


所以一次统计复杂度是 $\mathcal{O}(n\log n)$ 的，总复杂度 $\mathcal{O}(n^2\log n)$。

```cpp
#include<bits/stdc++.h>
#define N 100009
#define INF 0x3f3f3f3f3f3f3f3f
using namespace std;
typedef long long ll;
inline ll read() {
    ll x=0,f=1;int c=getchar();
    while(!isdigit(c)) {if(c=='-') f=-1;c=getchar();}
    while(isdigit(c)) {x=(x<<1)+(x<<3)+(c^48);c=getchar();}
    return x*f;
}
ll n,len,x[N],w[N],v[N],res,tp,tmp;
struct node{
    double x;ll z;
    node(double xx=0,ll zz=0){x=xx,z=zz;}
    bool operator<(const node&pp){return x<pp.x||(x==pp.x&&z>pp.z);}
} stk[N];
int main(){
    //freopen(".in","r",stdin);
    //freopen(".out","w",stdout);
    n=read(),len=read();for(int i=1;i<=n;i++) w[i]=read(),x[i]=read(),v[i]=read();
    for(int i=1;i<=n;i++){
        tp=0,tmp=0;
        for(int j=1;j<=n;j++){
            ll p=x[j]-x[i],q=v[j]-v[i];
            if(!q&&p>=0&&p<=len){stk[++tp]=node(0,w[j]);continue;}
            if(q>0){stk[++tp]=node(-p/1.0/q,w[j]),stk[++tp]=node((len-p)/1.0/q,-w[j]);continue;}
            if(q<0){stk[++tp]=node((p-len)/1.0/(-q),w[j]),stk[++tp]=node(p/1.0/(-q),-w[j]);continue;}
        }
        sort(stk+1,stk+tp+1);
        for(int j=1;j<=tp;j++){
            tmp+=stk[j].z;
            if(stk[j].x>=0) res=max(res,tmp);
        }
    }
    printf("%lld\n",res);
    return 0;
}
```