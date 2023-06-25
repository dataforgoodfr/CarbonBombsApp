import BarChartTotalEmissions from '@/components/graphs/BarChartTotalEmissions';

const TimeToActSection = ({ bombsData }) => (
  <div className='py-16'>
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        <div className='flex flex-col justify-center'>
          <div className='mb-4'>
            <h2 className='text-2xl font-bold' id='time-to-act'>
              It is still time to act
            </h2>
          </div>
          <p className='text-lg'>
            40% of the 425 carbon bombs had not started extraction in 2020.
            Those 169 projects amount to one third of the carbon bombs’
            cumulated emissions. It is still time to act in order to cancel
            them. There is also a way to limit the cumulated emissions of the
            256 existing carbon bombs: stopping any further investments they
            could receive, in order to put them into a pathway of natural
            decline of their oil, gas, and coal outputs.
          </p>
        </div>
        <div className='relative'>
          {/* <img
              src="https://uploads-ssl.webflow.com/64206379a2bd1eb2474bc869/64237250cd6ed9391d054996_WhatsApp%20Image%202023-03-28%20at%2021.39.22.jpeg"
              className="w-full h-auto px-40"
              alt=""
              loading="lazy"
            /> */}
          <BarChartTotalEmissions bombsData={bombsData} />
        </div>
      </div>
    </div>
  </div>
);

export default TimeToActSection;
