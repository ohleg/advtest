using Newtonsoft.Json;
using System;

namespace MVCAdvPartner.Models
{
    public class MsgModel
    {
        public MsgModel()
        { }

        public MsgModel(string name, string message)
        {
            Name = name;
            Message = message;
            Time = DateTime.Now;
        }

        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("message")]
        public string Message { get; set; }
        [JsonProperty("time")]
        public DateTime Time { get; set; }
    }
}
