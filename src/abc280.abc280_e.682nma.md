---
title: "ABC280_E_solution.md"
tags: []
author: "Binary_1110011_"
created: "2022-12-4"
---

最基础的概率 $\text{DP}$ 。考虑记 $f_i$ 表示使怪物血量降低至 $i$ 的期望攻击次数。同时因为给出的 $p$ 不是实际概率，实际概率为 $p\div 100$ ，每次写逆元比较麻烦，所以事先算好 $E=100^{mod-2}$，这样 $\div 100$ 时只要 $\times E$ 即可。

初始 $f_n=0$ ，然后倒序枚举。每个值的贡献由扣两点血和扣一点血组成：

- 扣两点血（ $i=n-1$ 时只能照扣一点算）：

$$f_i=f_i+(f_{i+1+(i!=n-1)}+1)\times p\times E$$

- 扣一点血：

$$f_i=f_i+(f_{i+1}+1)\times(1-p\times E)$$

最后输出 $f_0$ 即可。

AC Code

```cpp
#include<bits/stdc++.h>
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define int long long
#define y1 cyy
#define mod 998244353
using namespace std;
int n,p,f[200005];
int ksm(int x,int b){
	int ans=1;
	while(b){
		if(b&1) ans=ans*x%mod;
		x=x*x%mod;
		b>>=1;
	}
	return ans;
}
signed main(){
	IOS;TIE;
	cin>>n>>p;
	int E=ksm(100,mod-2);
	f[n]=0;
	for(int i=n-1;i>=0;i--){
		f[i]+=(f[i+1+(i!=n-1)]+1)*p%mod*E%mod,f[i]%=mod;
		f[i]+=(f[i+1]+1)*(1-p*E%mod)%mod,f[i]%=mod;
		f[i]+=mod,f[i]%=mod;
	}
	cout<<f[0]<<endl;
	return 0;
}
```
