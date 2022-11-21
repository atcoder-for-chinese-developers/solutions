---
title: "ABC278G 题解（直接维护 SG 函数）"
tags: []
author: "Acfboy"
created: "Mon, 21 Nov 2022 10:20:22 GMT"
---

首先发现这个问题是一个公平组合游戏，那么考虑它一个状态的 SG 函数是怎么样的。

我们把这个游戏看成若干个满足卡牌连续的游戏的组合，这样我们只要处理出每个长度对应的游戏的 SG 函数就可以了。  
于是就有了一个朴素的做法，枚举一个长度，再枚举 $x, y$，最后对所有执行了 $(x, y)$ 操作剩下的两段的异或和求 $\operatorname{mex}$，这样就处理出来了我们需要的 SG 函数。进行游戏时只要枚举操作将当前状态变成 SG 函数值为 $0$ 的状态即可。  
但是这样复杂度太高了。可以发现，$L \le y \le R$ 的限制实际上是限制了操作后剩下的两段的和，那么对于每个长度，把它所有的分成两段和相同的作为一组。这样枚举 $(x, y)$ 显然浪费了，考虑直接枚举两段异或值 $x$，并判断否可以被达到。  
具体地，开一个 `std::map` 的数组，把异或和为 $x$，长度和为 $y$ 的两段长度放进 `map[x][y]` 里，查询的时候在相应的异或和对应的容器里 `lower_bound` 即可。同时对于一个长度记下要达成每个异或和的方案。注意到只加入了 $n$ 个 SG 函数值，所以可以单次加入的时候枚举它和前面每一个长度的组合，存到相应的 `std::map` 里、
这样处理出所有 `SG` 的复杂度降到了 $O(n^2 \log n)$

然后考虑怎么去进行游戏。  
这一步其实很好做，用一个 `std::set` 存下每一段，对于我们的回合，枚举每一段可否通过改变使得所有段的 SG 函数为 $0$ 即可。由 SG 函数知识可以知道，这是一定有解的。得到任意一组答案后进行相应的修改并处理交互库的操作即可。  
这一段的复杂度也是 $O(n^2 \log n)$ 的。

```cpp
void doit(int x, int y) {
	auto c = *std::prev(s.upper_bound({x, n}));
	s.erase(c);
	cur ^= SG[c.second];
	if (x - c.first > 0) s.insert({c.first, x - c.first}), cur ^= SG[x - c.first];
	if (c.second - (x - c.first) - y > 0) {
	    s.insert({x + y, c.second - (x - c.first) - y});
	    cur ^= SG[c.second - (x - c.first) - y];
	}
}

void insert(int x) {
	for (int i = 0; i <= x; i++)	
		map[SG[i] ^ SG[x]][i + x] = {i, x};
}

void main() {
	std::cin >> n >> L >> R;
	
	for (int i = 0; i <= n; i++) 
		for (int j = 0; j <= n; j++)    
			mtd[i][j] = {-1, -1};
	for (int i = 0; i < L; i++) SG[i] = 0, insert(i);
	for (int i = L; i <= n; i++) {
		for (int j = 0; j <= n; j++) {
			int l = std::max(i - R, 0), r = std::max(i - L, l);
			auto it = map[j].lower_bound(l);
			if (it == map[j].end() || it -> first > r) {
				SG[i] = j;
				break;
			} 
			mtd[i][j] = it -> second;
		}
		insert(i);
	}
	
	s.insert({1, n}), cur = SG[n];
	if (SG[n]) std::cout << "First" << std::endl;
	else { 
		std::cout << "Second" << std::endl;
		int x, y;
		std::cin >> x >> y;
		doit(x, y);
	}
	
	while ("2500!"[0]) {
		std::pair<int, int> res = {-1, -1};
		int b = 0, l = 0;
		for (auto c : s) 
			if (mtd[c.second][SG[c.second] ^ cur] != std::make_pair(-1, -1)) 
				res = mtd[c.second][SG[c.second] ^ cur], l = c.second, b = c.first;
		int x = res.first + b, y = l - res.second - res.first;
		std::cout << x << ' ' << y << std::endl;
		doit(x, y);
		std::cin >> x >> y;
		if (x == 0 && y == 0) return;
		doit(x, y);
	}
}
```