---
title: "ABC280_A_solution.md"
tags: []
author: "Binary_1110011_"
created: "2022-12-4"
---

要求的是 `#` 的数量，直接判断。

AC Code

```cpp
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long
#define y1 cyy
using namespace std;
int n,m,ans;
char c;
signed main(){
	IOS;TIE;
	cin>>n>>m;
	for(int i=1;i<=n;i++){
		for(int j=1;j<=m;j++){
			cin>>c;
			if(c=='#') ans++;
		}
	}
	cout<<ans<<endl;
	return 0;
}
```