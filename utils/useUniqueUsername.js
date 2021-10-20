import { uniqueNamesGenerator, NumberDictionary } from 'unique-names-generator';

const numberDictionary = NumberDictionary.generate({ min: 1000, max: 9999 });

const cryptoSlang = [
    'BagHolder',
    'PumpButNotDump',
    'Hodl',
    'Mooning',
    'Satoshi',
    'DYOR',
    'Bullish',
    'AllTimeHigh',
    'Rekt',
    'Airdrop',
    'Shill',
    'Bag',
    'Flippening',
    'Lambo'
];

const names = [
    "Warrior",
    "Degenerate",
    "Ape",
    "Monster",
    "Whale",
    'DiamondHands',
    'PaperHands',
    'WeakHands',
    'BearWhale',
    'Cannon',
    'Monkey',
    'Monkey',
];

export default () => {
    return uniqueNamesGenerator({
        dictionaries: [cryptoSlang, names, numberDictionary],
        length: 3,
        separator: '',
        style: 'capital'
    }); // BlackPaperHands5103
}
