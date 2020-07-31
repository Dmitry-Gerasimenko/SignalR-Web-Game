using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Interfaces;
using CommonComponents.CommonModels;
using CommonComponents.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace BattleCityWeb.Controllers
{
    public class ChatController : Controller
    {//TODO: separate chat, create an chat API.
        private readonly IMessageService _messagesService;
        private readonly IOptions<ChatSettings> _chatSettings;

        public ChatController(IMessageService messagesService,
            IOptions<ChatSettings> chatSettings)
        {
            _messagesService = messagesService;
            _chatSettings = chatSettings;
        }

        [HttpGet]
        public async Task<IEnumerable<MessageDto>> GetMessages(int? messagesBatch)
        {
            var messages = (await _messagesService.GetAllAsync())
                .SkipLast(messagesBatch.GetValueOrDefault() * _chatSettings.Value.TakenMessagesCount)
                .TakeLast(_chatSettings.Value.TakenMessagesCount);

            return messages;
        }

        [HttpGet]
        public async Task<bool> CheckUnreadedMessages(string userName)
        {
            return await _messagesService.UserHasUnreadedMessages(userName);
        }
    }
}