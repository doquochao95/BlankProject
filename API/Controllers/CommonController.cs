using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class CommonController : APIController
    {
        private readonly IConfiguration _configuration;
        private string factory;
        private string factory_code;
        public CommonController(IConfiguration configuration) {
            _configuration = configuration;
            factory = _configuration.GetSection("AppSettings:Factory").Value;
            factory_code = _configuration.GetSection("AppSettings:Factory_Code").Value;
        }

        [HttpGet("GetFactory")]
        public IActionResult GetFactory() {
            var result = new {
                factory = factory,
                factory_code = factory_code
            };
            return Ok(result);
        }
    }
}