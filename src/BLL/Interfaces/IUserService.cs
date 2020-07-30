using DAL.Model.Chat;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IUserService
    {
        Task<IdentityResult> CreateUserAsync(ApplicationUser user, string password);

        IEnumerable<ApplicationUser> GetUsersAsync();

        Task<ApplicationUser> GetUserByIdAsync(string userId);

        Task<ApplicationUser> GetUserByEmailAsync(string email);

        Task<IEnumerable<string>> GetRoleNamesForUserAsync(string userName);

        Task<IdentityResult> AddClaimsAsync(ApplicationUser user, IEnumerable<Claim> claims);

        Task<IEnumerable<Claim>> GetUserClaimsAsync(ApplicationUser user);
    }
}
