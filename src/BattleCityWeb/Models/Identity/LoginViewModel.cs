using System.ComponentModel.DataAnnotations;

namespace BattleCityWeb.Models.Identity
{
    public class LoginViewModel
    {
        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Nick name")]
        public string Login { get; set; }

        [Required(AllowEmptyStrings = false)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
