using API.Models;
using Microsoft.EntityFrameworkCore.Storage;

namespace API._Repositories
{
    public interface IRepositoryAccessor
    {
        IRepository<Roles> Roles { get; }
        IRepository<Users> Users {get;}
        IRepository<RoleUser> RoleUser {get;}

        Task<bool> Save();
        Task<IDbContextTransaction> BeginTransactionAsync();
    }
}