using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace BattleCityWeb.Hubs
{
    public class UsersHub : Hub
    {
        private static int clientsCounter = 0;
        private static int authorizedClientsCounter = 0;

        public override async Task OnConnectedAsync()
        {
            if (Context.User.Identity.IsAuthenticated)
            {
                authorizedClientsCounter++;
            }

            clientsCounter++;

            await Clients.All.SendAsync("NotifyClientsCounter", clientsCounter, authorizedClientsCounter);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (Context.User.Identity.IsAuthenticated)
            {
                authorizedClientsCounter--;
            }

            clientsCounter--;

            await Clients.All.SendAsync("NotifyClientsCounter", clientsCounter, authorizedClientsCounter);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
