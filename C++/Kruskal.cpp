#include <iostream>
#include <algorithm>
using namespace std;
struct edge
{
	int a,b;
	int wgt;
}e[1000010];
int f[100010],tot=0;
int n,m;
bool comp(edge x,edge y)
{
	return x.wgt<y.wgt;
}
void fadd(int a,int b,int c)
{
	e[++tot].a=a;
	e[tot].b=b;
	e[tot].wgt=c;
	return;
}
int fa(int a)
{
	return f[a]==a?a:f[a]=fa(f[a]);
}
int main()
{
	int a,b,c;
	cin>>n>>m;
	for(int i=1;i<=m;i++)
	{
		cin>>a>>b>>c;
		fadd(a,b,c);
	}
	sort(e+1,e+m+1,comp);
	int sum=0;
	for(int i=1;i<=n;i++) f[i]=i;
	int k=0;
	for(int i=1;i<=m && k<=n-2;i++)
	{
		int fx=fa(e[i].a),fy=fa(e[i].b);
		if(fx==fy) continue;
		f[fx]=fy;
		sum+=e[i].wgt;
		k++;
	}
	if(k<=n-2) cout<<"no solution"<<endl;
	else cout<<sum<<endl;
	return 0;
}
