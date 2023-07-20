using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore.Storage;

namespace API._Repositories
{
    public class RepositoryAccessor : IRepositoryAccessor
    {
        private DBContext _dbContext;
        public RepositoryAccessor(DBContext dbContext)
        {
            _dbContext = dbContext;
            Roles = new Repository<Roles>(_dbContext);
            Users = new Repository<Users>(_dbContext);
            RoleUser = new Repository<RoleUser>(_dbContext);
        }
        public IRepository<Roles> Roles { get; set; }
        public IRepository<Users> Users { get; set; }
        public IRepository<RoleUser> RoleUser { get; set; }

        public async Task<bool> Save()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            return await _dbContext.Database.BeginTransactionAsync();
        }
    }
}