using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using BattleCityWeb.GameServices;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

namespace BattleCityWeb.Hubs
{
    public class GameHub : Hub
    {
        private readonly IGameService _gameService;
        private readonly static Dictionary<string, string> _activePlayers = new Dictionary<string, string>();

        public GameHub(IGameService gameService)
        {
            _gameService = gameService;
        }

        [Authorize]
        public async Task InitGameObjects(int canvasWidth, int canvasHeight)
        {
            var usersList = _activePlayers.Select(p => p.Value);

            await Clients.All.SendAsync("InitGameObjects", _gameService.GetInitialTanks(usersList, canvasWidth, canvasHeight));
        }

        public async Task HandleClientKeyDown(string userName, int keyCode)
        {
            await Clients.All.SendAsync("ReceiveHandledKeyDown", userName + "Tank", keyCode);
        }

        public async Task HandleClientKeyUp(string userName, int keyCode)
        {
            await Clients.All.SendAsync("ReceiveHandledKeyUp", userName + "Tank", keyCode);
        }

        public async Task HandleClientMouseDown(string userName, int clientX, int clientY)
        {
            await Clients.All.SendAsync("ReceiveHandledMouseDown", userName + "Tank", clientX, clientY);
        }

        public override async Task OnConnectedAsync()
        {
            if (Context.User.Identity.IsAuthenticated)
            {
                _activePlayers.Add(Context.ConnectionId, Context.User.Identity.Name);
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (Context.User.Identity.IsAuthenticated)
            {
                _activePlayers.Remove(Context.ConnectionId);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
