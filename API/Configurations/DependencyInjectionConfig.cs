using API._Repositories;
using SD3_API.Helpers.Utilities;

namespace API.Configurations
{
    public static class DependencyInjectionConfig
    {
        public static void AddDependencyInjectionConfiguration(this IServiceCollection services)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));

            // Add RepositoryAccessor
            services.AddScoped<IRepositoryAccessor, RepositoryAccessor>();

            // Add Service
            services.AddScoped<IFunctionUtility, FunctionUtility>();
            services.AddScoped<IExcelUtility, ExcelUtility>();

        }
    }
}