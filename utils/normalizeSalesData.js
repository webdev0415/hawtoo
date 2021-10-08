export default function getSalesData(options) {
    return [
        {
            title: 'Floor Price',
            field: 'floor_price',
            suffix: 'ETH',
            prefix: 'Ξ',
            color: 'text-violet-400'
        },
        {
            title: 'Market Cap',
            field: 'market_cap',
            suffix: 'ETH',
            prefix: 'Ξ',
            color: 'text-orange-500'
        },
        {
            title: '24 hour volume',
            field: 'one_day_volume',
            suffix: 'ETH',
            prefix: 'Ξ',
            color: 'text-blue-400'
        },
        {
            title: '7-day avg. Price',
            field: 'seven_day_average_price',
            suffix: 'ETH',
            prefix: 'Ξ',
            color: 'text-gray-900'
        },
        {
            title: '30-day avg. Price',
            field: 'thirty_day_average_price',
            suffix: 'ETH',
            prefix: 'Ξ',
            color: 'text-gray-900'
        },
        {
            title: 'Monthly price trend',
            field: 'thirty_day_average_price',
            suffix: 'ETH',
            prefix: 'Ξ',
            color: 'text-yellow-500'
        },
        {
            title: 'Total owners',
            field: 'num_owners',
            suffix: '',
            prefix: '',
            color: 'text-red-600'
        },
        {
            title: 'NFTs in collection',
            field: 'count',
            suffix: '',
            prefix: '',
            color: 'text-gray-900'
        },
        {
            title: 'Total sales',
            field: 'total_sales',
            suffix: '',
            prefix: '',
            color: 'text-red-600'
        }
    ]
}