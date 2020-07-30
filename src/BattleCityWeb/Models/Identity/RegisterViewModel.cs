using System.ComponentModel.DataAnnotations;

namespace BattleCityWeb.Models.Identity
{
    public class RegisterViewModel
    {
        [Required(AllowEmptyStrings = false)]
        public string NickName { get; set; }

        [Required(AllowEmptyStrings = false)]
        [EmailAddress]
        public string Email { get; set; }

        [Required(AllowEmptyStrings = false)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Compare(nameof(Password), ErrorMessage = "The passwords you entered don't match")]
        [Display(Name = "Please repeat the password")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
    }
}
