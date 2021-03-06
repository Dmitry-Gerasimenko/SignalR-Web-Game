﻿using AutoMapper;
using BattleCityWeb.GameServices;
using BLL.Interfaces;
using BLL.Utils;
using DAL.Context;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Scrutor;

namespace BattleCityWeb.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void ConfigureChatServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<CustomApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DbConnect")));

            services.AddAutoMapper(typeof(MapperProfile));

            // Repositories registration.
            services.Scan(scan =>
            {
                scan.FromAssembliesOf(typeof(IRepository<>))
                        .AddClasses(classes => classes.AssignableTo(typeof(IRepository<>)))
                            .AsImplementedInterfaces()
                            .WithTransientLifetime();
            });

            // Custom services registration.
            services.Scan(scan =>
            {
                scan.FromAssembliesOf(typeof(IService<>))
                        .AddClasses(classes => classes.AssignableTo(typeof(IUserService)))
                            .AsImplementedInterfaces()
                            .WithTransientLifetime()
                        .AddClasses(classes => classes.AssignableTo(typeof(IMessageService)))
                            .AsImplementedInterfaces()
                            .WithTransientLifetime()
                        .AddClasses(classes => classes.AssignableTo(typeof(IService<>)))
                            .UsingRegistrationStrategy(RegistrationStrategy.Skip)
                            .AsImplementedInterfaces()
                            .WithTransientLifetime();
            });
        }

        public static void ConfigureGameServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Custom services registration.
            services.Scan(scan =>
            {
                scan.FromAssembliesOf(typeof(IGameService))
                        .AddClasses(classes => classes.AssignableTo(typeof(IGameService)))
                            .AsImplementedInterfaces()
                            .WithTransientLifetime();
                        
            });
        }
    }
}
