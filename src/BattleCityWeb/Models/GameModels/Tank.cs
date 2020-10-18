namespace BattleCityWeb.Models.GameModels
{
    public class Tank
    {
        public string TankId { get; set; }

        public Position Position { get; set; }

        public TankDirection Direction { get; set; }
    }
}
