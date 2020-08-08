using System;
using System.Collections.Generic;
using BattleCityWeb.Models.GameModels;

namespace BattleCityWeb.GameServices
{
    public class GameService : IGameService
    {
        public const int CanvasBounds = 70;
        public const int BricksMapSize = 10;

        public int[,] GetInitalBrickMap()
        {
            var initialBrickMapArray = new int[BricksMapSize, BricksMapSize];
            var random = new Random();

            for (int i = 0; i < BricksMapSize; i++)
            {
                for (int j = 0; j < BricksMapSize; j++)
                {
                    initialBrickMapArray[i, j] = random.Next(0, 2);
                }
            }

            return initialBrickMapArray;
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
                        X = random.Next(CanvasBounds, canvasWidth - CanvasBounds),
                        Y = random.Next(CanvasBounds / 2, canvasHeight - CanvasBounds / 2),
                    },
                    TankId = userName + "Tank",
                });
            }

            return initialTanks;
        }
    }
}
