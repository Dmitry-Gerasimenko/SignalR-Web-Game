using Microsoft.AspNetCore.Identity;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DAL.Model.Chat
{
    public class ApplicationUser : IdentityUser
    {
        public string NickName { get; set; }

        public DateTime LastMessagesReadingTime { get; set; }
    }
}
