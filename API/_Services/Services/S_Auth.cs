using AgileObjects.AgileMapper;
using API._Repositories;
using API._Services.Interfaces;
using API.Dtos.Auth;
using API.Helper.Mappers;
using API.Helper.Params.Auth;
using Microsoft.EntityFrameworkCore;

namespace API._Services.Services
{
    public class S_Auth : I_Auth
    {
        private readonly IRepositoryAccessor _repoAccessor;
        public S_Auth(IRepositoryAccessor repoAccessor)
        {
            _repoAccessor = repoAccessor;
        }
        public async Task<UserForLoggedDTO> Login(UserLoginParam userForLogin)
        {
            var user = await _repoAccessor.Users.FirstOrDefaultAsync(x => x.account.Trim() == userForLogin.Username.Trim() && x.is_active);

            // Kiểm tra sự tồn tại của user
            if (user == null)
            {
                return null;
            }

            // Nếu tồn tại user => Check password
            if (user.password != userForLogin.Password)
            {
                return null;
            }

            var roleUsers = _repoAccessor.RoleUser.FindAll(x => x.user_account.Trim() == user.account.Trim());
            var roles = _repoAccessor.Roles.FindAll().OrderBy(x => x.role_sequence);

            var mapper = Mapper.CreateNew();
            mapper.WhenMapping.UseConfigurations.From<MapperConfig>();

            var roleForUser = await roleUsers.Join(
                roles,
                x => x.role_unique,
                y => y.role_unique,
                (x, y) => y).ProjectUsing(mapper).To<RoleInfomation>().ToListAsync();

            var result = new UserForLoggedDTO
            {
                Id = user.account,
                Email = user.email,
                Username = user.account,
                Name = user.name,
                Roles = roleForUser.OrderBy(x => x.Position).ToList(),
                RoleAll = await roles.ProjectUsing(mapper).To<RoleInfomation>().ToListAsync()
            };

            return result;
        }
    }
}