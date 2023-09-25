using API.Models;
using Microsoft.EntityFrameworkCore.Storage;
using SDCores;

namespace API._Repositories
{
    [DependencyInjection(ServiceLifetime.Scoped)]
    public interface IRepositoryAccessor
    {
        IRepository<Roles> Roles { get; }
        IRepository<Users> Users {get;}
        IRepository<RoleUser> RoleUser {get;}

        Task<bool> Save();
        Task<IDbContextTransaction> BeginTransactionAsync();
    }
}