---
title: "ABC277_A_solution.md"
tags: []
author: "Binary_1110011_"
created: "2022.11.12"
---

按照题目要求模拟。

AC Code

```cpp
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long
using namespace std;
int n,a[200005],x,ans;
signed main(){
	IOS;TIE;
	cin>>n>>x;
	for(int i=1;i<=n;i++){
		cin>>a[i];
		if(a[i]==x) ans=i;
	}
	cout<<ans<<endl; 
	return 0;
} 

```