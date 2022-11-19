---
title: "ABC276_A_solution.md"
tags: []
author: "Binary_1110011_"
created: "2022.11.16"
---

初始答案为 $-1$，从左往右出现 `a` 的话就更新答案即可。

AC Code

```cpp
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long
using namespace std;
string s;
signed main(){
	IOS;TIE;
	cin>>s;
	int x=-1;
	for(int i=0;i<s.size();i++){
		if(s[i]=='a') x=i+1;
	}
	cout<<x<<endl;
	return 0;
} 

```