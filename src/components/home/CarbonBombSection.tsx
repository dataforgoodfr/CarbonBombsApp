import BarChartBudget from '@/components/graphs/BarChartBudget';

const CarbonBombSection = ({ bombsData }) => (
  <div className='py-16'>
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        <div className='relative'>
          <BarChartBudget bombsData={bombsData} />
          {/* <img
              src="https://uploads-ssl.webflow.com/64206379a2bd1eb2474bc869/642334e16b604aefe233d247_WhatsApp%20Image%202023-03-26%20at%2017.15%202.png"
              className="w-full h-auto px-40"
              alt=""
              loading="lazy"
            /> */}
        </div>
        <div className='flex flex-col justify-center'>
          <div className='mb-4'>
            <h2 className='text-2xl font-bold' id='carbon-budget'>
              425 carbon bombs over the globe are threatening our 1.5°C carbon
              budget
            </h2>
          </div>
          <p className='text-lg'>
            In order to limit global warming to +1.5°C compared to the
            pre-industrial era, the cumulated global emissions must not exceed
            420 to 580 gigatonnes of CO2.
            <br />
            <br />
            Yet, the cumulated emissions of the 425 carbon bombs amount to over
            1180 gigatonnes of CO2, which would exceed the global 1.5°C carbon
            budget by a factor of two.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default CarbonBombSection;
