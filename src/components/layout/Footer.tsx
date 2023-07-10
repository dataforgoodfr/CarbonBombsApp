const Footer = () => (
  <footer className='mt-10 border-t py-10 text-center'>
    {/* <div className="flex justify-center space-x-4">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
            </div> */}
    <div className='text-bold mb-4'>Data sources</div>
    <div className='w-full text-sm'>
      <div className='mb-2'>
        <a
          className='text-blue-700'
          href='https://globalenergymonitor.org/creative-commons-public-license/'
        >
          Global Oil and Gas Extraction Tracker, Global Energy Monitor
        </a>
        <span>, February 2023</span>
      </div>
      <div className='mb-2'>
        <a
          className='text-blue-700'
          href='https://globalenergymonitor.org/creative-commons-public-license/'
        >
          Global Coal Mine Tracker, Global Energy Monitor
        </a>
        <span>, April 2023 release</span>
      </div>
      <div className='mb-2'>
        <a
          className='text-blue-700'
          href='https://www.sciencedirect.com/science/article/pii/S0301421522001756'
        >
          "Carbon Bombs" - Mapping key fossil fuel projects, Kuhne and
          co-authors
        </a>
        <span>, 2022, Energy Policy</span>
      </div>
      <div className='mb-2'>
        <a
          className='text-blue-700'
          href='https://www.bankingonclimatechaos.org/'
        >
          Banking on Climate Chaos database
        </a>
        <span>, 2022</span>
      </div>
    </div>
    <p className='mt-4'>&copy; 2023 CarbonBombs.org - All rights reserved</p>
  </footer>
);

export default Footer;
