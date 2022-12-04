---
title: "ABC280_F_solution.md"
tags: []
author: "Binary_1110011_"
created: "2022-12-4"
---


首先是 `nan` 的情况，只需判断两点是否在同一连通块中即可。

然后是 `inf` 的情况。不难发现路径要无限长只能是出现了 $>0$ 的环，这样的话环所在的整个连通块中，任意两点之间都是 `inf`。考虑如何判断这样的正环。

首先按题意建图，然后在每个连通块内跑一遍 $\text{DFS}$ 搞出一颗生成树并记下到每个点的距离。若没有正环，则初始连边的距离是和生成树跑出来的距离相等的。换句话说，两点间怎么走距离都是相等的。然后只要给出现距离矛盾的点所在的连通块都打上标记即可。

剩下的直接用生成树跑出来的距离算。

AC Code

```cpp
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long
#define y1 cyy
using namespace std;
int n,m,q,u,v,w,col[100005],cnt,f[100005];
bool mark[100005],vis[100005];
struct node{
	int to,dis;
};
vector<node> a[100005];
void dfs(int x,int c){
	col[x]=c,vis[x]=1;
	for(int i=0;i<a[x].size();i++){
		node tmp=a[x][i];
		if(!vis[tmp.to]){
			f[tmp.to]=f[x]+tmp.dis;
			dfs(tmp.to,c);
		}
	}
}
signed main(){
	IOS;TIE;
	cin>>n>>m>>q;
	for(int i=1;i<=m;i++){
		cin>>u>>v>>w;
		a[u].push_back({v,w}),a[v].push_back({u,-w});
	}
	for(int i=1;i<=n;i++){
		if(!vis[i]) dfs(i,++cnt);
	}
	for(int i=1;i<=n;i++){
		for(int j=0;j<a[i].size();j++){
			node tmp=a[i][j];
			if(f[tmp.to]!=f[i]+tmp.dis) mark[col[i]]=1;
		}
	}
	while(q--){
		cin>>u>>v;
		if(col[u]!=col[v]) cout<<"nan"<<endl;
		else if(mark[col[u]]) cout<<"inf"<<endl;
		else cout<<f[v]-f[u]<<endl;
	}
	return 0;
}
```