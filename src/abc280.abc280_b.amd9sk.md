---
title: "ABC280_B_solution.md"
tags: []
author: "Binary_1110011_"
created: "2022-12-4"
---

直接输出差分数组就好了。

AC Code

```cpp
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long
#define y1 cyy
using namespace std;
int n,a[200005];
signed main(){
	IOS;TIE;
	cin>>n;
	for(int i=1;i<=n;i++) cin>>a[i];
	for(int i=1;i<=n;i++) cout<<a[i]-a[i-1]<<' ';
	cout<<endl;
	return 0;
}
```