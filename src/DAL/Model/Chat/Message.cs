using System;

namespace DAL.Model.Chat
{
    public class Message
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public DateTime CreationDate { get; set; }

        public ApplicationUser User { get; set; }

        public string ApplicationUserId { get; set; }
    }
}
