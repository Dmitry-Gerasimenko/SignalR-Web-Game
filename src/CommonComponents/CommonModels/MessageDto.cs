using System;

namespace CommonComponents.CommonModels
{
    public class MessageDto
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public DateTime CreationDate { get; set; }

        public ApplicationUserDto User { get; set; }

        public string ApplicationUserId { get; set; }
    }
}
