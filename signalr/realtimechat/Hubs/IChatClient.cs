using System.Threading.Tasks;

namespace realtimechat.Hubs
{
    public interface IChatClient
    {
        Task MessageReceiver(string user, string message);
    }
}
