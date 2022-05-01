using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace TaskManager.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskManagerController : ControllerBase
    {
        public static List<Models.TaskManager> TaskList = new List<Models.TaskManager>();
        
        [HttpPost("savetask")]
        public IActionResult SaveTask([FromForm] int id, [FromForm] string taskName, [FromForm] string taskDate)
        {
            var responseMessage = "";
            if (id.Equals(0))
            {
                Models.TaskManager taskManager = new Models.TaskManager
                {
                    Id = TaskList.Count + 1,
                    TaskName = taskName,
                    TaskDate = taskDate
                };
                TaskList.Add(taskManager);
                responseMessage = "Successfully saved your task...";
            }
            else
            {
                TaskList.ForEach(p =>
                {
                    if(p.Id.Equals(id))
                    {
                        p.TaskName = taskName;
                        p.TaskDate = taskDate;
                    };
                });
                responseMessage = "Successfully updated your task...";
            }
            
            return Ok(new { message = responseMessage });
        }

        [HttpPost("gettasklist")]
        public ActionResult<List<Models.TaskManager>> GetTaskList()
        {
            return Ok(TaskList);
        }

        [HttpPost("gettask")]
        public ActionResult<Models.TaskManager> GetTask([FromForm] int id)
        {
            var result = TaskList.Where(p => p.Id.Equals(id)).FirstOrDefault();
            return Ok(result);
        }

        [HttpPost("deletetask")]
        public ActionResult<Models.TaskManager> DeleteTask([FromForm] int id)
        {
            var result = TaskList.Where(p => p.Id.Equals(id)).FirstOrDefault();
            TaskList.Remove(result);
            return Ok(new { message = "Successfully deleted your task..." });
        }

    }
}