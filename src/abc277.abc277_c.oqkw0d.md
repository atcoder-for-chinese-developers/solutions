---
title: "ABC277_C_solution.md"
tags: []
author: "Binary_1110011_"
created: "2022.11.12"
---

因为楼层最大有 $10^9$ ，所以考虑用 $\text{map}$ 进行离散化，同时记下每个楼层离散化之前的值，然后建图跑 $\text{DFS}$ ，就可以得出最高可以到达的楼层了。

AC Code

```cpp
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long
using namespace std;
int n,u,v,ans=1,tot=1,val[200005];
map<int,int> mp;
vector<int> a[200005];
bool vis[200005];
void dfs(int x){
	for(int i=0;i<a[x].size();i++){
		int tmp=a[x][i];
		if(!vis[tmp]){
			ans=max(ans,val[tmp]);
			vis[tmp]=1;
			dfs(tmp); 
		}
	}
}
signed main(){
	IOS;TIE;
	cin>>n;
	mp[1]=1;
	for(int i=1;i<=n;i++){
		cin>>u>>v;
		if(!mp[u]) mp[u]=++tot,val[tot]=u;
		if(!mp[v]) mp[v]=++tot,val[tot]=v;
		a[mp[u]].push_back(mp[v]);
		a[mp[v]].push_back(mp[u]);
	}
	vis[1]=1;
	dfs(1);
	cout<<ans<<endl;
	return 0;
} 

```