using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Interfaces;
using CommonComponents.CommonModels;
using Microsoft.AspNetCore.Mvc;

namespace BattleCityWeb.Controllers
{
    public class ChatController : Controller
    {//TODO: separate chat, create an chat API.
        private readonly IService<MessageDto> _messagesService;

        public ChatController(IService<MessageDto> messagesService)
        {
            _messagesService = messagesService;
        }

        [HttpGet("{startIndex}/{messagesCount}")]
        public async Task<IEnumerable<MessageDto>> GetMessages(int startIndex = 0, int messagesCount = 10)
        {
            passa default varies and check if this realiz overriding
            // TODO: optimize LINQ queries.
            var messages = (await _messagesService.GetAllAsync())
                .SkipLast(startIndex)
                .TakeLast(messagesCount);

            return messages;
        }
    }
}