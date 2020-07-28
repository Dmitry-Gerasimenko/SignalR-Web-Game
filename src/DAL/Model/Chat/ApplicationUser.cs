using Microsoft.AspNetCore.Identity;
using System;

namespace DAL.Model.Chat
{
    public class ApplicationUser : IdentityUser
    {
        public string NickName { get; set; }

        public DateTime LastMessagesReadingTime { get; set; }
    }
}
