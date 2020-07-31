using BattleCityWeb.Models.Identity;
using BLL.Interfaces;
using CommonComponents.Settings;
using DAL.Model.Chat;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

namespace BattleCityWeb.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserService _userService;
        private readonly IOptions<IdentitySettings> _identitySettings;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(IUserService userService,
            IOptions<IdentitySettings> identitySettings,
            SignInManager<ApplicationUser> signInManager)
        {
            _userService = userService;
            _identitySettings = identitySettings;
            _signInManager = signInManager;

        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Register() => View();

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = new ApplicationUser
            {
                Email = _identitySettings.Value.DefaultMockUsersEmail,
                NickName = model.NickName,
                UserName = model.NickName,
                AvatarUrl = GenerateAvatarUrl(model.NickName),
            };

            var result = await _userService.CreateUserAsync(user, model.Password);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, true);
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
            else
            {
                AddErrors(result);
            }

            return View(model);
        }


        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login(string returnUrl)
        {
            ViewBag.returnUrl = returnUrl;

            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Login, model.Password, true, false);
                if (result.Succeeded)
                {
                    if (string.IsNullOrEmpty(returnUrl))
                    {
                        return RedirectToAction(nameof(HomeController.Index), "Home");
                    }

                    return Redirect(returnUrl);
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Failed login attempt. Please check your credentials.");
                }
            }

            ViewBag.returnUrl = returnUrl;
            return View(model);
        }


        [HttpPatch]
        public async Task<IActionResult> PatchUserMessagesReadingTime(string userName)
        {
            await _userService.UpdateMessagesReadingTimeAsync(userName, DateTime.UtcNow);

            return Ok();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return RedirectToAction(nameof(HomeController.Index), "Home");
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private string GenerateAvatarUrl(string userName)
        {
            if (userName.ToLower().Contains("dima"))
            {
                return "/img/ab5.png";
            }

            return $"/img/ab{new Random().Next(1, 5)}.png";
        }
    }
}
