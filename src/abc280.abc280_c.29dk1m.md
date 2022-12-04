---
title: "ABC280_C_solution.md"
tags: []
author: "Binary_1110011_"
created: "2022-12-4"
---

找到两个字符串第一个不同位置，在较短的字符串中加一个字母，一定是合法的。

AC Code

```cpp
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long
#define y1 cyy
using namespace std;
string s,t;
signed main(){
	IOS;TIE;
	cin>>s>>t;
	for(int i=0;i<t.size();i++){
		if(s[i]!=t[i]){
			cout<<i+1<<endl;
			return 0;
		}
	}
	return 0;
}
```