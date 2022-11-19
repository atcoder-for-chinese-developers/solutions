---
title: "ABC274_A_solution.md"
tags: []
author: "Binary_1110011_"
created: "2022.10.23"
---

使用 $\text{double}$ 类型，直接输出即可。

AC Code

```cpp
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0) 
#define int long long
using namespace std;
double x,y;
signed main(){
	IOS;TIE;
	cin>>x>>y;
//	printf("%.3lf\n",y/x);   printf 写法
	cout<<fixed<<setprecision(3)<<y/x<<endl;
	return 0;
} 
```

