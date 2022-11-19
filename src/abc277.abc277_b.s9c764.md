---
title: "ABC277_B_solution.md"
tags: []
author: "Binary_1110011_"
created: "2022.11.12"
---

把字符串分成两位分别进行判断。判重的话搞个 $\text{map}$ 就好。

AC Code

```cpp
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long
using namespace std;
int n,fl;
map<string,bool> mp;
string s;
signed main(){
	IOS;TIE;
	cin>>n;
	while(n--){
		cin>>s;
		if(mp[s]) fl=1;
		mp[s]=1;
		if(s[0]!='H'&&s[0]!='D'&&s[0]!='C'&&s[0]!='S'){
			fl=1;
		}
		if(s[1]!='A'&&s[1]!='J'&&s[1]!='Q'&&s[1]!='K'&&s[1]!='T'&&!(s[1]>='2'&&s[1]<='9')){
			fl=1;
		}
	}
	cout<<(fl?"No":"Yes")<<endl; 
	return 0;
}  

```