using DAL.Model.Chat;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL.Context
{
    public class CustomApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public CustomApplicationDbContext(DbContextOptions options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public virtual DbSet<Message> Messages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
