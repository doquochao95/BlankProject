using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API._Services.Interfaces;
using API.Helper.Params.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SDCores;

namespace API.Controllers.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly I_Auth _iAuth;

        public AuthController(IConfiguration configuration,
                                I_Auth iAuth)
        {
            _configuration = configuration;
            _iAuth = iAuth;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginParam param)
        {
            var userForLogin = await _iAuth.Login(param);
            if (userForLogin == null)
                return Unauthorized();
            return Ok(new
            {
                token = JwtUtility<JwtUserDto>.GenerateJwtToken(userForLogin.Username, userForLogin.Name),
                user = userForLogin
            });
        }
    }
}