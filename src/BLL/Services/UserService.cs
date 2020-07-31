using BLL.Interfaces;
using DAL.Model.Chat;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IdentityResult> AddClaimsAsync(ApplicationUser user, IEnumerable<Claim> claims)
        {
            return await _userManager.AddClaimsAsync(user, claims);
        }

        public async Task<IdentityResult> CreateUserAsync(ApplicationUser user, string password)
        {
            return await _userManager.CreateAsync(user, password);
        }

        public async Task<IEnumerable<string>> GetRoleNamesForUserAsync(string userName)
        {
            var user = await _userManager.FindByIdAsync(userName);
            var roleClaims = await _userManager?.GetClaimsAsync(user);

            List<string> userRoleNames = roleClaims? // ?
                .Where(cl => cl.Type == ClaimTypes.Role)
                .Select(cl => cl.Value)
                .ToList();

            return userRoleNames;
        }

        public async Task<ApplicationUser> GetUserByIdAsync(string userId)
        {
            return await _userManager.FindByIdAsync(userId);
        }

        public IEnumerable<ApplicationUser> GetUsersAsync()
        {
            return _userManager.Users.ToList();
        }

        public async Task<ApplicationUser> GetUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<IEnumerable<Claim>> GetUserClaimsAsync(ApplicationUser user)
        {
            return await _userManager.GetClaimsAsync(user);
        }

        public async Task UpdateMessagesReadingTimeAsync(string userName, DateTime newReadingTime)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if (user is null)
            {
                return;
            }

            user.LastMessagesReadingTime = newReadingTime;

            await _userManager.UpdateAsync(user);
        }
    }
}
