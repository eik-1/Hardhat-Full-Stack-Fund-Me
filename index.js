import { ethers } from "./ethers-5.7.esm.min.js"
import { abi, contractAddress } from "./constants.js"
const axios = window.axios

const connectButton = document.getElementById("connect")
const fundButton = document.getElementById("fund")
const balanceButton = document.getElementById("balance")
const withdrawButton = document.getElementById("withdraw")
connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getBalance
withdrawButton.onclick = withdraw

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        connectButton.innerHTML = '<span class="text">Connected</span>'
        connectButton.classList.add("connected")
    } else {
        connectButton.innerHTML = '<span class="text">Install Metamask</span>'
    }
}

async function fund() {
    const usdAmount = parseFloat(document.getElementById("fund-amount").value)
    document.getElementById("fund-amount").value = ""

    if (typeof window.ethereum !== "undefined") {
        //provider
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        //signer/wallet
        const signer = provider.getSigner() //returns whaterver account is connected to metamask
        //contract
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            // Fetch the ETH price from CoinGecko API
            const response = await axios.get(
                "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
            )

            if (
                response.data &&
                response.data.ethereum &&
                response.data.ethereum.usd
            ) {
                const ethPriceInUSD = response.data.ethereum.usd
                const ethAmount = (usdAmount / ethPriceInUSD).toString()

                try {
                    const tx_response = await contract.fund({
                        value: ethers.utils.parseEther(ethAmount),
                    })

                    // Wait for transaction to be mined
                    await listenForTransactionMined(tx_response, provider)
                    console.log("Done!")
                } catch (error) {
                    console.log("Transaction error:", error)
                }
            } else {
                console.log("Failed to fetch the ETH amount.")
            }
        } catch (error) {
            console.log("API request error:", error)
        }
    }
}

async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        try {
            const res = await axios.get(
                "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
            )
            if (res.data && res.data.ethereum && res.data.ethereum.usd) {
                const ethPriceInUSD = res.data.ethereum.usd
                const ethAmount = ethers.utils.formatEther(balance)
                const usdAmount = ethAmount * ethPriceInUSD
                alert(usdAmount)
            } else {
                console.log("Failed to fetch the ETH amount.")
            }
        } catch (err) {
            console.log(err)
        }
    }
}

async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            // Check if the caller of the function is the owner of the contract
            const owner = await contract.getOwner()
            const caller = await signer.getAddress()
            if (owner !== caller) {
                console.log("Only the owner can withdraw funds.")
                return
            }

            const tx_response = await contract.withdraw()
            await listenForTransactionMined(tx_response, provider)
            console.log("Done!")
        } catch (error) {
            console.log("Transaction error:", error)
        }
    }
}

function listenForTransactionMined(tx_response, provider) {
    console.log(`Mining ${tx_response.hash}...`)
    return new Promise((resolve, reject) => {
        provider.once(tx_response, (tx_receipt) => {
            console.log(
                `Completed with ${tx_receipt.confirmations} confirmations`,
            )
            resolve()
        })
    })
}
