import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {createSpot, deleteSpot, updateSpot} from "../api";
import '../App.scss';

const cars = {
    'Acura': [
        '2.2CL',
        '2.3CL',
        '3.0CL',
        '3.2CL',
        'ILX',
        'Integra',
        'Legend',
        'MDX',
        'NSX',
        'RDX',
        '3.5 RL',
        'RL',
        'RSX',
        'SLX',
        '2.5TL',
        '3.2TL',
        'TL',
        'TSX',
        'Vigor',
        'ZDX'
    ],
    'Audi': [
        '100',
        '200',
        '4000',
        '5000',
        '80',
        '90',
        'A3',
        'A4',
        'A5',
        'A6',
        'A7',
        'A8',
        'allroad',
        'Cabriolet',
        'Coupe',
        'Q3',
        'Q5',
        'Q7',
        'Quattro',
        'R8',
        'RS 4',
        'RS 5',
        'RS 6',
        'S4',
        'S5',
        'S6',
        'S7',
        'S8',
        'TT',
        'TT RS',
        'TTS',
        'V8 Quattro'
    ],
    'BMW': [
        '128i',
        '135i',
        '135is',
        '318i',
        '318iC',
        '318iS',
        '318ti',
        '320i',
        '323ci',
        '323i',
        '323is',
        '323iT',
        '325Ci',
        '325e',
        '325es',
        '325i',
        '325is',
        '325iX',
        '325xi',
        '328Ci',
        '328i',
        '328iS',
        '328xi',
        '330Ci',
        '330i',
        '330xi',
        '335d',
        '335i',
        '335is',
        '335xi',
        'ActiveHybrid 3',
        '325',
        '524td',
        '525i',
        '525xi',
        '528e',
        '528i',
        '528iT',
        '528xi',
        '530i',
        '530iT',
        '530xi',
        '533i',
        '535i',
        '535i Gran Turismo',
        '535xi',
        '540i',
        '545i',
        '550i',
        '550i Gran Turismo',
        'ActiveHybrid 5',
        '633CSi',
        '635CSi',
        '640i',
        '640i Gran Coupe',
        '645Ci',
        '650i',
        '650i Gran Coupe',
        'L6',
        '733i',
        '735i',
        '735iL',
        '740i',
        '740iL',
        '740Li',
        '745i',
        '745Li',
        '750i',
        '750iL',
        '750Li',
        '760i',
        '760Li',
        'ActiveHybrid 7',
        'Alpina B7',
        '840Ci',
        '850Ci',
        '850CSi',
        '850i',
        'L7',
        '1 Series M',
        'M Coupe',
        'M Roadster',
        'M3',
        'M5',
        'M6',
        'X5 M',
        'X6 M',
        'ActiveHybrid X6',
        'X1',
        'X3',
        'X5',
        'X6',
        'Z3',
        'Z4',
        'Z8'
    ],
    'Cadillac': [
        'Allante',
        'ATS',
        'Brougham',
        'Catera',
        'Cimarron',
        'CTS',
        'De Ville',
        'DTS',
        'Eldorado',
        'Escalade',
        'Escalade ESV',
        'Escalade EXT',
        'Fleetwood',
        'Seville',
        'SRX',
        'STS',
        'XLR',
        'XTS'
    ],
    'Chevrolet': [
        'Astro',
        'Avalanche',
        'Aveo',
        'Aveo5',
        'Beretta',
        'Blazer',
        'Camaro',
        'Caprice',
        'Captiva Sport',
        'Cavalier',
        'Celebrity',
        'Chevette',
        'Citation',
        'Cobalt',
        'Colorado',
        'Corsica',
        'Corvette',
        'Cruze',
        'El Camino',
        'Equinox',
        'Express Van',
        'G Van',
        'HHR',
        'Impala',
        'Kodiak C4500',
        'Lumina',
        'Lumina APV',
        'LUV',
        'Malibu',
        'Metro',
        'Monte Carlo',
        'Nova',
        'Prizm',
        'S10 Blazer',
        'S10 Pickup',
        'Silverado and other C/K1500',
        'Silverado and other C/K2500',
        'Silverado and other C/K3500',
        'Sonic',
        'Spark',
        'Spectrum',
        'Sprint',
        'SSR',
        'Suburban',
        'Tahoe',
        'Tracker',
        'TrailBlazer',
        'TrailBlazer EXT',
        'Traverse',
        'Uplander',
        'Venture',
        'Volt'
    ],
    'Chrysler': [
        '200',
        '300',
        '300M',
        'Aspen',
        'Caravan',
        'Cirrus',
        'Concorde',
        'Conquest',
        'Cordoba',
        'Crossfire',
        'E Class',
        'Fifth Avenue',
        'Grand Voyager',
        'Imperial',
        'Intrepid',
        'Laser',
        'LeBaron',
        'LHS',
        'Neon',
        'New Yorker',
        'Newport',
        'Pacifica',
        'Prowler',
        'PT Cruiser',
        'Sebring',
        'TC by Maserati',
        'Town &amp; Country',
        'Voyager'
    ],
    'Dodge': [
        '400',
        '600',
        'Aries',
        'Avenger',
        'Caliber',
        'Caravan',
        'Challenger',
        'Charger',
        'Colt',
        'Conquest',
        'D/W Truck',
        'Dakota',
        'Dart',
        'Daytona',
        'Diplomat',
        'Durango',
        'Dynasty',
        'Grand Caravan',
        'Intrepid',
        'Journey',
        'Lancer',
        'Magnum',
        'Mirada',
        'Monaco',
        'Neon',
        'Nitro',
        'Omni',
        'Raider',
        'Ram 1500 Truck',
        'Ram 2500 Truck',
        'Ram 3500 Truck',
        'Ram 4500 Truck',
        'Ram 50 Truck',
        'RAM C/V',
        'Ram SRT-10',
        'Ram Van',
        'Ram Wagon',
        'Ramcharger',
        'Rampage',
        'Shadow',
        'Spirit',
        'Sprinter',
        'SRT-4',
        'St. Regis',
        'Stealth',
        'Stratus',
        'Viper'
    ],
    'Ford': [
        'Aerostar',
        'Aspire',
        'Bronco',
        'Bronco II',
        'C-MAX',
        'Club Wagon',
        'Contour',
        'Courier',
        'Crown Victoria',
        'E-150 and Econoline 150',
        'E-250 and Econoline 250',
        'E-350 and Econoline 350',
        'Edge',
        'Escape',
        'Escort',
        'Excursion',
        'EXP',
        'Expedition',
        'Expedition EL',
        'Explorer',
        'Explorer Sport Trac',
        'F100',
        'F150',
        'F250',
        'F350',
        'F450',
        'Fairmont',
        'Festiva',
        'Fiesta',
        'Five Hundred',
        'Flex',
        'Focus',
        'Freestar',
        'Freestyle',
        'Fusion',
        'Granada',
        'GT',
        'LTD',
        'Mustang',
        'Probe',
        'Ranger',
        'Taurus',
        'Taurus X',
        'Tempo',
        'Thunderbird',
        'Transit Connect',
        'Windstar',
        'ZX2 Escort'
    ],
    'Honda': [
        'Accord',
        'Civic',
        'CR-V',
        'CR-Z',
        'CRX',
        'Accord Crosstour',
        'Crosstour',
        'Del Sol',
        'Element',
        'Fit',
        'Insight',
        'Odyssey',
        'Passport',
        'Pilot',
        'Prelude',
        'Ridgeline',
        'S2000'
    ],
    'Hyundai': [
        'Accent',
        'Azera',
        'Elantra',
        'Elantra Coupe',
        'Elantra Touring',
        'Entourage',
        'Equus',
        'Excel',
        'Genesis',
        'Genesis Coupe',
        'Santa Fe',
        'Scoupe',
        'Sonata',
        'Tiburon',
        'Tucson',
        'Veloster',
        'Veracruz',
        'XG300',
        'XG350'
    ],
    'Infiniti': [
        'EX35',
        'EX37',
        'FX35',
        'FX37',
        'FX45',
        'FX50',
        'G20',
        'G25',
        'G35',
        'G37',
        'I30',
        'I35',
        'J30',
        'JX35',
        'M30',
        'M35',
        'M35h',
        'M37',
        'M45',
        'M56',
        'Q45',
        'QX4',
        'QX56'
    ],
    'Jaguar': [
        'S-Type',
        'X-Type',
        'XF',
        'XJ12',
        'XJ6',
        'XJR',
        'XJR-S',
        'XJS',
        'XJ Vanden Plas',
        'XJ',
        'XJ8',
        'XJ8 L',
        'XJ Sport',
        'XK8',
        'XK',
        'XKR'
    ],
    'Lamborghini': [
        'Aventador',
        'Countach',
        'Diablo',
        'Gallardo',
        'Jalpa',
        'LM002',
        'Murcielago'
    ],
    'Land Rover': [
        'Defender',
        'Discovery',
        'Freelander',
        'LR2',
        'LR3',
        'LR4',
        'Range Rover',
        'Range Rover Evoque',
        'Range Rover Sport'
    ],
    'Lexus': [
        'CT 200h',
        'ES 250',
        'ES 300',
        'ES 300h',
        'ES 330',
        'ES 350',
        'GS 300',
        'GS 350',
        'GS 400',
        'GS 430',
        'GS 450h',
        'GS 460',
        'GX 460',
        'GX 470',
        'HS 250h',
        'IS 250',
        'IS 250C',
        'IS 300',
        'IS 350',
        'IS 350C',
        'IS F',
        'LFA',
        'LS 400',
        'LS 430',
        'LS 460',
        'LS 600h',
        'LX 450',
        'LX 470',
        'LX 570',
        'RX 300',
        'RX 330',
        'RX 350',
        'RX 400h',
        'RX 450h',
        'SC 300',
        'SC 400',
        'SC 430'
    ],
    'Mazda': [
        '323',
        '626',
        '929',
        'B-Series Pickup',
        'CX-5',
        'CX-7',
        'CX-9',
        'GLC',
        'MAZDA2',
        'MAZDA3',
        'MAZDA5',
        'MAZDA6',
        'MAZDASPEED3',
        'MAZDASPEED6',
        'Miata MX5',
        'Millenia',
        'MPV',
        'MX3',
        'MX6',
        'Navajo',
        'Protege',
        'Protege5',
        'RX-7',
        'RX-8',
        'Tribute'
    ],
    'Mercedes-Benz': [
        '190D',
        '190E',
        '240D',
        '300CD',
        '300CE',
        '300D',
        '300E',
        '300TD',
        '300TE',
        'C220',
        'C230',
        'C240',
        'C250',
        'C280',
        'C300',
        'C320',
        'C32 AMG',
        'C350',
        'C36 AMG',
        'C43 AMG',
        'C55 AMG',
        'C63 AMG',
        'CL500',
        'CL550',
        'CL55 AMG',
        'CL600',
        'CL63 AMG',
        'CL65 AMG',
        'CLK320',
        'CLK350',
        'CLK430',
        'CLK500',
        'CLK550',
        'CLK55 AMG',
        'CLK63 AMG',
        'CLS500',
        'CLS550',
        'CLS55 AMG',
        'CLS63 AMG',
        '260E',
        '280CE',
        '280E',
        '400E',
        '500E',
        'E300',
        'E320',
        'E320 Bluetec',
        'E320 CDI',
        'E350',
        'E350 Bluetec',
        'E400 Hybrid',
        'E420',
        'E430',
        'E500',
        'E550',
        'E55 AMG',
        'E63 AMG',
        'G500',
        'G550',
        'G55 AMG',
        'G63 AMG',
        'GL320 Bluetec',
        'GL320 CDI',
        'GL350 Bluetec',
        'GL450',
        'GL550',
        'GLK350',
        'ML320',
        'ML320 Bluetec',
        'ML320 CDI',
        'ML350',
        'ML350 Bluetec',
        'ML430',
        'ML450 Hybrid',
        'ML500',
        'ML550',
        'ML55 AMG',
        'ML63 AMG',
        'R320 Bluetec',
        'R320 CDI',
        'R350',
        'R350 Bluetec',
        'R500',
        'R63 AMG',
        '300SD',
        '300SDL',
        '300SE',
        '300SEL',
        '350SD',
        '350SDL',
        '380SE',
        '380SEC',
        '380SEL',
        '400SE',
        '400SEL',
        '420SEL',
        '500SEC',
        '500SEL',
        '560SEC',
        '560SEL',
        '600SEC',
        '600SEL',
        'S320',
        'S350',
        'S350 Bluetec',
        'S400 Hybrid',
        'S420',
        'S430',
        'S500',
        'S550',
        'S55 AMG',
        'S600',
        'S63 AMG',
        'S65 AMG',
        '300SL',
        '380SL',
        '380SLC',
        '500SL',
        '560SL',
        '600SL',
        'SL320',
        'SL500',
        'SL550',
        'SL55 AMG',
        'SL600',
        'SL63 AMG',
        'SL65 AMG',
        'SLK230',
        'SLK250',
        'SLK280',
        'SLK300',
        'SLK320',
        'SLK32 AMG',
        'SLK350',
        'SLK55 AMG',
        'SLR',
        'SLS AMG',
        'Sprinter'
    ],
    'Nissan': [
        '200SX',
        '240SX',
        '300ZX',
        '350Z',
        '370Z',
        'Altima',
        'Armada',
        'Axxess',
        'Cube',
        'Frontier',
        'GT-R',
        'Juke',
        'Leaf',
        'Maxima',
        'Murano',
        'Murano CrossCabriolet',
        'NV',
        'NX',
        'Pathfinder',
        'Pickup',
        'Pulsar',
        'Quest',
        'Rogue',
        'Sentra',
        'Stanza',
        'Titan',
        'Van',
        'Versa',
        'Xterra'
    ],
    'Porsche':[
        '911',
        '924',
        '928',
        '944',
        '968',
        'Boxster',
        'Carrera GT',
        'Cayenne',
        'Cayman',
        'Panamera'
    ],
    'Rolls-Royce': [
        'Camargue',
        'Corniche',
        'Ghost',
        'Park Ward',
        'Phantom',
        'Silver Dawn',
        'Silver Seraph',
        'Silver Spirit',
        'Silver Spur'
    ],
    'Subaru': [
        'Baja',
        'Brat',
        'BRZ',
        'Forester',
        'Impreza',
        'Impreza WRX',
        'Justy',
        'L Series',
        'Legacy',
        'Loyale',
        'Outback',
        'SVX',
        'Tribeca',
        'XT',
        'XV Crosstrek'
    ],
    'Tesla': [
        'Model 3',
        'Model S',
        'Model X',
        'Model Y',
    ],
    'Toyota': [
        '4Runner',
        'Avalon',
        'Camry',
        'Celica',
        'Corolla',
        'Corona',
        'Cressida',
        'Echo',
        'FJ Cruiser',
        'Highlander',
        'Land Cruiser',
        'Matrix',
        'MR2',
        'MR2 Spyder',
        'Paseo',
        'Pickup',
        'Previa',
        'Prius',
        'Prius C',
        'Prius V',
        'RAV4',
        'Sequoia',
        'Sienna',
        'Solara',
        'Starlet',
        'Supra',
        'T100',
        'Tacoma',
        'Tercel',
        'Tundra',
        'Van',
        'Venza',
        'Yaris'
    ],
    'Volvo': [
        '240',
        '260',
        '740',
        '760',
        '780',
        '850',
        '940',
        '960',
        'C30',
        'C70',
        'S40',
        'S60',
        'S70',
        'S80',
        'S90',
        'V40',
        'V50',
        'V70',
        'V90',
        'XC60',
        'XC70',
        'XC90'
    ]
};

export default function Spots(props) {

    const [spot, setSpot] = useState({
        id: uuidv4(),
        name: '',
        make: '',
        model: '',
        licence: '',
        entryDate: '',
        exitDate: ''
    });
    const [edit, setEdit] = useState(false);
    const [make, setMake] = useState('Acura');
    const [model, setModel] = useState(cars['Acura'][0]);

    const makeOptions = Object.keys(cars).map(car => <option value={car}>{car}</option>);
    const modelOptions = cars[make].map(model => <option value={model}>{model}</option>);

    const handleCarChange = (e) => {
        const make = e.target.value;
        setMake(make);
        setModel(cars[make][0]);
    };

    const handleModelChange = (e) => {
        setModel(e.target.value);
    };

    const handleSpotChange = e => {
        const propName = e.target.dataset.prop;
        setSpot({
            ...spot,
            [propName]: e.target.value
        });
    };

    const saveSpot = async e => {
        if (e.key === 'Enter') {
            let res = edit ? await updateSpot({
                ...spot
            }) : await createSpot({
                ...spot
            });
            console.log(res.data);
            props.fetchSpots().then().catch();
            setTimeout(() => {
                setSpot({
                    id: uuidv4(),
                    name: '',
                    make: '',
                    model: '',
                    licence: '',
                    entryDate: '',
                    exitDate: ''
                });
            }, 100)
        }

    };

    const handleDeleteSpot = async e => {
        try {
            const id = e.currentTarget.dataset.id;
            const spot = await deleteSpot(id);
            const res = await props.fetchSpots();
        } catch (ex) {
            alert('Could not delete the user!');
        }
    };

    const handleEditSpot = async e => {
        try {
            const {id} = e.currentTarget.dataset;
            console.log(id);
            setEdit(true);
            setSpot({
                ...props.spots[id]
            });
        } catch (ex) {
            alert('Could not edit the user!');
        }
    };

    const handleSaveSpotOnClick = async () => {
        let res = edit ? await updateSpot({
            ...spot
        }) : await createSpot({
            ...spot
        });
        console.log(res.data);
        props.fetchSpots().then().catch();

        setSpot({
            id: uuidv4(),
            name: '',
            make: '',
            model: '',
            licence: '',
            entryDate: '',
            exitDate: ''
        })
    };

    const renderedSpots = Object.values(props.spots).map(spot => <div key={spot.id} className="row">
        <div className="column">
            {spot.name}
        </div>

        <div className="column">
            {spot.make}
        </div>

        <div className="column">
            {spot.model}
        </div>

        <div className="column">
            {spot.licence}
        </div>

        <div className="column">
            {spot.entryDate}
        </div>

        <div className="column">
            {spot.exitDate}
        </div>

        <div className="column">
            <button className="icon"
                    data-id={spot.id}
                    onClick={handleEditSpot}>
                <i className="fa fa-edit"/>
            </button>

            <button className="icon"
                    data-id={spot.id}
                    onClick={handleDeleteSpot}>
                <i className="fas fa-user-minus"/>
            </button>
        </div>
    </div>);


    return (<div>
        <form className='form'>
            <fieldset>
                <div className='field'>
                    <label>Name: </label>
                    <input
                        onKeyDown={saveSpot}
                        onChange={handleSpotChange}
                        value={spot.name}
                        required
                        type="text"
                        data-prop="name"/>
                </div>

                <div className='field'>
                    <label>Car Make </label>
                    <select
                        onClick={saveSpot}
                        onChange={handleCarChange}
                        value={make}
                        required
                        data-prop="make">

                            {makeOptions}
                    </select>
                </div>

                <div className='field'>
                    <label>Car Model </label>
                    <select
                        onClick={saveSpot}
                        onChange={handleCarChange}
                        value={model}
                        required
                        data-prop="model">

                            {modelOptions}
                        </select>
                </div>

                <div className='field'>
                    <label>Licence Plate: </label>
                    <input
                        onKeyDown={saveSpot}
                        onChange={handleSpotChange}
                        value={spot.licence}
                        required
                        type="text"
                        data-prop="licence"/>
                </div>

                <div className='field'>
                    <label>Entry Date: </label>
                    <input
                        onKeyDown={saveSpot}
                        onChange={handleSpotChange}
                        value={spot.entryDate}
                        required
                        type="date"
                        data-prop="entryDate"/>
                </div>

                <div className='field'>
                    <label>Exit Date: </label>
                    <input
                        onKeyDown={saveSpot}
                        onChange={handleSpotChange}
                        value={spot.exitDate}
                        required
                        type="date"
                        data-prop="exitDate"/>
                </div>
            </fieldset>

            <button onClick={handleSaveSpotOnClick}>
                Add Car
            </button>
        </form>

        <div className='table'>
            <div className="table-header">
                <div className="row">
                    <div className="column">Name</div>
                    <div className="column">Car Make</div>
                    <div className="column">Car Model</div>
                    <div className="column">Licence Plate</div>
                    <div className="column">Entry Date</div>
                    <div className="column">Exit Date</div>
                    <div className="column">Options</div>
                </div>
            </div>

            <div className="table-body">
                {renderedSpots}
            </div>
        </div>
    </div>);
}
