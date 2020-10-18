using BattleCityWeb.Models.GameModels;
using System.Collections.Generic;

namespace BattleCityWeb.GameServices
{
    public interface IGameService
    {
        IEnumerable<Tank> GetInitialTanks(IEnumerable<string> connectedUsers, int canvasWidth, int canvasHeight);

        int[][] GetInitalBrickMap();
    }
}
