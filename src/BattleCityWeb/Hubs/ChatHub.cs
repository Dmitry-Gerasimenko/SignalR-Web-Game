using System;
using System.Threading.Tasks;
using BLL.Interfaces;
using Microsoft.AspNetCore.SignalR;
using CommonComponents.CommonModels;
using Microsoft.AspNetCore.Authorization;

namespace BattleCityWeb.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IService<MessageDto> _messagesService;

        public ChatHub(IService<MessageDto> messagesService)
        {
            _messagesService = messagesService;
        }

        [Authorize]
        public async Task SendMessage(string message)
        {
            // TODO: use try-catch
            var addedMessage = await _messagesService.AddAsync(new MessageDto
            {
                CreationDate = DateTime.UtcNow,
                ApplicationUserId = Context.UserIdentifier,
                Text = message,
            });;

            await Clients.All.SendAsync("ReceiveMessage", addedMessage.User.NickName, addedMessage.Text);
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
    }
}
