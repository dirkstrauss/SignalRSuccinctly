using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace realtimechart.Hubs
{
    public class ChartHub : Hub<IChartClient>
    {
        public async Task ValueSender(double chartValue)
        {
            await Clients.All.ValueReceiver(chartValue);
        }
    }
}
