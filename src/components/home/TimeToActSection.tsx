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
            Fatih Birol, executive director of the International Energy Agency (IEA): “If governments are serious about the climate crisis, there can be no new investments in oil, gas and coal, from now – from this year (2021)”
            <ul className="list-disc list-outside mt-5">
              <li>Cancel all carbon bombs which had not started extraction in 2020 (169 out of 425). Those projects amount to 40% of all carbon bombs and one-third of the carbon bombs’ cumulated emissions.</li>
              <li>Gradually phase out the 60% of projects that are currently operating to meet the Paris Agreement Climate objectives.</li>
            </ul>
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
