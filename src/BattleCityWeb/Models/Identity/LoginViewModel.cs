using System.ComponentModel.DataAnnotations;

namespace BattleCityWeb.Models.Identity
{
    public class LoginViewModel
    {
        [Required(AllowEmptyStrings = false)]
        public string Login { get; set; }

        [Required(AllowEmptyStrings = false)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
