const BanksSection = () => (
  <div className="py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src="https://uploads-ssl.webflow.com/64206379a2bd1eb2474bc869/642334d0d2e18d8670d46c78_Capture%20d%E2%80%99e%CC%81cran%202023-03-26%20a%CC%80%2016.37%202.png"
            className="w-full h-auto px-20"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <h2 className="text-2xl font-bold" id="banks">
              15 banks responsible for financing 240 projects
            </h2>
          </div>
          <p className="text-lg">
            Only 15 banks are responsible for the funding of 240 Carbon Bombs.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default BanksSection;
