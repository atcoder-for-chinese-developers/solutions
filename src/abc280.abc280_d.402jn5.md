---
title: "ABC280_D_solution.md"
tags: []
author: "Binary_1110011_"
created: "2022-12-4"
---

直接二分答案就好，二分答案为 $x$ 的阶乘。

如何判断 $x$ 是否合法？设 $cnt_{p_i}$ 为原来的 $k$ 所含质因数 $p_i$ 的数量，显然需要 $1\sim x$ 中所有数分解质因数后每一个 $p_i$ 的数量之和都 $>cnt_{p_i}$ 。

考虑如何快速计算 $1\sim x$ 中各质因数数量之和。设要求的质因数为 $p_i$，则 $1\sim x$ 中质因数 **含一个及以上** $p_i$ 的数的数量为 $\lfloor\frac x {p_i}\rfloor$ ，**含两个及以上** $p_i$ 的数的数量为 $\lfloor\frac x {{p_i}^2}\rfloor$ ，**含三个及以上** $p_i$ 的数的数量为 $\lfloor\frac x {{p_i}^3}\rfloor$ ，以此类推。

然后就做完了。

AC Code

```cpp
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long
#define y1 cyy
#define fi first
#define se second
using namespace std;
int k,n;
map<int,int> mp,mp2;
bool check(int mid){
	for(auto i:mp){
		int cnt=0,tmp=i.fi;
		while(tmp<=mid) cnt+=mid/tmp,tmp*=i.fi;
		if(cnt<i.se) return 0;
	}
	return 1;
}
signed main(){
	IOS;TIE;
	cin>>k;
	int l=1,r=k,ans;
	for(int i=2;i*i<=k;i++){
		while(k%i==0) mp[i]++,k/=i;
	}
	if(k>1) mp[k]++;
	while(l<=r){
		int mid=(l+r)>>1;
		if(check(mid)) r=mid-1,ans=mid;
		else l=mid+1;
	}
	cout<<ans<<endl;
	return 0;
}
```