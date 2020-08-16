using System;
using System.Threading.Tasks;
using BLL.Interfaces;
using CommonComponents.CommonModels;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

namespace BattleCityWeb.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IService<MessageDto> _messagesService;
        private readonly IHubContext<GameHub> _gameHubContext;

        public ChatHub(IService<MessageDto> messagesService,
            IHubContext<GameHub> gameHubContext)
        {
            _messagesService = messagesService;
            _gameHubContext = gameHubContext;
        }

        [Authorize]
        public async Task SendMessage(string message)
        {
            if (message.StartsWith("/"))
            {
                await ExecuteChatCommandAsync(message);
            }

            // TODO: use try-catch
            var addedMessage = await _messagesService.AddAsync(new MessageDto
            {
                CreationDate = DateTime.UtcNow,
                ApplicationUserId = Context.UserIdentifier,
                Text = message,
            });;

            await Clients.All.SendAsync("ReceiveMessage", addedMessage.User.NickName, addedMessage.Text, addedMessage.User.AvatarUrl);
        }

        public override async Task OnConnectedAsync()
        {
            if (Context.User.Identity.IsAuthenticated)
            {
                await Clients.All.SendAsync("NotifyOnConnection", $"{Context.User.Identity.Name} connected.");
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (Context.User.Identity.IsAuthenticated)
            {
                await Clients.All.SendAsync("NotifyOnConnection", $"{Context.User.Identity.Name} disconnected.");
            }

            await base.OnDisconnectedAsync(exception);
        }

        [Authorize]
        private async Task ExecuteChatCommandAsync(string command)
        {
            // todo: provide constants from appsettings
            if (command.ToLower().Contains("startbattle"))
            {
                await _gameHubContext.Clients.User(Context.UserIdentifier).SendAsync("InitiateGame");
            }
        }
    }
}
