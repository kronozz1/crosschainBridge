import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React from 'react';
import { Swapabi , SwapAddress , Token1abi , Token2abi ,Token1Address , Token2Address} from '../contants';
import Web3Modal from 'web3modal';
import {providers , Contract , BigNumber , utils , ethers} from 'ethers';
export default function Home() {
    const zero = BigNumber.from(0);
  const [walletConnected , setwalletConnected] = React.useState(false)
  const [balanceOfAmanDevTokens ,setbalanceOfAmanDevTokens] = React.useState(zero);
  const [userAddress, setuserAddress]=React.useState();
  const [token1balance , settoken1balance]=React.useState("");
      const [TokenMinted , setTokenMinted] = React.useState(zero);
  const [ subt , setsubt] = React.useState();
  const [loading , setloading] = React.useState(false);
  const [ input , setinput] = React.useState();
  const [input2 , setinput2] = React.useState();
  const [bnbBalances , setbnbBalance] = React.useState();
const [ userallowance , setuserallowance] = React.useState(false);
  const [ lowBalance , setlowBalance ] = React.useState(false);
  const [allowance, setAllowance] = React.useState('');
  const [ Enable , setEnable] = React.useState();
  const ModelRef= React.useRef();
  const getSignerOrProvider = async(needSigner = false) =>{
    const provider = await ModelRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const {chainId} = await web3Provider.getNetwork();
    if(chainId != 80001){
      window.alert("Change Your Network to Matic Network");
      throw new Error("Change Your Network to Matic Network");
    }
    if(needSigner ){
      const signer = await web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  }
  const handleChange= async (e) =>{
 setinput(e.target.value);

  }
  console.log(userallowance);

  const getBlanceTokenAmanDevToken = async() =>{
    try{
    const provider = await getSignerOrProvider();
    const myContract = new Contract(SwapAddress , Swapabi , provider);
      const signer = await getSignerOrProvider(true);
      const address = await signer.getAddress();
      setuserAddress(address);

    }catch(err){
      console.error(err);
    }
  }
  const approval= async() =>{
    try{
      const provider = await getSignerOrProvider(true);
      const contract = new Contract(Token2Address, Token2abi, provider);
      const amount= ethers.utils.parseEther(input);
      const balance = await contract.burn(amount);
      await balance.wait();
      setEnable(true);

    }catch(err){
      console.error(err);
    }
  }
    const BlanceToken1 = async() =>{
    try{
            const signer = await getSignerOrProvider(true);
      const address = await signer.getAddress();
      const provider = await getSignerOrProvider();
      const contract = new Contract(Token2Address, Token2abi, provider);
      const balance = await contract.balanceOf(address);
      settoken1balance(ethers.utils.formatUnits(balance));


    }catch(err){
      console.error(err);
    }
  }
  const swapToken1withToken2 = async(event) =>{
    event.preventDefault();
    try{
      const provider = new ethers.providers.JsonRpcProvider('https://wiser-old-wildflower.bsc-testnet.discover.quiknode.pro/a17c196f848795c42d0000e1e2e4146ea3ca7001/');
      const privateKey ="a471a8c95094bd80abcb197bb20ba8006eae342c8f0b170825495f9181c592c6"
setsubt(true);
        const signer = new ethers.Wallet(privateKey, provider);
    const myContract = new Contract(Token1Address , Token1abi , signer);
const inputETh = ethers.utils.parseUnits(input , 18);

    const _tokenMinted = await myContract.transfer(userAddress, inputETh ,{ gasLimit: 1000000 });

            await _tokenMinted.wait();
setsubt();

      window.location.replace("/");

      console.log(success);

    }catch(err){
      if (err.message.includes('execution reverted: ERC20: insufficient')) {
        window.alert('ERC20: insufficient allowance , please enter the approved input ');
      } 
      console.error(err);

    }

  }
  const BNBbalance = async() =>{
    try{
            const signer = await getSignerOrProvider(true);
      const address = await signer.getAddress();
    const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/'); // use the appropriate BSC testnet endpoint
const balance = await provider.getBalance(address);
const userbnbBalance = ethers.utils.formatEther(balance);
    setbnbBalance(userbnbBalance);
    }catch(err){
console.error(err);
    }

  }
  console.log(userAddress);
  const connectWallet = async () =>{
    try{
          await getSignerOrProvider();
      setwalletConnected(true);
    }catch(err){
      console.error(err);
    }
  }
  const balanceAndAddress = async() =>{
    if(walletConnected){
    await   getBlanceTokenAmanDevToken();
     await BlanceToken1();
await BNBbalance();
    }
  }
  React.useEffect(()=>{
    if(!walletConnected){
      ModelRef.current = new Web3Modal({
        networks:"arbitrum-goerli",
        providerOptions:{},
        disabledInjectedProvider:false,
      })
      connectWallet();
    }
      balanceAndAddress();
  },[walletConnected]);
  return (
    <>
    <Head>
    <title>Crosschain Bridge</title>
    </Head>
	  <div class="area" >
			<div id='stars'></div>
<div id='stars2'></div>
<div id='stars3'></div>
</div>

    <header class="text-gray-600 body-font ">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
      <span class=" text-xl">Crosschain Bridge</span>
    </a>
    <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
      <a href="/reverseSwap" class="mr-5 text-white ">Swap TBSC-TETH</a>
    </nav>
    <button onClick={connectWallet} class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"><img className="h-5 w-5 mr-2" src="favicon.png" />{walletConnected ? "Connected" : "Connect Wallet"}
    </button>
  </div>
</header>
    <section class="   body-font relative middle_box">
  <div class="container mx-auto">
    <div class="flex flex-col w-full mb-8">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white "> Crosschain Bridge</h1>
      <p class=" leading-relaxed text-white ">Here you can swap TETH to TBSC</p>
    </div>
  <div class="row">
 <div class="box-50">
  <div class="box_white">
  
    <form onSubmit={swapToken1withToken2}>
                                        <div class="">Wallet Address :<span>{userAddress}</span></div>
	            <div class="value_top">
                                <div class="">Token Balance: <span>{token1balance}</span> TokenETH</div>
                                <div class="ml-auto">
                                    BNB Balance: <span>{bnbBalances}</span> BNB
                                </div>
                   </div>
      <div class="">
        <div class="p-2 w_1_box mb-3">
            <label for="name" class=" text-gray-600"><b>Token1</b></label>
			 <div class="input_box">
    { !Enable ? 
              <input type="number" onChange={handleChange} id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out" required/>
:
              <input type="number" disabled={true} onChange={handleChange} id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out" required/>

    }
			<div class="input_right">
			<b>Max</b>
			<img className="h-7 ml-2" src="envo.png" />
			<img className="h-7 ml-2" src="bnb.png" />
            </div>
			</div>

        </div>
		<p class="mb-2">Swap Rate: 1:1 (1 TokenETH = 1 TokenBSC)</p>
        <div class="p-2 w_1_box mb-2">
            <label for="email" class="text-gray-600"><b>Token2</b></label>
			  <div class="input_box">
            <input type="number" id="name" name="name" disabled = {true} class=" w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 transition-colors  duration-200 ease-in-out" placeholder={input} />
          <div class="input_right">
			<img className="h-7 ml-2" src="envo.png" />
			<img className="h-7 ml-2" src="bnb.png" />
            </div>
		  
		  </div>
            </div>
    { !Enable ? 
            <div class="p-2 w-full">
              <button type="button" onClick={approval} class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"> Bridge Token</button>
        </div>

      : 

        <div class="p-2 w-full">
          <button type="submit"  disabled={subt}  class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"> { !subt ? "Receive TBSC" : "Loading..."}</button>
        </div>

    }
        
      </div>
    </form>
  </div>
  </div>
  
  <div class="box-50">

					
  </div>
  </div>
  
  
  
  
  
  
  
  </div>
</section>

    </>
  )
}
