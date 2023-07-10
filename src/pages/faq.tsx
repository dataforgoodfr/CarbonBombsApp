import { useState } from 'react';
import Plus from '~/svg/plus.svg';
import Minus from '~/svg/minus.svg';
import { uniq, without } from 'lodash';

const FAQ_ITEMS = [
  {
    question: 'Why should we keep global warming below 1,5°C?',
    answer: (
      <div>
        This goal was set to limit the risks to which people, places and the
        economy are exposed because of climate change. It is a trade-off between
        costs and benefits associated with the actions that need to be taken to
        achieve this goal (IPCC, Assessment Report 6) <br />
        <br /> Exceeding the 1.5°C target can lead to severe risks and
        irreversible impacts on many natural and human systems, including loss
        of human life due to heat, glacier melt and loss of coral reefs.
        Negative impacts are projected to become widespread and severe with
        reduced food production, adverse economic impacts, increased inequality
        and poverty, biodiversity loss, and increased human morbidity and
        mortality. Even moderate changes in the global temperature can mean
        substantial increases in risks for more than 3 billion people, exposed
        to high levels of vulnerability (IPCC, Assessment Report 6).
      </div>
    ),
  },
  {
    question: 'What should we do to transition from fossil fuels?',
    answer: (
      <div>
        Multiple energy supply options are available to reduce emissions over
        the next decade, including reducing production and consumption, but also
        shifting the global energy mix toward cleaner energies (ex. nuclear
        power, hydropower, solar PV and wind, bioenergy), and to some extent
        carbon capture. Light industry and manufacturing can be largely
        decarbonized by switching to these low-GHG energy sources.
        <br />
        <br /> Transitioning to renewable energy would reduce reliance on wood
        fuel and coal, especially in urban areas, with co-benefits including
        reduced deforestation, desertification, fire risk, and improved indoor
        air quality, local development, and agricultural yield. <br />
        <br /> Phasing out fossil fuels from energy systems is technically
        possible and is estimated to be relatively low in cost (IPCC, Assessment
        Report 6)
      </div>
    ),
  },
  {
    question: 'How can carbon bombs be defused?',
    answer: (
      <div>
        According to Kjell Kühne (“Carbon Bombs” - Mapping key fossil fuel
        projects), setting a ban on new carbon bomb projects could avoid about a
        third of potential emissions from carbon bombs. <br />
        <br /> A global ban could eliminate a significant number of carbon
        bombs, however, some corporations and governments have tangible
        interests in sticking to these projects. Therefore, especially
        vulnerable countries need support to break this dependence. <br />
        <br />
        Non-governmental actors such as activists began trying to defuse some
        carbon bombs, however, a serious discussion needs to start between major
        fossil fuel-producing countries, starting by identifying as a priority
        those that can be defused easily. Coal carbon bombs would probably be
        first.{' '}
        <a
          className='text-blue-500'
          href='https://www.iea.org/reports/driving-down-methane-leaks-from-the-oil-and-gas-industry'
        >
          According to the IEA
        </a>
        , reducing methane emissions from oil and gas operations is also among
        the most cost-effective and impactful actions that governments can take
        to achieve global climate goals. <br />
        <br /> Only ten countries account for two-thirds of the potential
        emissions of carbon bombs, which makes it easier to create a dialogue.
      </div>
    ),
  },
  {
    question: 'How did we build this data about carbon bombs?',
    answer: <div>
      Our main work was to create connections between three existing databases:<br /><br />
      * A database from a scientific publication which provides mapping and descriptions of all the carbon bombs. This publication identifies the 425 biggest fossil fuel extraction projects globally (defined as >1 gigaton potential CO2 emissions), lists them by name, shows the countries in which they are located and calculate their potential emissions (twice the global 1.5°C <a className="text-blue-500" href="https://www.sciencedirect.com/topics/earth-and-planetary-sciences/carbon-budget">carbon budget</a>). (Source: “Carbon Bombs” - Mapping key fossil fuel projects, Kuhne and co-authors, 2022, Energy Policy, Volume 166, 2022)<br /><br />
      * Global Energy Monitor (GEM) trackers on oil extraction fields, fossil gas and coal mines: GEM develops and shares open-source and reliable information in support of the worldwide movement for clean energy. We have used GEM comprehensive databases to link the gas plants, coal mines and oil extraction fields with the companies operating them. (Source: <a className="text-blue-500" href="https://www.sciencedirect.com/science/article/pii/S0301421522001756">Global Oil and Gas Extraction Tracker and Global Coal Plant Tracker Global Energy Monitor</a>, 2023 release).<br /><br />
      * Banking on Climate Chaos database: The Banking on Climate Chaos report shows how banks support fossil fuel companies through their financing. This report adds up financing (lending and underwriting of debt and equity issuances) from the world’s 60 biggest banks for the fossil fuel sector as a whole, as well as for top expanders of the fossil fuel industry and top companies in specific sectors. The report assessed each bank’s leading involvement in corporate lending and underwriting transactions (where data was available) between January 1, 2016, and December 31, 2022. Transaction data were primarily sourced from Bloomberg Finance L.P. Additional project finance transactions in the LNG and coal power sectors were researched using the IJGlobal database.<br /><br />
    </div>,
  },
  {
    question: 'Are banks’ commitment to stop financing carbon bombs reliable?',
    answer: <div>
      Projects can be funded through two main channels:
      <br /><br />* <span className="font-semibold">Corporate financing:</span> A bank finances a fossil fuel company (1 dollar invested can go to any of the company’s projects). This is the most common financing channel.
      <br /><br />* <span className="font-semibold">Project financing:</span> a bank invests directly into a project. This channel is much less frequent than corporate financing.<br /><br />
      Most bank policies do not exclude general corporate finance for companies. They only apply to restrict cases when a company seeks finance specifically designated for a fossil fuel project (i.e. “project financing”). Project-specific finance accounts for on average only about 4% of total funding raised by companies annually. Since only a handful of the banks have meaningful exclusions that apply to general corporate finance, most of them can continue financing oil and gas activities without violating their own policies (source: Banking on climate chaos, 2023).
    </div>
  },
  {
    question: 'Is EACOP a carbon bomb?',
    answer: <div>The map shows the East Africa Crude Oil Project, although it is of a slightly different nature to the 425 carbon bombs. It's not a fossil fuel extraction site, but a pipeline - an infrastructure for extracting and transporting hydrocarbons. Given the media and political attention this project has received recently, we have chosen to show it in addition to the 425 carbon bombs. In the future, this map will also aggregate all other main hydrocarbon infrastructures worldwide.</div>
  },
  {
    question: 'Who are the other key actors involved in the carbon bombs?',
    answer: <div>Carbon bombs are the results of interconnected actors enabling the exploration, production, processing, and distribution of oil, gas and coal to meet global energy demand. The other types of actors involved include insurers, which are crucial players in this kind of project. Other types of actors are distributors and retailers, refiners, and midstream companies: transportation and storage of oil and gas, oilfield equipment manufacturers, etc.</div>
  },
  {
    question: 'What do carbon bombs represent comparatively to all fossil fuel extraction projects?',
    answer: <div>Carbon bombs are the 425 largest fossil fuel projects but represent only around 50% of the total emissions likely to be generated by the entire fossil fuel extraction sector. These few projects each represent a high level of emission, which makes them a priority to tackle: defusing a single bomb means stopping the equivalent of hundreds of more fragmented projects.</div>
  },
  {
    question: 'Could we compensate for these carbon emissions in order to keep extracting the bombs?',
    answer: <div>Given the scale of the extraction projects, it is unthinkable to pursue these projects solely on the basis of carbon capture. <br /><br />

    For instance, the cumulated emissions of the 425 carbon bombs amount to over 1180 gigatonnes of CO2. In order to compensate for all the emissions from these carbon bombs, we would need to plant between 1,5 and 3,3 times all emerged lands with trees. (This is a rough estimation used to show the magnitude of the surfaces needed. Precise figures should be based on one of the wide variety of methodologies depending on the type of activity, geography and ecosystem where trees would be planted, among many other factors).</div>
  }
];

const Faq = () => {
  const [unfoldedQuestionsIndices, setUnfoldedQuestionsIndices] = useState([]);

  console.log(unfoldedQuestionsIndices);
  return (
    <div className='p-4'>
      <h1 className='mb-10'>More questions?</h1>
      <div className='px-56'>
        {...FAQ_ITEMS.map((item, index) => {
          const showAnswer = unfoldedQuestionsIndices.includes(index);
          return (
            <div key={index} className='mb-8 rounded-xl bg-white p-4 shadow'>
              <div className='flex items-center justify-between font-bold'>
                {item.question}
                <div
                  onClick={() =>
                    setUnfoldedQuestionsIndices((prevValue) =>
                      showAnswer
                        ? [...without(prevValue, index)]
                        : uniq([...prevValue, index])
                    )
                  }
                >
                  {showAnswer ? (
                    <Minus className='h-6 w-6' />
                  ) : (
                    <Plus className='h-6 w-6' />
                  )}
                </div>
              </div>
              {showAnswer && <div className='mt-6'>{item.answer}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
