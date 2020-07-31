using CommonComponents.CommonModels;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IMessageService : IService<MessageDto>
    {
        Task<bool> UserHasUnreadedMessages(string userName);
    }
}
