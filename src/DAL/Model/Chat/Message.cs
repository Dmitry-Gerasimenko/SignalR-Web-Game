using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Model.Chat
{
    public class Message
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public DateTime CreationDate { get; set; }

        public virtual ApplicationUser User { get; set; }

        [ForeignKey("Id")]
        public string ApplicationUserId { get; set; }
    }
}
