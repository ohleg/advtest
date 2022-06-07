using MVCAdvPartner.Models;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MVCAdvPartner.Repositories
{
    public class ChatRepository : IChatRepository
    {
        private static readonly ConcurrentBag<MsgModel> _history = new ConcurrentBag<MsgModel>();
        private static readonly ConcurrentDictionary<string, string> _users = new ConcurrentDictionary<string, string>();

        public async Task<bool> IsExistNameAsync(string name)
        {
            return await Task.FromResult(_users.Values.Contains(name));
        }

        public async Task<IEnumerable<MsgModel>> GetMessageHistoryAsync()
        {
            return await Task.FromResult(_history.OrderBy(msg => msg.Time));
        }

        public async Task SaveMessageAsync(string name, string message)
        {
            _history.Add(new MsgModel(name, message));
            await Task.CompletedTask;
        }

        public async Task ConnectAsync(string userId)
        {
            _users.TryAdd(userId, "");
            await Task.CompletedTask;
        }

        public async Task SetNameAsync(string userId, string name)
        {
            _users.AddOrUpdate(userId, name, (k, v) => name);
            await Task.CompletedTask;
        }

        public async Task DisconnectAsync(string userId)
        {
            _users.TryRemove(userId, out string name);
            await Task.CompletedTask;
        }
    }
}
