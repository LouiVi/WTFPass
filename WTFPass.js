cfg.Light, cfg.Portrait;

//var address = "https://m.wtfpass.com/videos/4555/hft025/";
var address = "https://m.wtfpass.com/models/mackenzie/";//https://m.wtfpass.com/categories/anal/";

//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )

	//Create a text label and add it to layout.
	//txt = app.CreateText( "Hello" )
	//txt.SetTextSize( 32 )
	web1 = app.CreateWebView( 1.0, 0.5, "IgnoreSSLErrors, IgnoreErrors" );
	lay.AddChild( web1 )
	web1.SetOnProgress( P1 );
	
	web2 = app.CreateWebView( 1.0, 0.5 )
	lay.AddChild( web2 )
	
	//Add layout to app.	
	app.AddLayout( lay )
	GetSiteContents();
}

function P1(progress)
{
	if(progress == 100) web1.Execute( app.ReadFile( "Web111.js" ), P1cb );
}

function P1cb(result)
{
	//alert(result);
	var cif = "<script src='file:///android_asset/app.js'></script>";// "<script src='file:///android_asset/app.js'></script><script>/*function UpdateWeb() {app.Execute( \"web1.LoadHtml(rt);\" );}; */function createIF(id) { var vid = id.split('/')[4]; var rt = '<iframe width=\"320\" height=\"200\" src=\"https://m.wtfpass.com/embed/VIDEO\" frameborder=\"0\" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>'.replace(\"VIDEO\", vid); document.body.innerHTML += rt; }</script>";
	web2.LoadHtml( cif + result );
	app.SetClipboardText( cif + result );
	//web1.Execute( app.ReadFile( "Web111.js" ), P1cb );
}

function GetSiteContents()
{
	app.HttpRequest( "GET", address, null, null, handleReply );
}


function handleReply( error, reply )
{
    if( error ) alert( "Error: " + reply );
    else
    {
        var title = reply.slice( reply.indexOf("<title>") + 7, reply.indexOf("</title>") );
        app.ShowPopup( title );
        //txt.SetText( title );
        reply = reply.replace("</head>", "<script src='file:///android_asset/app.js'></script></head>");
        reply = reply.replace("</HEAD>", "<script src='file:///android_asset/app.js'></script></HEAD>");
        web1.LoadHtml(reply);//, address );
        //alert(reply);
        //app.SetClipboardText( reply );
    }
}