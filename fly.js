var tracing=0,flying=0;
var tracex=new Array(),tracey=new Array(),mousex,mousey;
var travx=new Array(),travy=new Array(),trax=new Array(),tray=new Array();
function create_trace()
{
	document.getElementById("button_open_trace").style.display="none";
	document.getElementById("button_close_trace").style.display="inline";
	tracing=1;
	var newtra;
	for(var j=1;j<=3;j++)
	{
		for(var i=1;i<=6*j;i++)
		{
			newtra=document.createElement("div");
			document.getElementById("main").appendChild(newtra);
			newtra.id="tra"+j+"-"+i;
			newtra.style="position: absolute; background: #F00; height: 3px; width: 3px; z-index: 200;"
			newtra.style.left=(tracex[j]=mousex)-1.5-10*j*Math.sin(i*Math.PI/(3*j))+"px";
			newtra.style.top=(tracey[j]=mousey)-1.5-10*j*Math.cos(i*Math.PI/(3*j))+"px";
		}
	}
	mouse_trace();
	//setInterval("mouse_trace();",50);
}
function mouse_trace()
{
	if(tracing==0) return;
	for(var j=1;j<=3;j++)
	{
		tracex[j]=(mousex*(10-j)+tracex[j]*(90+j))/100;
		tracey[j]=(mousey*(10-j)+tracey[j]*(90+j))/100;
		for(var i=1;i<=6*j;i++)
		{
			document.getElementById("tra"+j+"-"+i).style.left=tracex[j]-1.5-10*j*Math.sin(i*Math.PI/(3*j))+"px";
			document.getElementById("tra"+j+"-"+i).style.top=tracey[j]-1.5-10*j*Math.cos(i*Math.PI/(3*j))+"px";
		}
	}
	setTimeout("mouse_trace()",10);
}
function delete_trace()
{
	tracing=0;
	for(var j=1;j<=3;j++) for(var i=1;i<=6*j;i++) document.getElementById("main").removeChild(document.getElementById("tra"+j+"-"+i));
	document.getElementById("button_open_trace").style.display="inline";
	document.getElementById("button_close_trace").style.display="none";
}
function create_fly()
			{
	document.getElementById("button_open_fly").style.display="none";
	document.getElementById("button_close_fly").style.display="inline";
	flying=1;
	var newtra;
	for(var i=1;i<=30;i++)
	{
		newtra=document.createElement("div");
		document.getElementById("main").appendChild(newtra);
		newtra.id="trab"+i;
					newtra.style="position: absolute; background: #088; height: 4px; width: 4px; border-radius: 5px; z-index: 200;"
		newtra.style.left=(trax[i]=mousex+50*Math.sin(i*Math.PI/15))-2+"px";
		newtra.style.top=(tray[i]=mousey+50*Math.cos(i*Math.PI/15))-2+"px";
		travx[i]=travy[i]=0;
	}
	mouse_fly();
}
function mouse_fly()
{
	if(flying==0) return;
	for(var i=1;i<=30;i++)
	{
		var a=30/(Math.pow((mousex-trax[i])/30,2)+Math.pow((mousey-tray[i])/30,2));
		if(Math.pow((mousex-trax[i])/10,2)+Math.pow((mousey-tray[i])/10,2)<75) a=0;
		travx[i]+=a*((mousex-trax[i])/10)/Math.sqrt(Math.pow((mousex-trax[i])/10,2)+Math.pow((mousey-tray[i])/10,2));
		travy[i]+=a*((mousey-tray[i])/10)/Math.sqrt(Math.pow((mousex-trax[i])/10,2)+Math.pow((mousey-tray[i])/10,2));
		for(var j=1;j<=30;j++)
		{
			if(j==i) continue;
			var b=0.01/(Math.pow((trax[i]-trax[j])/10,2)+Math.pow((tray[i]-tray[j])/10,2));
			if(Math.pow((trax[i]-trax[j])/10,2)+Math.pow((tray[i]-tray[j])/10,2)<10) b=0;
			travx[i]+=b*(-(trax[i]-trax[j])/10)/Math.sqrt(Math.pow((trax[i]-trax[j])/10,2)+Math.pow((tray[i]-tray[j])/10,2));
			travy[i]+=b*(-(tray[i]-tray[j])/10)/Math.sqrt(Math.pow((trax[i]-trax[j])/10,2)+Math.pow((tray[i]-tray[j])/10,2));
		}
		if(trax[i]<0 || trax[i]>document.body.clientWidth-10) travx[i]=-travx[i];
		if(trax[i]<0) trax[i]+=1;
		if(trax[i]>document.body.clientWidth-10) trax[i]-=1;
		if(tray[i]<0 || tray[i]>1050) travy[i]=-travy[i];//document.documentElement.clientHeight
		if(tray[i]<0) tray[i]+=1;
		if(tray[i]>1050) tray[i]-=1;
		trax[i]+=travx[i];
		tray[i]+=travy[i];
		if(Math.pow(travx[i],2)+Math.pow(travy[i],2)>10) travx[i]*=0.97,travy[i]*=0.97;
		document.getElementById("trab"+i).style.left=trax[i]-2+"px";
		document.getElementById("trab"+i).style.top=tray[i]-2+"px";
	}
	setTimeout("mouse_fly()",10);
}
function delete_fly()
{
	flying=0;
	//console.log();
	for(var i=1;i<=30;i++) document.getElementById("main").removeChild(document.getElementById("trab"+i));
	document.getElementById("button_open_fly").style.display="inline";
	document.getElementById("button_close_fly").style.display="none";
}