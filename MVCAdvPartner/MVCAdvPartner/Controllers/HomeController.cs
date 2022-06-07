using System.Web.Mvc;

namespace MVCAdvPartner.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index() => View();

        [Route("~/chat")]
        public ActionResult Chat() => View();

        [Route("~/todolist")]
        public ActionResult ToDoList() => View();

        [Route("~/pageproof")]
        public ActionResult PageProof() => View();
    }
}