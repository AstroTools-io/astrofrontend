export const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
export const USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7';
export const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
export const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f';

export const popupCenter = ({ url, title, w, h }) => {
  const dualScreenLeft = window.screenLeft !== undefined
    ? window.screenLeft
    : window.screenX;
  const dualScreenTop = window.screenTop !== undefined
    ? window.screenTop
    : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    `
      scrollbars=yes,
      width=${w / systemZoom},
      height=${h / systemZoom},
      top=${top},
      left=${left}
    `
  );

  if (window.focus) {
    newWindow.focus();
  }
};

export const tokenList = [
  { name: 'AstroTools.io', symbol: 'ASTRO', address: '0xcbd55D4fFc43467142761A764763652b48b969ff' },
  { name: 'Tether USD', symbol: 'USDT', address: '0xdac17f958d2ee523a2206206994597c13d831ec7' },
  { name: 'Binance USD', symbol: 'BUSD', address: '0x4fabb145d64652a948d72533023f6e7a623c7c53' },
  { name: 'BNB', symbol: 'BNB', address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52' },
  { name: 'USD Coin', symbol: 'USDC', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
  { name: 'HuobiToken', symbol: 'HT', address: '0x6f259637dcd74c767781e37bc6133cd6a68aa161' },
  { name: 'VeChain', symbol: 'VEN', address: '0xd850942ef8811f2a866692a623011bde52a462c1' },
  { name: 'ChainLink Token', symbol: 'LINK', address: '0x514910771af9ca656af840dff83e8264ecf986ca' },
  { name: 'Wrapped Filecoin', symbol: 'WFIL', address: '0x6e1A19F235bE7ED8E3369eF73b196C07257494DE' },
  { name: 'yearn.finance', symbol: 'YFI', address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e' },
  { name: 'Uniswap', symbol: 'UNI', address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984' },
  { name: 'OKB', symbol: 'OKB', address: '0x75231f58b43240c9718dd58b4967c5114342a86c' },
  { name: 'SushiToken', symbol: 'SUSHI', address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2' },
  { name: 'Aave interest bearing CRV', symbol: 'aCRV', address: '0x8dae6cb04688c62d939ed9b68d32bc62e49970b1' },
  { name: 'Synthetix Network Token', symbol: 'SNX', address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f' },
  { name: 'Wrapped BTC', symbol: 'WBTC', address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' },
  { name: 'Dai Stablecoin', symbol: 'DAI', address: '0x6b175474e89094c44da98b954eedeac495271d0f' },
  { name: 'LoopringCoin V2', symbol: 'LRC', address: '0xbbbbca6a901c926f240b89eacb641d8aec7aeafd' },
  { name: 'OMG Network', symbol: 'OMG', address: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07' },
  { name: 'Maker', symbol: 'MKR', address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2' },
  { name: 'Theta Token', symbol: 'THETA', address: '0x3883f5e181fccaf8410fa61e12b59bad963fb645' },
  { name: 'Compound', symbol: 'COMP', address: '0xc00e94cb662c3520282e6f5717214004a7f26888' },
  { name: 'chiliZ', symbol: 'CHZ', address: '0x3506424f91fd33084466f402d5d97f05f8e3b4af' },
  { name: 'Swipe', symbol: 'SXP', address: '0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9' },
  { name: 'Injective Token', symbol: 'INJ', address: '0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30' },
  { name: 'EnjinCoin', symbol: 'ENJ', address: '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c' },
  { name: 'USDK', symbol: 'USDK', address: '0x1c48f86ae57291f7686349f12601910bd8d470bb' },
  { name: 'HUSD', symbol: 'HUSD', address: '0xdf574c24545e5ffecb9a659c229253d4111d87e1' },
  { name: 'Graph Token', symbol: 'GRT', address: '0xc944e90c64b2c07662a292be6244bdf05cda44a7' },
  { name: 'BAT', symbol: 'BAT', address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef' },
  { name: 'ZRX', symbol: 'ZRX', address: '0xe41d2489571d322189246dafa5ebde1f4699f498' },
  { name: 'AlphaToken', symbol: 'ALPHA', address: '0xa1faa113cbe53436df28ff0aee54275c13b40975' },
  { name: 'RLC', symbol: 'RLC', address: '0x607F4C5BB672230e8672085532f7e901544a7375' },
  { name: '1INCH Token', symbol: '1INCH', address: '0x111111111117dc0aa78b770fa6a738034120c302' },
  { name: 'IOSToken', symbol: 'IOST', address: '0xfa1a856cfa3409cfa145fa4e20eb270df3eb21ab' },
  { name: 'Zilliqa', symbol: 'ZIL', address: '0x05f4a42e251f2d52b8ed15e9fedaacfcef1fad27' },
  { name: 'Bancor', symbol: 'BNT', address: '0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c' },
  { name: 'Fantom Token', symbol: 'FTM', address: '0x4e15361fd6b4bb609fa63c81a2be19d873717870' },
  { name: 'HoloToken', symbol: 'HOT', address: '0x6c6ee5e31d828de241282b9606c8e98ea48526e2' },
  { name: 'BandToken', symbol: 'BAND', address: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55' },
  { name: 'Chroma', symbol: 'CHR', address: '0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2' },
  { name: 'TrueUSD', symbol: 'TUSD', address: '0x0000000000085d4780B73119b644AE5ecd22b376' },
  { name: 'Wrapped Decentraland MANA', symbol: 'wMANA', address: '0xfd09cf7cfffa9932e33668311c4777cb9db3c9be' },
  { name: 'Serum', symbol: 'SRM', address: '0x476c5E26a75bd202a9683ffD34359C0CC15be0fF' },
  { name: 'Crypto.com Coin', symbol: 'CRO', address: '0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b' },
  { name: 'KyberNetwork', symbol: 'KNC', address: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200' },
  { name: 'Tellor Tributes', symbol: 'TRB', address: '0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0' },
  { name: 'OriginToken', symbol: 'OGN', address: '0x8207c1ffc5b6804f6024322ccf34f29c3541ae26' },
  { name: 'Balancer', symbol: 'BAL', address: '0xba100000625a3754423978a60c9317c58a424e3d' },
  { name: 'Telcoin', symbol: 'TEL', address: '0x467Bccd9d29f223BcE8043b84E8C8B282827790F' },
  { name: 'Wrapped UST Token', symbol: 'UST', address: '0xa47c8bf37f92abed4a126bda807a7b7498661acd' },
  { name: 'Bytom', symbol: 'BTM', address: '0xcb97e65f07da24d46bcdd078ebebd7c6e6e3d750' },
  { name: 'Ocean Token', symbol: 'OCEAN', address: '0x967da4048cD07aB37855c090aAF366e4ce1b9F48' },
  { name: 'StatusNetwork', symbol: 'SNT', address: '0x744d70fdbe2ba4cf95131626614a1763df805b9e' },
  { name: 'DENT', symbol: 'DENT', address: '0x3597bfd533a99c9aa083587b074434e61eb0a258' },
  { name: 'Paxos Standard', symbol: 'PAX', address: '0x8e870d67f660d95d5be530380d0ec0bd388289e1' },
  { name: 'HarmonyOne', symbol: 'ONE', address: '0x799a4202c12ca952cb311598a024c80ed371a41e' },
  { name: 'FEGtoken', symbol: 'FEG', address: '0x389999216860ab8e0175387a0c90e5c52522c945' },
  { name: 'Storj', symbol: 'STORJ', address: '0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac' },
  { name: 'ViteToken', symbol: 'VITE', address: '0x1b793e49237758dbd8b752afc9eb4b329d5da016' },
  { name: 'Refereum', symbol: 'RFR', address: '0xd0929d411954c47438dc1d871dd6081f5c5e149c' },
  { name: 'Endor Protocol Token', symbol: 'EDR', address: '0xc528c28fec0a90c083328bc45f587ee215760a0f' },
  { name: 'Token Prometeus Network', symbol: 'PROM', address: '0xfc82bb4ba86045af6f327323a46e80412b91b27d' },
  { name: 'bZx Protocol Token', symbol: 'BZRX', address: '0x56d811088235F11C8920698a204A5010a788f4b3' },
  { name: 'Wootrade Network', symbol: 'WOO', address: '0x4691937a7508860f876c9c0a2a617e7d9e945d4b' },
  { name: 'ALICE', symbol: 'ALICE', address: '0xac51066d7bec65dc4589368da368b212745d63e8' },
  { name: 'Nuls', symbol: 'NULS', address: '0xa2791bdf2d5055cda4d46ec17f9f429568275047' },
  { name: 'DIAToken', symbol: 'DIA', address: '0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419' },
  { name: 'UMA Voting Token v1', symbol: 'UMA', address: '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828' },
  { name: 'DODO bird', symbol: 'DODO', address: '0x43Dfc4159D86F3A37A5A4B3D4580b888ad7d4DDd' },
  { name: 'Synth sUSD', symbol: 'sUSD', address: '0x57ab1ec28d129707052df4df418d58a2d46d5f51' },
  { name: 'Wrapped NXM', symbol: 'wNXM', address: '0x0d438f3b5175bebc262bf23753c1e53d03432bde' },
  { name: 'Reputation', symbol: 'REPv2', address: '0x221657776846890989a759ba2973e427dff5c9bb' },
  { name: 'Wrapped Celo', symbol: 'wCELO', address: '0xe452e6ea2ddeb012e20db73bf5d3863a3ac8d77a' },
  { name: 'SAND', symbol: 'SAND', address: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0' },
  { name: 'Orchid', symbol: 'OXT', address: '0x4575f41308EC1483f3d399aa9a2826d74Da13Deb' },
  { name: 'Aragon Network Token', symbol: 'ANT', address: '0xa117000000f279d81a1d3cc75430faa017fa5a2e' },
  { name: 'StormX', symbol: 'STMX', address: '0xbe9375c6a420d2eeb258962efb95551a5b722803' },
  { name: 'ZBToken', symbol: 'ZB', address: '0xbd0793332e9fb844a52a205a233ef27a5b34b927' },
  { name: 'CelerToken', symbol: 'CELR', address: '0x4f9254c83eb525f9fcf346490bbb3ed28a81c667' },
  { name: 'KuCoin Token', symbol: 'KCS', address: '0xf34960d9d60be18cc1d5afc1a6f012a723a28811' },
  { name: 'NKN', symbol: 'NKN', address: '0x5cf04716ba20127f1e2297addcf4b5035000c9eb' },
  { name: 'Orbs', symbol: 'ORBS', address: '0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa' },
  { name: 'Mask Network', symbol: 'MASK', address: '0x69af81e73a73b40adf4f3d4223cd9b1ece623074' },
  { name: 'Huobi BTC', symbol: 'HBTC', address: '0x0316EB71485b0Ab14103307bf65a021042c6d380' },
  { name: 'Numeraire', symbol: 'NMR', address: '0x1776e1f26f98b1a5df9cd347953a26dd3cb46671' },
  { name: 'Quickswap', symbol: 'QUICK', address: '0x6c28AeF8977c9B773996d0e8376d2EE379446F2f' },
  { name: 'Ampleforth Governance', symbol: 'FORTH', address: '0x77fba179c79de5b7653f68b5039af940ada60ce0' },
  { name: 'Bluzelle', symbol: 'BLZ', address: '0x5732046a883704404f284ce41ffadd5b007fd668' },
  { name: 'Fei USD', symbol: 'FEI', address: '0x956F47F50A910163D8BF957Cf5846D573E7f87CA' },
  { name: 'ELF', symbol: 'ELF', address: '0xbf2179859fc6d5bee9bf9158632dc51678a4100e' },
  { name: 'IoTeX Network', symbol: 'IOTX', address: '0x6fb3e0a217407efff7ca062d46c26e5d60a14d69' },
  { name: 'PowerLedger', symbol: 'POWR', address: '0x595832f8fc6bf59c85c527fec3740a1b7a361269' },
  { name: 'TenXPay', symbol: 'PAY', address: '0xB97048628DB6B661D4C2aA833e95Dbe1A905B280' },
  { name: 'WAX Token', symbol: 'WAX', address: '0x39bb259f66e1c59d5abef88375979b4d20d98022' },
  { name: 'Nebulas', symbol: 'NAS', address: '0x5d65D971895Edc438f465c17DB6992698a52318D' },
  { name: 'LON Token', symbol: 'LON', address: '0x0000000000095413afc295d19edeb1ad7b71c952' },
  { name: 'HEX', symbol: 'HEX', address: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39' },
  { name: 'Frontier Token', symbol: 'FRONT', address: '0xf8C3527CC04340b208C854E985240c02F7B7793f' },
  { name: 'Walton', symbol: 'WTC', address: '0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74' },
  { name: 'ETH 2x Flexible Leverage Index', symbol: 'ETH2x-FLI', address: '0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd' },
  { name: 'Celsius', symbol: 'CEL', address: '0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d' },
  { name: 'Amp', symbol: 'AMP', address: '0xff20817765cb7f73d4bde2e66e067e58d11095c2' },
  { name: 'SwissBorg', symbol: 'CHSB', address: '0xba9d4199fab4f26efe3551d490e3821486f135ba' },
  { name: 'Nexo', symbol: 'NEXO', address: '0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206' },
  { name: 'Bitfinex LEO Token', symbol: 'LEO', address: '0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3' },
  { name: 'Compound Ether', symbol: 'cETH', address: '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5' },
  { name: 'Compound Dai', symbol: 'cDAI', address: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643' },
  { name: 'Compound USD Coin', symbol: 'cUSDC', address: '0x39aa39c021dfbae8fac545936693ac917d5e7563' },
  { name: 'UMA Voting Token v1', symbol: 'UMA', address: '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828' },
  { name: 'SushiBar', symbol: 'xSUSHI', address: '0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272' },
];
