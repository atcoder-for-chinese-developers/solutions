---

title: "ABC181f"
tags: [  ]
author: "Rnfmabj"
created: "2022.11.16 14:00"

---

## ABC181F

*2009

### 题意

给你一个平面，上界是直线 $y=100$ 下界是直线 $y=-100$。

在平面上 $n$ 个钉子，钉子不能在圆内。

一个圆从 $x=-\infty$ 开始向右运动，问最大的半径使圆能够到达 $x=\infty$。

 $n,|x|,|y| \le 100$ ，精度误差允许 $10^{-4}$。

### 题解

看到最大化与合法化，考虑二分。

容易发现钉子可以拦住直径为 $d$ 的圆，当且仅当可以用若干条长度不大于 $d$ 的线段从上界途径钉子连接到下界。

这样一来当圆试图经过这条线时，无论如何都会被其中的一条线段拦住。

用并查集维护这个过程。对于每个点 $(x,y)$ ，我们额外添加点 $(x,100)$ 与 $(x,-100)$，用来连接边界。

设当前圆的直径为 $d$ ，我们只需要连接所有距离不大于 $d$ 的点，连接完成后检查上下界是否被连接即可。

时间复杂度 $O(n^2\log v · \alpha(n))$，其中 $v$ 为二分精度需求。

### 代码

```cpp
const ll maxn=105;
ll fa[maxn<<2];//空间开大，因为要额外加两倍的点
const db eps=1e-9;
ll cmp(db x,db y){
	if(x-y>eps)return 2;
	if(y-x>eps)return 1;
	return 0;
}//规避精度误差
struct node{
	ll x,y;
}a[maxn<<2];
ll tot;
db calc(node u,node v){
	return 1.0*(sqrt(1.0*(u.x-v.x)*(u.x-v.x)+1.0*(u.y-v.y)*(u.y-v.y)));
}//计算距离
ll find(ll x){return fa[x]==x?x:fa[x]=find(fa[x]);}
void merge(ll u,ll v){u=find(u),v=find(v);if(u==v)return ;fa[u]=v;}
bool check(db lim){
	for(ll i=1;i<=tot;i++)fa[i]=i;
	for(ll i=1;i<=tot;i++){
		for(ll j=1;j<=tot;j++){
			if(i==j)continue;
			if(cmp(calc(a[i],a[j]),lim)==2)continue;
			merge(i,j);
		}
	}//合并
	for(ll i=1;i<=tot;i++){
		if(a[i].y!=100&&a[i].y!=-100)continue;
		for(ll j=i+1;j<=tot;j++){
			if(a[i].y+a[j].y)continue;
			if(find(i)==find(j))return 0;
		}
	}//检查
	return 1;
}
ll n;
void solve(){
	n=R;
	for(ll i=1;i<=n;i++){
		ll x=R,y=R;
		a[++tot].x=x;
		a[tot].y=y;
		a[++tot].x=x;
		a[tot].y=100;
		a[++tot].x=x;
		a[tot].y=-100;
	}
	db l=0.0,r=200.0;
	while(cmp(l,r)){
		db mid=(l+r)/2.0;
		if(check(mid))l=mid;
		else r=mid;
	}
	//注意我们二分的是直径，所以输出半径要除以 2
	printf("%.8lf\n",l/2.0);//AT中文版的题面中没有注明精度要求，实际上是 1e-4
	//所以这里的保留精度（和上文的eps）都相对取得比较小
	return ;
}
```

