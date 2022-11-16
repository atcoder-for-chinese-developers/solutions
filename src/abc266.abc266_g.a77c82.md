---

title: "ABC266G"
tags: [  ]
author: "Rnfmabj"
created: "2022.11.16 14:00"

---

## ABC266G

*2045


### 题意

给你四个整数 $R,G,B,K$。

你需要求出有多少个由 `R`，`G`，`B` 组成的字符串满足以下条件：

1. `R`，`G`，`B` 的个数恰好分别为 $R,G,B$ 。

2. 子串 `RG` 的出现次数恰好为 $K$。

答案对 $998244353$ 取模。

$R,G,B \le 10^6,K \le min(R,G)$

### 题解

看到 “出现次数恰好为 $K$ ”，考虑二项式反演。

设 $f(x)$ 表示 “钦定子串 `RG` 出现了 $x$ 次的方案数”，$g(x)$ 表示 “恰好子串 `RG` 出现了 $x$ 次的方案数”。

那么 $f(x)$ 是很好计算的，将 `RG` 看做第四个字符然后计算排列最后对四个字符消序即可。

即：设 $n=R+G+B$ ，则

$$
f(x)=\frac{n!}{x!\ · \ (R-x)!\ ·\ (G-x)!\ · \ B!}
$$

然而 $g(x)$ 就不那么便于直接计算了，需要通过 $f(x)$ 计算。

首先考虑 $f,g$ 的关系。

由于一个是 “钦定（至少）”，一个是 “恰好”，所以对于任意的 $n \le i$，$g(i)$ 在 $f(n)$ 中被计算了 $\binom{i}{n}$ 次。

也就是 $f(x)=\sum_{i=x}^{lim}\binom{i}{x}g(i)$ ，其中 $lim=min(R,G)$ 。

运用 [二项式反演](https://www.cnblogs.com/GXZlegend/p/11407185.html) 的常用形式，可以得到：

（↑上面这个博客讲得超级好诶，真的不去看看嘛）

$$
g(x)=\sum_{i=x}^{lim}(-1)^{i-x}\binom{i}{n}f(i)
$$

用这个式子就可以计算出 $g(k)$ 也就是答案啦~

时间复杂度可以做到 $O(N)$，我的代码在预处理环节没有选择线性做，所以是 $O(N \log V)$ 的，其中 $V$ 为模数。

### 代码

```cpp
const ll maxn=3e6+5,mod=998244353;
ll ksm(ll x,ll k){ll res=1;for(;k;k>>=1,x=x*x%mod)if(k&1)res=res*x%mod;return res;}
ll a,b,c,k;
ll fac[maxn],inv[maxn];
ll n;
ll C(ll x,ll y){return fac[x]*inv[y]%mod*inv[x-y]%mod;}
void init(){
	n=a+b+c;
	fac[0]=inv[0]=1;
	for(ll i=1;i<=n;i++){
		fac[i]=fac[i-1]*i%mod;
		inv[i]=ksm(fac[i],mod-2);
	}
}
ll f[maxn],g[maxn];
void solve(){
	a=R,b=R,c=R,k=R;
	init();
	ll lim=min(a,b);
	for(ll i=k;i<=lim;i++){
		f[i]=fac[n-i]*inv[i]%mod*inv[a-i]%mod*inv[b-i]%mod*inv[c]%mod;
	}
	ll ans=0;
	for(ll i=k;i<=lim;i++){
		ans=(ans+((i-k)%2==1?mod-1:1)*C(i,k)%mod*f[i]%mod)%mod;
	}
	we(ans);
	return ;
}
```
