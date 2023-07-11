import BarChartTopBombs from '@/components/graphs/BarChartTopBombs';

const AnalyticsSection = () => (
  <div className='py-16'>
    <div className='container mx-auto px-4'>
      <div className='relative'>
        <BarChartTopBombs />
      </div>
      {/* <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        <div className='relative'>
          <BarChartTopBombs />
        </div>
      </div> */}
    </div>
  </div>
);

export default AnalyticsSection;
