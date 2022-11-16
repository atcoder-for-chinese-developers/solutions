---

title: "ABC208E"
tags: [  ]
author: "Rnfmabj"
created: "2022.11.16 14:00"

---

## ABC208E

*2024

### 题意

求有多少个不大于 $N$ 的正整数，使得该正整数各位乘积不大于 $K$。

$N \le 10^{18},K \le 10^9$

### 题解

$N$ 很大而且要求求解数位相关问题，显然数位 DP。

如果把乘积换成和这题就纯数位 DP 入门题了，比较卡手的地方在于当前乘积是一定要被设计到状态里的，但是一方面乘积太大了不好存，另一方面这个过大的乘积会不会造成状态数过多导致效率问题？

答案是想多了。

实际上会出现的乘积相当有限（是 $O(\log n · \log k)$ 级别的），而且还有内鬼数位 $0$。为啥说是内鬼呢，因为一旦 $0$ 不作为前导零出现而是在中间出现的话，整个数的乘积就会变成 $0$，后面再怎么改都没用，减少了一定的状态。而且由于是乘积，同一个乘积可以被很多种组合凑出来，存在大量的重复计算。

所以直接上  `std::unordered_map` 存状态就好了。设 $f_{zero,pre,dig,mul}$ 表示当前是否仍在前导零，是否紧贴上界限制，枚举到第几位，当前乘积时有多少合法方案，直接枚举转移即可。其中第四位 $mul$ 用 `std::unordered_map` 存储。

### 代码

```cpp
unordered_map<ll,ll>f[2][2][20];
ll n,k,lim[20];
ll dfs(bool z,bool p,ll x,ll mul){
	if(!x){
		if(mul<=k)return 1;
		else return 0;
	}
	if(f[z][p][x].count(mul))return f[z][p][x][mul];
	ll res=0;
	for(ll i=0;i<=(p?lim[x]:9);i++){
		if(z){
			if(i==0)res+=dfs(z,p&&i==lim[x],x-1,mul);
			else res+=dfs(0,p&&i==lim[x],x-1,i);
		}
		else {
			res+=dfs(z,p&&i==lim[x],x-1,mul*i);
		}
	}
	return f[z][p][x][mul]=res;
}
void solve(){
	n=R,k=R;
	ll tot=0;
	while(n){
		lim[++tot]=n%10;
		n/=10;
	}
	we(dfs(1,1,tot,0)-1);
	return ;
}
```

