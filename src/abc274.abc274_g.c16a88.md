---
title: "ABC274G 题解"
tags: []
author: "Rolling_Code"
created: "Thu Nov 24 2022 21:50:00 GMT+0800 (中国标准时间)"
---

首先我们可以不用朝左朝上的摄像头。

原因是可以用 他能照射到的最“远”点，改成朝下或者朝右的摄像头。

这个问题变成了最小路径覆盖问题。

所以开始拆点，$i$ 拆成 $x_i,y_i$ 两个点。

建立 $s\rightarrow x_i,y_i\rightarrow t$ 的边，容量都是 $1$。

然后对于每一条原图中的边 $i,j$，连接 $x_i,y_j$。

官方题解里有一个办法进一步减少点数，就是把一个点的 $x$ 点令为其“下”点，如果其上侧不是障碍可以和上方格的 $x$ 点合并；

同理，$y$ 点为“右”点，然后如果左侧不是障碍那么可以和左方格的 $y$ 点合并。

这次采用了这种写法。

然后跑个最大流就可以了。复杂度 $\mathcal{O}((wh)^{\frac{3}{2}})$。

```cpp
#include<bits/stdc++.h>
#define N 500009
#define M 20000009
#define INF 0x3f3f3f3f3f3f3f3f
using namespace std;
typedef long long ll;
inline ll read() {
    ll x=0,f=1;int c=getchar();
    while(!isdigit(c)) {if(c=='-') f=-1;c=getchar();}
    while(isdigit(c)) {x=(x<<1)+(x<<3)+(c^48);c=getchar();}
    return x*f;
}
namespace Flow{
    ll s,t,hd[N],tot=1,dst[N],nw[N],ans;
    struct edge{ll t,w,nxt;} es[M];
    void add(ll u,ll v,ll w){
        es[++tot]=(edge){v,w,hd[u]},hd[u]=tot;
        es[++tot]=(edge){u,0,hd[v]},hd[v]=tot;
    }
    bool bfs(){
        memset(dst,0x3f,sizeof(dst));
        queue<ll> q;
        q.push(s);
        dst[s]=0;
        nw[s]=hd[s];
        while(!q.empty()){
            ll x=q.front();q.pop();
            for(int i=hd[x];i;i=es[i].nxt){
                if(es[i].w>0&&dst[es[i].t]==INF){
                    nw[es[i].t]=hd[es[i].t]; 
                    dst[es[i].t]=dst[x]+1;
                    q.push(es[i].t);
                    if(es[i].t==t) return 1;
                }
            }
        }
        return 0;
    }
    ll dfs(ll x,ll tot){
        if(x==t) return tot;
        ll sum=0,k;
        for(int i=nw[x],v;i&&tot;i=es[i].nxt){
            nw[x]=i;
            v=es[i].t;
            if(es[i].w>0&&dst[v]==dst[x]+1){
            k=dfs(v,min(tot,es[i].w));
                if(k==0) dst[v]=INF;
                es[i].w-=k,es[i^1].w+=k;
                tot-=k,sum+=k; 
            }
        }
        return sum;
    }
    ll dinic(){ll ans=0;while(bfs()) ans+=dfs(s,INF);return ans;}
}
ll n,m,dwn[309][309],rgt[309][309];
char s[309][309];
#define merge(i,j) ((i-1)*m+j)
int main(){
    //freopen(".in","r",stdin);
    //freopen(".out","w",stdout);
    n=read(),m=read(),Flow::s=0,Flow::t=2*n*m+1;
    for(int i=1;i<=n;i++){
        scanf("%s",s[i]+1);
        for(int j=1;j<=m;j++){
            if(s[i][j]!='.') continue;
            dwn[i][j]=merge(i,j),rgt[i][j]=merge(i,j)+n*m;
            if(s[i-1][j]=='.') dwn[i][j]=dwn[i-1][j];
            if(s[i][j-1]=='.') rgt[i][j]=rgt[i][j-1];
            Flow::add(Flow::s,merge(i,j),1),Flow::add(merge(i,j)+n*m,Flow::t,1),Flow::add(dwn[i][j],rgt[i][j],INF);
        }
    }
    printf("%lld\n",Flow::dinic());
    return 0;
}
```