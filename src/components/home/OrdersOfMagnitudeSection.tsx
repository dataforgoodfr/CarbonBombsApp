const OrdersOfMagnitudeSection = () => (
  <div className='bg-gray-100 py-16'>
    <div className='container mx-auto px-4'>
      <div className='px-8'>
        <h2 className='text-2xl font-bold text-black'>Orders of magnitude</h2>
        <div className='relative mt-8'>
          <div
            className='slider-2 w-slider'
            data-autoplay='false'
            data-easing='ease'
            data-hide-arrows='false'
            data-disable-swipe='false'
            data-autoplay-limit='0'
            data-nav-spacing='3'
            data-duration='500'
            data-infinite='true'
            role='region'
            aria-label='carousel'
          >
            <div className='mask-2 w-slider-mask' id='w-slider-mask-0'>
              <div className='slide-2 w-slide' aria-label='1 of 2' role='group'>
                <div className='testimonial_component'>
                  <div className='div-block-2'>
                    <img
                      src='https://uploads-ssl.webflow.com/64206379a2bd1eb2474bc869/6452167059d1f81bcf660ca2_bomb%20(1).png'
                      loading='lazy'
                      width='200'
                      height='200'
                      alt=''
                      className='image-15'
                    />
                    <div className='text-block-5'>=</div>
                    <img
                      src='https://uploads-ssl.webflow.com/64206379a2bd1eb2474bc869/64519ea02f84b021a7a0c234_airplan.png'
                      loading='lazy'
                      width='200'
                      height='200'
                      alt=''
                      className='image-12'
                    />
                  </div>
                  <div className='div-block-4'>
                    <div className='text-block-6'>1 carbon bomb</div>
                    <div className='text-block-6'>
                      1.000.000.000 Paris-New York trips by plane
                    </div>
                  </div>
                </div>
                <div className='testimonial-text_component'>
                  <div className='testimonial_text'>
                    A carbon bomb emits over 1 billion tonnes of CO2 over its
                    lifetime.
                  </div>
                </div>
              </div>
              <div
                className='slide-2 w-slide'
                aria-label='2 of 2'
                role='group'
                aria-hidden='true'
              >
                <div className='testimonial_component' aria-hidden='true'>
                  <div
                    aria-hidden='true'
                    className='div-block-2'
                    aria-hidden='true'
                  >
                    <img
                      src='https://uploads-ssl.webflow.com/64206379a2bd1eb2474bc869/6452167059d1f81bcf660ca2_bomb%20(1).png'
                      loading='lazy'
                      width='200'
                      height='200'
                      alt=''
                      className='image-16'
                      aria-hidden='true'
                    />
                    <div className='text-block-5' aria-hidden='true'>
                      =
                    </div>
                    <img
                      src='https://uploads-ssl.webflow.com/64206379a2bd1eb2474bc869/64519f44c3fc40c4d1140d82_tree.png'
                      loading='lazy'
                      width='200'
                      height='200'
                      alt=''
                      className='image-14'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='div-block-4' aria-hidden='true'>
                    <div className='text-block-6' aria-hidden='true'>
                      1 carbon bomb
                    </div>
                    <div className='text-block-6' aria-hidden='true'>
                      1.7 forest devastated
                    </div>
                  </div>
                </div>
                <div className='testimonial-text_component' aria-hidden='true'>
                  <div className='testimonial_text' aria-hidden='true'>
                    A carbon bomb emits over 1 billion tonnes of CO2 over its
                    lifetime.
                  </div>
                </div>
              </div>
            </div>
            <div
              aria-live='off'
              aria-atomic='true'
              className='w-slider-aria-label'
              data-wf-ignore=''
            ></div>
          </div>
          <div
            className='left-arrow w-slider-arrow-left'
            role='button'
            tabIndex='0'
            aria-label='previous slide'
          >
            <div className='icon-3 w-icon-slider-left'></div>
          </div>
          <div
            className='right-arrow-2 w-slider-arrow-right'
            role='button'
            tabIndex='0'
            aria-label='next slide'
          >
            <div className='icon-2 w-icon-slider-right'></div>
          </div>
          <div className='slide-nav-2 w-slider-nav w-round'>
            <div
              className='w-slider-dot w-active'
              data-wf-ignore=''
              aria-label='Show slide 1 of 2'
              aria-pressed='true'
              role='button'
              tabIndex='0'
              style={{ marginLeft: '3px', marginRight: '3px' }}
            ></div>
            <div
              className='w-slider-dot'
              data-wf-ignore=''
              aria-label='Show slide 2 of 2'
              aria-pressed='false'
              role='button'
              tabIndex='-1'
              style={{ marginLeft: '3px', marginRight: '3px' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OrdersOfMagnitudeSection;
