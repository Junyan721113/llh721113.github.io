#include <iostream>
#include <queue>
#include <cstring>
using namespace std;
const int INF=1000000000;
struct edge
{
	int vex,wgt;
	int nxt;
}e[1000010];
int first[100010],tot;
bool inq[100010];
int n,m,st,dis[100010];
queue <int> q;
void fadd(int a,int b,int c)
{
	e[++tot].vex=b;
	e[tot].wgt=c;
	e[tot].nxt=first[a];
	first[a]=tot;
}
int main()
{
	int a,b,c;
	cin>>n>>m>>st;
	memset(first,-1,sizeof(first));
	for(int i=1;i<=m;i++)
	{
		cin>>a>>b>>c;
		fadd(a,b,c);
		//fadd(b,a,c);
	}
	for(int i=1;i<=n;i++) dis[i]=INF;
	q.push(st);
	inq[st]=true;
	dis[st]=0;
	while(!q.empty())
	{
		int u=q.front();
		q.pop();
		inq[u]=false;
		for(int i=first[u];i!=-1;i=e[i].nxt)
		{
			int v=e[i].vex;
			if(dis[v]>dis[u]+e[i].wgt)
			{
				dis[v]=dis[u]+e[i].wgt;
				if(!inq[v])
				{
					q.push(v);
					inq[v]=true;
				}
			}
		}
	}
	for(int i=1;i<=n;i++) cout<<dis[i]<<' ';
	cout<<endl;
	return 0;
}
