using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BattleCityWeb.Models.GameModels;

namespace BattleCityWeb.GameServices
{
    public class GameService : IGameService
    {
       public const int canvasBounds = 50;

        public IEnumerable<Block> GetInitalBlocks()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Tank> GetInitialTanks(IEnumerable<string> connectedUsers, int canvasWidth, int canvasHeight)
        {
            var random = new Random();
            var dirCount = Enum.GetValues(typeof(TankDirection)).Length;

            var initialTanks = new List<Tank>();
            foreach (string userName in connectedUsers)
            {
                initialTanks.Add(new Tank
                {
                    Direction = (TankDirection)random.Next(0, dirCount),
                    Position = new Position
                    {
                        X = random.Next(canvasBounds, canvasWidth - canvasBounds),
                        Y = random.Next(canvasBounds / 2, canvasHeight - canvasBounds / 2),
                    },
                    TankId = userName + "Tank",
                });
            }

            return initialTanks;
        }
    }
}
