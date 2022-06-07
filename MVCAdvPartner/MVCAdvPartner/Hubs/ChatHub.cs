using Microsoft.AspNet.SignalR;
using MVCAdvPartner.Models;
using MVCAdvPartner.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MVCAdvPartner.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IChatRepository _chatRepository;

        public ChatHub()
        {
            _chatRepository = new ChatRepository();
        }

        public override Task OnConnected()
        {
            _chatRepository.ConnectAsync(Context.ConnectionId);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            _chatRepository.DisconnectAsync(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }

        public async Task SendMessage(string name, string message)
        {
            await _chatRepository.SaveMessageAsync(name, message);
            await Clients.AllExcept(new String[] { Context.ConnectionId }).receiveMessage(name, message);
        }

        public async Task SetName(string name)
        {
            await _chatRepository.SetNameAsync(Context.ConnectionId, name);
        }

        public async Task<IEnumerable<MsgModel>> GetMessageHistory()
        {
            return await _chatRepository.GetMessageHistoryAsync();
        }

        public async Task<bool> IsExistName(string name)
        {
            return await _chatRepository.IsExistNameAsync(name);
        }
    }
}
