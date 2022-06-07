using Owin;
using Microsoft.Owin;
using System.Web.Routing;

[assembly: OwinStartup(typeof(MVCAdvPartner.Startup))]
namespace MVCAdvPartner
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}