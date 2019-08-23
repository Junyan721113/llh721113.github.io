#include <iostream>
#include <cstring>
using namespace std;
const int INF=1000000000;
struct edge
{
	int vex,wgt;
	int nxt;
}e[1000010];
int first[100010],dis[100010];
bool vis[100010];
int tot,n,m,st;
void fadd(int a,int b,int c)
{
	e[++tot].vex=b;
	e[tot].wgt=c;
	e[tot].nxt=first[a];
	first[a]=tot;
	return;
}
int main()
{
	int a,b,c;
	cin>>n>>m;
	cin>>st;
	memset(first,-1,sizeof(first));
	for(int i=1;i<=m;i++)
	{
		cin>>a>>b>>c;
		fadd(a,b,c);
		fadd(b,a,c);
	}
	memset(vis,false,sizeof(vis));
	for(int i=1;i<=n;i++) dis[i]=INF;
	dis[st]=0;
	int minn,k;
	for(int i=1;i<=n;i++)
	{
		minn=INF;
		for(int j=1;j<=n;j++) if(!vis[j] && minn>dis[j]) {minn=dis[j];k=j;}
		vis[k]=true;
		for(int j=first[k];j!=-1;j=e[j].nxt) if(!vis[e[j].vex] && dis[e[j].vex]>dis[k]+e[j].wgt) dis[e[j].vex]=dis[k]+e[j].wgt;
	}
	for(int i=1;i<=n;i++) cout<<dis[i]<<' ';
	cout<<endl;
	return 0;
}
