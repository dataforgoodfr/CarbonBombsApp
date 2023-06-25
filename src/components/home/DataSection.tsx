const DataSection = () => (
  <div className='bg-gray-100 py-16'>
    <div className='container mx-auto px-4'>
      <div className='px-8'>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold'>Play with data</h2>
          <div>Our data is yours, please spread the message!</div>
        </div>
        <div className='mb-8'>
          <h4 className='text-lg font-bold' id='map'>
            Mapping carbon bombs worldwide
          </h4>
          <div
            className='tableauPlaceholder'
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '75%',
            }}
          >
            <iframe
              src='https://public.tableau.com/shared/7NRB8853X?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableau.com%2F&:embed_code_version=3&:toolbar=yes&:animate_transition=yes&:display_static_image=no&:display_spinner=no&:display_overlay=yes&:display_count=yes&:language=fr-FR&publish=yes&:loadOrderID=0'
              className='tableauViz absolute inset-0 h-full w-full'
              style={{ border: 'none' }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className='mb-8'>
          <h4 className='text-lg font-bold' id='data'>
            Most important carbon bombs
          </h4>
          <div
            className='tableauPlaceholder'
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '75%',
            }}
          >
            <iframe
              src='https://public.tableau.com/views/Lesbombescarbonesquiontleplusdmissions/Lesbombescarbonesquiontleplusdmissions?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableau.com%2F&:embed_code_version=3&:tabs=no&:toolbar=yes&:animate_transition=yes&:display_static_image=no&:display_spinner=no&:display_overlay=yes&:display_count=yes&:language=fr-FR&publish=yes&:loadOrderID=1'
              className='tableauViz absolute inset-0 h-full w-full'
              style={{ border: 'none' }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div>
          <h4 className='text-lg font-bold'>
            Companies with the highest emissions
          </h4>
          <div
            className='tableauPlaceholder'
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '75%',
            }}
          >
            <iframe
              src='https://public.tableau.com/views/Lesentreprisesquiontleplusdmissionsassocies/Entreprisesquiontleplusdeprojets?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableau.com%2F&:embed_code_version=3&:tabs=no&:toolbar=yes&:animate_transition=yes&:display_static_image=no&:display_spinner=no&:display_overlay=yes&:display_count=yes&:language=fr-FR&publish=yes&:loadOrderID=2'
              className='tableauViz absolute inset-0 h-full w-full'
              style={{ border: 'none' }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DataSection;
