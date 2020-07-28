using AutoMapper;
using CommonComponents.CommonModels;
using DAL.Model.Chat;

namespace BLL.Utils
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<ApplicationUser, ApplicationUserDto>().ReverseMap();
            CreateMap<Message, MessageDto>().ReverseMap();
        }
    }
}
