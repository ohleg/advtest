using MVCAdvPartner.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MVCAdvPartner.Repositories
{
    public interface IChatRepository
    {
        Task ConnectAsync(string userId);
        Task SetNameAsync(string userId, string name);
        Task DisconnectAsync(string userId);
        Task<bool> IsExistNameAsync(string name);
        Task SaveMessageAsync(string name, string message);
        Task<IEnumerable<MsgModel>> GetMessageHistoryAsync();
    }
}
