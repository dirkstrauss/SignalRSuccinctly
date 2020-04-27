using System.Threading.Tasks;

namespace realtimechart.Hubs
{
    public interface IChartClient
    {
        Task ValueReceiver(double chartValue);
    }
}
